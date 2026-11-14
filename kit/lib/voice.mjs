// Voice lines: the AI voice (OpenMontage's Piper tool via tools/voice-line.py), or the owner's own
// recording from voiceover/my-voice/, which replaces the AI voice for that video.
import fs from "node:fs";
import path from "node:path";
import { CONFIG, P, ffmpeg, loudnessGain, log, run, seconds, r3 } from "./common.mjs";
import { toDevanagari } from "./hinglish.mjs";

const LEAD_IN = 0.3; // silence before each line, so the line starts just after its step does

/** Turn a file's level to the kit's loudness and keep peaks under -1.5 dBTP. In place. */
function evenOut(file, target) {
  const g = loudnessGain(file, target);
  const tmp = file.replace(/\.wav$/, ".tmp.wav");
  ffmpeg(["-i", file, "-af", `volume=${g.toFixed(4)},alimiter=limit=0.84:level=false`, "-ar", "48000", "-ac", "1", tmp]);
  fs.renameSync(tmp, file);
}

function aiLine(text, out, v = CONFIG.voice) {
  const res = run(
    P.python,
    [P.voiceLine, "--text", text, "--voice", v.model, "--speed", String(v.speed), "--pause", String(v.pause), "--lead-in", String(LEAD_IN), "--out", out],
    { shell: false, capture: true, cwd: path.dirname(P.voiceLine) },
  );
  if (!fs.existsSync(out)) throw new Error(`voice-line.py made no file for "${text}"\n${res.stderr}`);
  evenOut(out, v.loudness);
}

/**
 * Makes sure every voiced step has a line. `lines` is [{ n, roman }].
 * Returns { source: "ai" | "my-voice", dir, lines: { [n]: { file, seconds, roman, dev, unknown } } }.
 */
export function prepareVoice(id, lines, opts = {}) {
  restoreHeld(id);
  const mine = myVoice(id, lines);
  const aiDir = P.voiceAi(id);
  fs.mkdirSync(aiDir, { recursive: true });
  const manifestFile = path.join(aiDir, "_lines.json");
  const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, "utf8")) : {};
  const v = { ...CONFIG.voice, ...(opts.voice || {}) };
  const out = {};
  const keep = new Set(["_lines.json"]);

  for (const { n, roman } of lines) {
    const { text: dev, unknown } = toDevanagari(roman);
    const file = path.join(aiDir, `${n}.wav`);
    keep.add(`${n}.wav`);
    const want = { roman, dev, model: v.model, speed: v.speed, pause: v.pause, loudness: v.loudness };
    const have = manifest[n];
    if (opts.force || !fs.existsSync(file) || JSON.stringify(have) !== JSON.stringify(want)) {
      log(`voice ${id} step ${n}: ${roman}  →  ${dev}`);
      aiLine(dev, file, v);
      manifest[n] = want;
    }
    out[n] = { file, seconds: r3(seconds(file)), roman, dev, unknown };
  }
  // Lines that left the script.
  for (const f of fs.readdirSync(aiDir)) {
    if (!keep.has(f) && /\.wav$/.test(f)) fs.rmSync(path.join(aiDir, f));
  }
  for (const k of Object.keys(manifest)) if (!lines.some((l) => String(l.n) === k)) delete manifest[k];
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + "\n");

  if (mine) {
    for (const { n } of lines) out[n] = { ...out[n], file: mine[n], seconds: r3(seconds(mine[n])) };
    return { source: "my-voice", lines: out };
  }
  return { source: "ai", lines: out };
}

/**
 * The owner's voice for this video, if any:
 *   voiceover/my-voice/<ID>/<step>.wav  one file per line, or
 *   voiceover/my-voice/<ID>.wav         one file for the whole video, read in order with a pause
 *                                       of about a second between lines. The kit cuts it into lines.
 * Returns { [n]: file } or null.
 */
function myVoice(id, lines) {
  const dir = path.join(P.myVoice, id);
  const whole = [".wav", ".mp3", ".m4a"].map((e) => path.join(P.myVoice, id + e)).find((f) => fs.existsSync(f));
  const perLine = () => lines.every(({ n }) => fs.existsSync(path.join(dir, `${n}.wav`)));
  if (!whole && fs.existsSync(dir) && perLine()) return Object.fromEntries(lines.map(({ n }) => [n, path.join(dir, `${n}.wav`)]));
  if (!whole) return null;

  const stamp = path.join(dir, "_cut-from.json");
  const st = fs.statSync(whole);
  const sig = { file: path.basename(whole), size: st.size, mtime: st.mtimeMs, lines: lines.map((l) => l.n) };
  if (fs.existsSync(stamp) && JSON.stringify(JSON.parse(fs.readFileSync(stamp, "utf8"))) === JSON.stringify(sig) && perLine()) {
    return Object.fromEntries(lines.map(({ n }) => [n, path.join(dir, `${n}.wav`)]));
  }

  log(`my voice: cutting ${path.basename(whole)} into ${lines.length} lines`);
  const parts = splitBySilence(whole, lines.length);
  if (!parts) {
    throw new Error(
      `voiceover\\my-voice\\${path.basename(whole)}: couldn't find ${lines.length} separate lines in it. ` +
        `Leave about a second of quiet between lines, or save one file per line as voiceover\\my-voice\\${id}\\<step>.wav`,
    );
  }
  fs.mkdirSync(dir, { recursive: true });
  const ms = Math.round(LEAD_IN * 1000);
  lines.forEach(({ n }, i) => {
    const [a, b] = parts[i];
    const from = Math.max(0, a - 0.12);
    const to = b + 0.15;
    const f = path.join(dir, `${n}.wav`);
    const fadeAt = (to - from + LEAD_IN - 0.12).toFixed(3);
    ffmpeg(["-ss", String(from), "-to", String(to), "-i", whole, "-af", `adelay=${ms}|${ms},afade=t=out:st=${fadeAt}:d=0.12`, "-ar", "48000", "-ac", "1", f]);
    evenOut(f, CONFIG.voice.loudness);
  });
  fs.writeFileSync(stamp, JSON.stringify(sig));
  return Object.fromEntries(lines.map(({ n }) => [n, path.join(dir, `${n}.wav`)]));
}

/** Speech stretches [start, end] in a file, trying a few pause lengths until there are `want` of them. */
function splitBySilence(file, want) {
  const total = seconds(file);
  for (const noise of [-35, -40, -30]) {
    for (const d of [0.6, 0.45, 0.8, 1.0, 0.35]) {
      const res = run("ffmpeg", ["-hide_banner", "-nostats", "-i", file, "-af", `silencedetect=noise=${noise}dB:d=${d}`, "-f", "null", "-"], {
        shell: false,
        capture: true,
      });
      const err = res.stderr || "";
      const starts = [...err.matchAll(/silence_start: (-?[\d.]+)/g)].map((m) => Number(m[1]));
      const ends = [...err.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));
      const speech = [];
      let cursor = 0;
      starts.forEach((s, i) => {
        if (s - cursor > 0.2) speech.push([cursor, s]);
        cursor = ends[i] ?? total;
      });
      if (total - cursor > 0.2) speech.push([cursor, total]);
      if (speech.length === want) return speech;
    }
  }
  return null;
}

/**
 * The robot sizes each step to voiceover/ai/<ID>/<step>.wav. When the owner's voice is used, it
 * stands in there while the robot records, and the AI files come back afterwards.
 */
export function withRecorderVoice(id, voice, fn) {
  if (voice.source !== "my-voice") return fn();
  const aiDir = P.voiceAi(id);
  const held = aiDir + ".ai-held";
  fs.renameSync(aiDir, held);
  try {
    fs.mkdirSync(aiDir, { recursive: true });
    for (const [n, l] of Object.entries(voice.lines)) fs.copyFileSync(l.file, path.join(aiDir, `${n}.wav`));
    return fn();
  } finally {
    restoreHeld(id);
  }
}
function restoreHeld(id) {
  const aiDir = P.voiceAi(id);
  const held = aiDir + ".ai-held";
  if (!fs.existsSync(held)) return;
  fs.rmSync(aiDir, { recursive: true, force: true });
  fs.renameSync(held, aiDir);
}

export { LEAD_IN };
