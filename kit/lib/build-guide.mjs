// Builds one HyperFrames project for one guide video in one size, from kit/template/guide/,
// the robot's recording and <ID>.json, and the voice lines.
import fs from "node:fs";
import path from "node:path";
import { CONFIG, FRAME, KIT, P, ROOT, asciiJson, copyDir, escapeHtml, ffmpeg, r3 } from "./common.mjs";
import { LEAD_IN } from "./voice.mjs";
import { buildBed } from "./music.mjs";

const TEMPLATE = path.join(KIT, "template", "guide");

/** Where things sit, per size. The card keeps the recording's own shape. */
export function layout(size, video) {
  const { W, H } = FRAME[size];
  if (size === "phone") {
    const h = 1470;
    const w = Math.round((h * video.width) / video.height);
    const card = { x: Math.round((W - w) / 2), y: 176, w, h, r: 44 };
    return {
      W, H, card,
      eyebrow: { y: 92, size: 26 },
      captions: { y: 1732, size: CONFIG.captions.phone, maxWidth: 940 },
      progress: { x0: card.x, x1: card.x + w, y: 1812, knotR: 5 },
      pad: 9, ringR: 16,
    };
  }
  const w = 1640;
  const h = Math.round((w * video.height) / video.width);
  const card = { x: Math.round((W - w) / 2), y: 26, w, h, r: 20 };
  return {
    W, H, card,
    eyebrow: null,
    captions: { y: card.y + h + 52, size: CONFIG.captions.desktop, maxWidth: 1500 },
    progress: { x0: card.x, x1: card.x + w, y: 1052, knotR: 4 },
    pad: 7, ringR: 12,
  };
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/** Gentle camera moves onto each tapped element, in video seconds. */
export function camera(steps, L, zoom, footEnd) {
  const { w: W, h: H } = L.card;
  const moves = [];
  let cur = { s: 1, x: 0, y: 0 };
  let busy = 0;
  const frame = (T) => {
    const s = clamp(Math.min((0.42 * W) / T.w, (0.32 * H) / T.h), zoom.min, zoom.max);
    const cx = T.x + T.w / 2;
    const cy = T.y + T.h / 2;
    return { s: r3(s), x: r3(clamp(W / 2 - s * cx, W - s * W, 0)), y: r3(clamp(H / 2 - s * cy, H - s * H, 0)) };
  };
  steps.forEach((st, i) => {
    const isLast = i === steps.length - 1;
    // The result (last step) zooms only if it shows up early enough to hold it calmly;
    // otherwise the camera pulls back so the whole screen is seen.
    if (st.target && st.at < footEnd - (isLast ? 2.4 : 1.8)) {
      const f = frame(st.target);
      const start = Math.max(busy, st.start + 0.05, st.at - 1.0);
      const dur = Math.max(0.55, st.at - 0.05 - start);
      const same = Math.abs(f.s - cur.s) < 0.02 && Math.abs(f.x - cur.x) < 4 && Math.abs(f.y - cur.y) < 4;
      if (!same) {
        moves.push({ at: r3(start), dur: r3(dur), ...f });
        cur = f;
        busy = start + dur;
      }
    } else if ((!st.target || isLast) && cur.s > 1.001) {
      const start = Math.max(busy, st.start + (isLast ? 0.3 : 0));
      moves.push({ at: r3(start), dur: 0.9, s: 1, x: 0, y: 0 });
      cur = { s: 1, x: 0, y: 0 };
      busy = start + 0.9;
    }
  });
  // A calm pull back to the whole screen before the end card, if there is time for it.
  if (cur.s > 1.001) {
    const at = Math.max(busy + 1.0, footEnd - 1.4);
    if (at + 0.9 <= footEnd - 0.2) moves.push({ at: r3(at), dur: 0.9, s: 1, x: 0, y: 0 });
  }
  return moves;
}

/**
 * script: from note.mjs. rec: <ID>.json[size]. voice: from voice.mjs.
 * Returns { dir, duration, timeline } where timeline lists each step's video times.
 */
export function buildGuide(script, rec, voice, size) {
  const id = script.id;
  const dir = P.build(id, size);
  fs.rmSync(dir, { recursive: true, force: true });
  copyDir(TEMPLATE, dir);
  copyDir(path.join(KIT, "brand", "fonts"), path.join(dir, "assets", "fonts"));
  fs.mkdirSync(path.join(dir, "assets", "brand"), { recursive: true });
  fs.copyFileSync(path.join(KIT, "brand", "grain.png"), path.join(dir, "assets", "brand", "grain.png"));
  fs.mkdirSync(path.join(dir, "shared"), { recursive: true });
  fs.copyFileSync(path.join(KIT, "brand", "brand.css"), path.join(dir, "shared", "brand.css"));
  fs.copyFileSync(path.join(KIT, "brand", "brand.js"), path.join(dir, "shared", "brand.js"));

  const intro = CONFIG.video.intro;
  const endCard = CONFIG.video.endCard;
  const video = rec.video;
  const footStart = intro;
  const footDur = r3(video.duration);
  // The result stays on screen at least 2.5 s: if the robot's last target showed up late, the
  // last frame is held (a still, after the footage) until it has.
  const lastRec = rec.steps[rec.steps.length - 1];
  const lastSeen = lastRec.target ? lastRec.target.at : lastRec.start;
  const tail = Math.max(0, Math.ceil((2.5 - (footDur - lastSeen)) * 10) / 10);
  const footEnd = r3(footStart + footDur + tail);
  const duration = r3(footEnd + endCard);
  const L = layout(size, video);
  const k = L.card.w / video.width; // video pixels to card pixels

  // Footage: the robot's take, as it is.
  fs.copyFileSync(path.join(ROOT, rec.file), path.join(dir, "assets", "footage.mp4"));
  let holdHtml = "";
  if (tail > 0) {
    ffmpeg(["-sseof", "-0.1", "-i", path.join(ROOT, rec.file), "-frames:v", "1", "-q:v", "2", path.join(dir, "assets", "last-frame.jpg")]);
    holdHtml = `          <img id="hold" class="clip" src="assets/last-frame.jpg" alt="" data-start="${r3(footStart + footDur)}" data-duration="${tail}" data-track-index="1" />`;
  }

  // Steps on the video's clock, matched to the note's rows by number.
  const byN = new Map(script.steps.map((s) => [String(s.n), s]));
  const norm = (t) => String(t || "").replace(/\*\*/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const steps = rec.steps.map((r) => {
    const row = byN.get(String(r.n)) || {};
    const T = r.targetPx;
    if (row.what && norm(row.what) !== norm(r.what) && !row.sized) {
      console.warn(
        `[kit] ${id} ${size} step ${r.n}: the robot does "${r.what}" but the note's line is for "${row.what}". ` +
          `If the voice or caption doesn't fit, add a ${size} line in voiceover\\${id}.sizes.json (see kit\\README.md).`,
      );
    }
    return {
      n: String(r.n),
      what: r.what,
      voiceKey: row.voiceKey || String(r.n),
      start: r3(footStart + r.start),
      end: r3(footStart + r.end),
      at: r.target ? r3(footStart + r.target.at) : null,
      target: T ? { x: T.x * k, y: T.y * k, w: T.width * k, h: T.height * k } : null,
      caption: row.caption || "",
      roman: row.voice || "",
    };
  });
  const last = steps[steps.length - 1];
  last.end = footEnd;

  const moves = camera(steps, L, CONFIG.zoom[size], footEnd);

  // Rings, in the camera's (unzoomed) space.
  const rings = [];
  const ringHtml = [];
  for (const st of steps) {
    if (!st.target) continue;
    const T = st.target;
    const p = L.pad;
    const box = { x: T.x - p, y: T.y - p, w: T.w + 2 * p, h: T.h + 2 * p };
    const round = Math.abs(box.w - box.h) < box.h * 0.15;
    const ringId = `ring-${st.n}`;
    const r = round ? "50%" : `${Math.min(L.ringR, box.h / 2)}px`;
    ringHtml.push(
      `          <div id="${ringId}" class="ring" style="left: ${r3(box.x)}px; top: ${r3(box.y)}px; width: ${r3(box.w)}px; height: ${r3(box.h)}px; border-radius: ${r};"></div>`,
    );
    const inAt = Math.max(st.start + 0.1, st.at - 0.12);
    // A tap usually changes the screen, so its ring leaves soon after; a typed box keeps it.
    const typing = /^type\b/i.test(st.what || "");
    const outAt = Math.max(inAt + 0.6, typing ? st.end - 0.3 : Math.min(st.end - 0.3, st.at + 0.55));
    rings.push({ id: ringId, in: r3(inAt), out: r3(Math.min(outAt, footEnd - 0.5)) });
  }

  // Progress thread: one knot per step.
  const N = steps.length;
  const knots = steps.map((st, i) => ({
    at: st.start,
    frac: N > 1 ? r3(i / (N - 1)) : 1,
    x: r3(L.progress.x0 + ((L.progress.x1 - L.progress.x0) * i) / Math.max(1, N - 1)),
  }));

  // Voice: each line at the start of its step.
  fs.mkdirSync(path.join(dir, "assets", "voice"), { recursive: true });
  const voiceTags = [];
  const timeline = [];
  for (const st of steps) {
    const line = voice?.lines[st.voiceKey];
    const row = { n: st.n, start: st.start, end: st.end, caption: st.caption, roman: st.roman, dev: line?.dev || "" };
    if (line) {
      const name = `${st.voiceKey}.wav`;
      fs.copyFileSync(line.file, path.join(dir, "assets", "voice", name));
      voiceTags.push(
        `      <audio id="voice-${st.voiceKey}" src="assets/voice/${name}" data-start="${st.start}" data-duration="${line.seconds}" data-track-index="11" data-volume="1"></audio>`,
      );
      row.voiceStart = r3(st.start + LEAD_IN);
      row.voiceEnd = r3(st.start + line.seconds);
      if (row.voiceEnd > st.end + 0.05) console.warn(`[kit] ${id} ${size}: step ${st.n}'s voice runs ${r3(row.voiceEnd - st.end)} s past its step. Record again.`);
    }
    timeline.push(row);
  }

  // Music under everything, lower under each line, fading out over the end card.
  const speech = timeline.filter((t) => t.voiceStart).map((t) => [t.voiceStart, t.voiceEnd]);
  buildBed(path.join(dir, "assets", "music-bed.wav"), duration, speech, { fadeOut: Math.max(CONFIG.music.fadeOut, endCard) });

  // Captions: one group per step, on the captions track (times local to the footage).
  const groups = steps
    .filter((s) => s.caption)
    .map((s) => {
      const kind = s.n === "0" ? "problem" : s.n === "end" ? "result" : "step";
      return {
        id: `cap-${s.n}`,
        kind,
        num: kind === "step" ? s.n : null,
        text: s.caption,
        start: r3(s.start - footStart + 0.2),
        end: r3(Math.min(s.end, footEnd - 0.4) - footStart),
      };
    });
  const groupHtml = groups
    .map(
      (g) =>
        `        <div id="${g.id}" class="clip cap cap-${g.kind}" data-start="${g.start}" data-duration="${r3(g.end - g.start)}" data-track-index="1">\n` +
        `          <div class="cap-in">${g.num ? `<span class="cap-num">${escapeHtml(g.num)}</span>` : ""}<span class="cap-text">${escapeHtml(g.text)}</span></div>\n` +
        `        </div>`,
    )
    .join("\n");
  const capData = { y: L.captions.y, size: L.captions.size, maxWidth: L.captions.maxWidth, groups: groups.map(({ id, text, start, end }) => ({ id, text, start, end })) };
  const capFile = path.join(dir, "compositions", "captions.html");
  fs.writeFileSync(capFile, fill(fs.readFileSync(capFile, "utf8"), { GROUPS: groupHtml, DATA: asciiJson(capData) }));

  // The root composition.
  const variables = [
    { id: "featureName", type: "string", label: "Feature name (intro, small)", default: script.featureName },
    { id: "howTo", type: "string", label: "How to ... (intro title)", default: script.howTo },
    { id: "sectionName", type: "string", label: "Section (phone, above the screen)", default: script.section },
    { id: "brandName", type: "string", label: "Brand name (end card)", default: CONFIG.help.brandName },
    { id: "helpUrl", type: "string", label: "Help address (end card)", default: CONFIG.help.url },
    { id: "ink", type: "color", label: "Ink (background)", default: "#12100e" },
    { id: "ivory", type: "color", label: "Ivory (text)", default: "#f3ede3" },
    { id: "mutedIvory", type: "color", label: "Muted ivory", default: "#b8ae9f" },
    { id: "gold", type: "color", label: "Gold (the one accent)", default: "#d4b06a" },
  ];
  const data = {
    W: L.W, H: L.H, duration, footStart, footEnd,
    card: L.card,
    eyebrow: L.eyebrow,
    camera: moves,
    rings,
    progress: { ...L.progress, knots },
  };
  const index = path.join(dir, "index.html");
  fs.writeFileSync(
    index,
    fill(fs.readFileSync(index, "utf8"), {
      RESOLUTION: size === "phone" ? "portrait" : "landscape",
      VARIABLES: asciiJson(variables).replace(/'/g, "\\u0027"),
      W: L.W,
      H: L.H,
      TITLE: escapeHtml(`${id} - ${script.howTo} (${size})`),
      DURATION: duration,
      FOOT_START: footStart,
      FOOT_DURATION: footDur,
      SHOW_DURATION: r3(footEnd - footStart),
      HOLD: holdHtml,
      INTRO: intro,
      END: endCard,
      END_START: footEnd,
      SECTION_ASCII: escapeHtml(script.section),
      RINGS: ringHtml.join("\n"),
      VOICES: voiceTags.join("\n"),
      DATA: asciiJson(data),
    }),
  );
  fs.writeFileSync(
    path.join(dir, "hyperframes.json"),
    JSON.stringify({ $schema: "https://hyperframes.heygen.com/schema/hyperframes.json", paths: { blocks: "compositions", assets: "assets" }, media: { autoProxy: true } }, null, 2) + "\n",
  );
  fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify({ id: `${id}-${size}`, name: `${id} ${script.howTo} (${size})` }, null, 2) + "\n");
  return { dir, duration, timeline, camera: moves };
}

export function fill(text, values) {
  return text.replace(/%%([A-Z_]+)%%/g, (m, k) => {
    if (!(k in values)) throw new Error(`Template value ${k} missing`);
    return String(values[k]);
  });
}
