// Records one video spec at one size: reset the lane, sign in off camera, open the start page,
// then run the spec's steps on camera. Each step({ n, what, do, hold }) mirrors one row of the
// script table in the guide note. Writes <ID>-<size>.mp4, <ID>.json and step screenshots.
import fs from "node:fs";
import path from "node:path";

import { devices } from "playwright";

import { sessionFor } from "./auth.mjs";
import { Capture, FPS } from "./capture.mjs";
import { cursorInitScript, HIDE_CURSOR_CSS } from "./cursor.mjs";
import { APP_URL, imgDir, rawDir, ROOT, voiceFile } from "./paths.mjs";
import { seedLane } from "./seed.mjs";

export const DSF = 2; // deviceScaleFactor: every video and screenshot is sharp at 2x

export const SIZES = {
  phone: {
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent: devices["Pixel 7"].userAgent,
  },
  desktop: {
    viewport: { width: 1920, height: 1080 },
    isMobile: false,
    hasTouch: false,
    userAgent: devices["Desktop Chrome"].userAgent,
  },
};

const GLIDE_MS = { min: 600, max: 800 }; // PROMPTS.md Appendix F: 600 to 800 ms per move
const TYPE_DELAY_MS = 85;
const SETTLE_MS = 700; // after an action, before the step's screenshot

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const round = (n) => Math.round(n * 1000) / 1000;
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

/** Length of a WAV file in seconds (reads the header only), or null when there is no file. */
export function wavSeconds(file) {
  if (!fs.existsSync(file)) return null;
  const buf = fs.readFileSync(file);
  let byteRate = 0;
  for (let i = 12; i + 8 <= buf.length; ) {
    const id = buf.toString("ascii", i, i + 4);
    const size = buf.readUInt32LE(i + 4);
    if (id === "fmt ") byteRate = buf.readUInt32LE(i + 16);
    if (id === "data" && byteRate) return Math.min(size, buf.length - i - 8) / byteRate;
    i += 8 + size + (size % 2);
  }
  throw new Error(`${file} is not a WAV file I can read.`);
}

/**
 * @param {import("playwright").Browser} browser
 * @param {{ id: string, lane: number, laneFolder: string, note: string, role?: string,
 *   start: (seed: object) => string, setup?: Function, run: Function }} spec
 * @param {"phone"|"desktop"} size
 */
export async function recordTake(browser, spec, size, { shots = true } = {}) {
  const S = SIZES[size];
  const out = { width: S.viewport.width * DSF, height: S.viewport.height * DSF };
  const mp4 = path.join(rawDir(spec.laneFolder), `${spec.id}-${size}.mp4`);
  const tag = `[${spec.id} ${size}]`;

  console.log(`${tag} Resetting lane ${spec.lane}…`);
  const seed = seedLane(spec.lane);
  const storageState = spec.role ? await sessionFor(browser, spec.lane, spec.role) : undefined;

  const ctx = await browser.newContext({
    baseURL: APP_URL,
    storageState,
    ...S,
    deviceScaleFactor: DSF,
    colorScheme: "light", // guides-recording.md §7
    locale: "en-IN",
    timezoneId: "Asia/Kolkata",
    // The app's security policy blocks inline <style>, which the robot's cursor needs. This only
    // affects the robot's own browser; the app is unchanged.
    bypassCSP: true,
  });
  await ctx.addInitScript(cursorInitScript(size));
  const page = await ctx.newPage();
  page.setDefaultTimeout(20_000);

  let cap;
  try {
    // Off camera: open the start page and let it settle.
    await page.goto(spec.start(seed));
    if (spec.setup) await spec.setup({ page, seed, size });
    await page.waitForLoadState("load");
    await page.evaluate(() => document.fonts.ready);
    await sleep(1000);

    console.log(`${tag} Recording…`);
    cap = new Capture(page, out, mp4);
    await cap.start();

    const steps = [];
    let current = null;

    // Keep targets clear of the sticky top bar and the phone's bottom bar: scroll smoothly so the
    // element sits in the middle when it is near an edge or off screen.
    const bringIntoView = async (locator) => {
      const box = await locator.boundingBox();
      const vh = S.viewport.height;
      const safeTop = 72;
      const safeBottom = vh - (size === "phone" ? 110 : 24);
      if (box && box.y >= safeTop && box.y + box.height <= safeBottom) return;
      await locator.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "smooth" }));
      let last = null;
      for (let i = 0; i < 30; i++) {
        await sleep(100);
        const y = await page.evaluate(() => window.scrollY);
        if (y === last) break;
        last = y;
      }
      await sleep(150);
    };

    const glideTo = async (locator) => {
      await locator.waitFor({ state: "visible" });
      await bringIntoView(locator);
      const box = await locator.boundingBox();
      if (!box) throw new Error(`Can't see ${locator} on screen.`);
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      const from = (await page.evaluate(() => window.__rec?.pos())) ?? { x, y };
      const dist = Math.hypot(x - from.x, y - from.y);
      const ms = Math.round(Math.min(GLIDE_MS.max, Math.max(GLIDE_MS.min, 450 + dist * 0.35)));
      await page.evaluate(([x, y, ms]) => window.__rec.moveTo(x, y, ms), [x, y, ms]);
      await sleep(ms + 60);
      await page.mouse.move(x, y);
      const target = {
        x: round(box.x),
        y: round(box.y),
        width: round(box.width),
        height: round(box.height),
        at: round(cap.now()),
      };
      current?.targets.push(target);
      return { x, y };
    };

    /** Glide to an element and tap it, with a small ripple. */
    const tap = async (locator) => {
      const { x, y } = await glideTo(locator);
      await page.evaluate(([x, y]) => {
        window.__rec.press(true);
        window.__rec.ripple(x, y);
      }, [x, y]);
      await sleep(140);
      await locator.click();
      await page.evaluate(() => window.__rec?.press(false)).catch(() => {}); // page may have moved on
    };

    /** Tap a box and type into it at a calm, human pace. */
    const type = async (locator, text) => {
      await tap(locator);
      await page.keyboard.type(text, { delay: TYPE_DELAY_MS });
    };

    /** Point at something without tapping it (records it as the step's target). */
    const show = async (locator) => {
      await glideTo(locator);
    };

    /** One row of the script table. `hold` is the step's length in seconds, action included. */
    const step = async ({ n, what = "", do: act, hold = 3 }) => {
      const key = String(n);
      const voice = wavSeconds(voiceFile(spec.id, key));
      const length = Math.max(hold, voice != null ? voice + 0.5 : 0);
      current = { n: key, what, hold, voice: voice != null ? round(voice) : null, start: cap.now(), targets: [] };
      if (act) await act();

      await sleep(SETTLE_MS);
      let screenshot = null;
      if (shots) {
        const file = path.join(imgDir(spec.note), `${spec.id}-${key}-${size}.png`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        // The video shows a still frame while the cursor is hidden for the picture.
        await cap.frozenWhile(() =>
          page.screenshot({
            path: file,
            style: HIDE_CURSOR_CSS,
            scale: size === "phone" ? "device" : "css", // phone 780×1688, desktop 1920×1080
            animations: "allow",
          }),
        );
        screenshot = rel(file);
      }

      const left = current.start + length - cap.now();
      if (left > 0) await sleep(left * 1000);
      const end = cap.now();
      if (end - current.start > length + 0.25) {
        console.warn(`${tag} Step ${key} took ${(end - current.start).toFixed(1)} s (hold ${length.toFixed(1)} s).`);
      }
      const t = current.targets.at(-1) ?? null;
      steps.push({
        ...current,
        start: round(current.start),
        end: round(end),
        length: round(end - current.start),
        target: t, // CSS pixels in the viewport
        targetPx: t && {
          x: round(t.x * DSF),
          y: round(t.y * DSF),
          width: round(t.width * DSF),
          height: round(t.height * DSF),
        }, // pixels in the video
        screenshot,
      });
      current = null;
    };

    await spec.run({ page, step, tap, type, show, size, seed, phone: size === "phone" });
    const duration = await cap.stop();
    cap = null;

    writeTimeline(spec, size, {
      file: rel(mp4),
      viewport: S.viewport,
      deviceScaleFactor: DSF,
      video: { ...out, fps: FPS, duration: round(duration) },
      recordedAt: new Date().toISOString(),
      steps,
    });
    console.log(`${tag} Saved ${rel(mp4)} (${duration.toFixed(1)} s).`);
    return mp4;
  } catch (e) {
    const shot = path.join(ROOT, "recorder", ".cache", "failures", `${spec.id}-${size}.png`);
    fs.mkdirSync(path.dirname(shot), { recursive: true });
    await page.screenshot({ path: shot }).catch(() => {});
    if (cap) await cap.stop().catch(() => {});
    fs.rmSync(mp4, { force: true }); // never leave a half video behind
    throw new Error(`${tag} ${e.message}\n  Screen at the failure: ${rel(shot)}`);
  } finally {
    await ctx.close();
  }
}

/** <ID>.json holds both sizes; recording one size keeps the other's entry. */
function writeTimeline(spec, size, take) {
  const file = path.join(rawDir(spec.laneFolder), `${spec.id}.json`);
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {}
  data = {
    ...data,
    id: spec.id,
    lane: spec.lane,
    note: spec.note,
    about:
      "Times are seconds from the start of the video. target = the tapped element in CSS pixels; targetPx = the same box in video pixels.",
    [size]: take,
  };
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}
