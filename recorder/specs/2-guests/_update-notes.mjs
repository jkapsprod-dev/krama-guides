// node recorder/specs/2-guests/_update-notes.mjs [--dry] : writes the real timings into the lane 2 notes' script tables,
// applies note-edits.mjs, and sets status / checked / video in each note's front matter.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = "C:/Users/jayka/code/krama-guides";
const DIR = path.join(ROOT, "guides", "2-guests");
const RAW = path.join(ROOT, "videos", "raw", "2-guests");
const FINAL = path.join(ROOT, "videos", "final", "2-guests");
const TODAY = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
const dry = process.argv.includes("--dry");
const edits = await import("./_note-edits.mjs");

function duration(file) {
  try {
    return Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }));
  } catch {
    return null;
  }
}

const report = [];
for (const f of fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"))) {
  const file = path.join(DIR, f);
  let text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  if (/^status:\s*(planned|removed)/m.test(text)) continue;
  const note = f.replace(/\.md$/, "");
  for (const [a, b] of edits.textEdits[note] ?? []) {
    if (!text.includes(a)) report.push(`${note}: text edit not found: ${a.slice(0, 50)}`);
    text = text.split(a).join(b);
  }
  const lines = text.split("\n");
  const ids = [];
  let madeAll = true;
  let anyVideo = false;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^### (V-[\w-]+) · (.+?) · about (\d+) s · (.+)$/);
    if (!m) continue;
    const id = m[1];
    ids.push(id);
    const rawFile = path.join(RAW, `${id}.json`);
    const raw = fs.existsSync(rawFile) ? JSON.parse(fs.readFileSync(rawFile, "utf8")) : null;
    const phoneMp4 = path.join(FINAL, `${id}-phone.mp4`);
    const desktopMp4 = path.join(FINAL, `${id}-desktop.mp4`);
    const made = fs.existsSync(phoneMp4) && fs.existsSync(desktopMp4);
    if (made) anyVideo = true;
    else madeAll = false;
    // heading: the real length of the phone video
    const len = duration(phoneMp4);
    if (len) lines[i] = `### ${id} · ${m[2]} · about ${Math.round(len)} s · ${m[4]}`;
    // rows
    const holds = {};
    for (const size of ["phone", "desktop"]) {
      for (const s of raw?.[size]?.steps ?? []) holds[s.n] = Math.max(holds[s.n] ?? 0, Math.ceil(s.length));
    }
    let j = i + 1;
    for (; j < lines.length && !/^#{1,3} /.test(lines[j]); j++) {
      if (!lines[j].startsWith("|")) continue;
      const cells = lines[j].split("|").slice(1, -1).map((c) => c.trim());
      if (cells.length < 5 || /^-+$/.test(cells[0]) || cells[0] === "#") continue;
      const n = cells[0];
      const e = edits.rowEdits[id];
      if (e && n in e && e[n]) cells[1] = e[n];
      if (holds[n]) cells[2] = String(holds[n]);
      lines[j] = `| ${cells.join(" | ")} |`;
    }
  }
  text = lines.join("\n");
  if (ids.length) {
    const status = madeAll ? "final" : "draft";
    text = text.replace(/^status: .*$/m, `status: ${status}`).replace(/^checked: .*$/m, `checked: ${madeAll ? TODAY : "no"}`).replace(/^video: .*$/m, `video: ${madeAll ? "made" : anyVideo ? "partly made" : "script"}`);
  }
  report.push(`${note}: ${ids.length} videos, ${madeAll ? "all made" : "not all made"}`);
  if (!dry) fs.writeFileSync(file, text.replace(/\n/g, "\r\n"));
}
console.log(report.join("\n"));
