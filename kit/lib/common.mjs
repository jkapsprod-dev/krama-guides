// Paths, settings and small helpers shared by every kit command.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const KIT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const ROOT = path.resolve(KIT, "..");
export const CONFIG = JSON.parse(fs.readFileSync(path.join(KIT, "kit.config.json"), "utf8"));

export const P = {
  guides: path.join(ROOT, "guides"),
  raw: (lane) => path.join(ROOT, "videos", "raw", lane),
  final: (lane) => path.join(ROOT, "videos", "final", lane),
  voiceAi: (id) => path.join(ROOT, "voiceover", "ai", id),
  myVoice: path.join(ROOT, "voiceover", "my-voice"),
  voiceMd: (id) => path.join(ROOT, "voiceover", `${id}.md`),
  build: (id, size) => path.join(KIT, "build", id, size),
  recorder: path.join(ROOT, "recorder"),
  python: path.join(ROOT, "tools", "OpenMontage", ".venv", "Scripts", "python.exe"),
  voiceLine: path.join(ROOT, "tools", "voice-line.py"),
  music: path.join(ROOT, CONFIG.music.file),
};

export const SIZES = ["phone", "desktop"];
export const FRAME = { phone: { W: 1080, H: 1920 }, desktop: { W: 1920, H: 1080 } };

/** The lane folder in guides\ (and videos\, recorder\specs\) for a lane number or an ID. */
export function laneFolder(laneOrId) {
  const n = String(laneOrId).match(/^(?:V-)?(\d+)/)?.[1];
  if (!n) throw new Error(`Can't tell the lane from "${laneOrId}"`);
  const dir = fs.readdirSync(P.guides).find((d) => d.startsWith(`${n}-`) && fs.statSync(path.join(P.guides, d)).isDirectory());
  if (!dir) throw new Error(`No guides folder for lane ${n}`);
  return dir;
}

/** Run a command, streaming its output. Throws on failure unless opts.allowFail. */
export function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    cwd: opts.cwd || ROOT,
    stdio: opts.capture ? ["ignore", "pipe", "pipe"] : "inherit",
    encoding: "utf8",
    shell: opts.shell ?? process.platform === "win32",
    env: { ...process.env, ...(opts.env || {}) },
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.error) throw res.error;
  if (res.status !== 0 && !opts.allowFail) {
    const tail = opts.capture ? `\n${(res.stdout || "").slice(-3000)}\n${(res.stderr || "").slice(-3000)}` : "";
    throw new Error(`${cmd} ${args.join(" ")} failed (exit ${res.status})${tail}`);
  }
  return res;
}

/** ffmpeg / ffprobe without a shell (paths with spaces stay safe). */
export function ffmpeg(args, opts = {}) {
  return run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { shell: false, ...opts });
}
export function seconds(file) {
  const out = run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], {
    capture: true,
    shell: false,
  }).stdout.trim();
  return Number(out);
}

/** Two-pass EBU R128 measurement; returns the gain (linear) that brings the file to `target` LUFS. */
export function loudnessGain(file, target) {
  const res = run("ffmpeg", ["-hide_banner", "-nostats", "-i", file, "-af", "ebur128=framelog=quiet", "-f", "null", "-"], {
    capture: true,
    shell: false,
  });
  const m = (res.stderr || "").match(/I:\s+(-?[\d.]+) LUFS/g);
  const lufs = m ? Number(m[m.length - 1].match(/-?[\d.]+/)[0]) : NaN;
  if (!Number.isFinite(lufs) || lufs < -70) return 1;
  return Math.pow(10, (target - lufs) / 20);
}

export const r3 = (n) => Math.round(n * 1000) / 1000;
export const r1 = (n) => Math.round(n * 10) / 10;

/** JSON safe to put inside an HTML page that may be read without a charset: non-ASCII as \uXXXX. */
export function asciiJson(value, space) {
  return JSON.stringify(value, null, space).replace(/[\u007f-\uffff]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
}
export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/[^\x00-\x7f]/g, "");
}

export function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name);
    const b = path.join(to, e.name);
    if (e.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

export function fmtTime(t) {
  const ms = Math.max(0, Math.round(t * 1000));
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const pad = (n, w = 2) => String(n).padStart(w, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms % 1000, 3)}`;
}

export function log(msg) {
  console.log(`\n[kit] ${msg}`);
}
