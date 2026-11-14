// Reads a guide note's video script (### <ID> · How to … table) and a lane's _section-intro.md.
import fs from "node:fs";
import path from "node:path";
import { P, laneFolder } from "./common.mjs";

const clean = (s) =>
  String(s || "")
    .replace(/\*\*/g, "")
    .replace(/^["“”]+|["“”]+$/g, "")
    .trim();

function cells(line) {
  const parts = line.split("|").map((c) => c.trim());
  return parts.slice(1, parts.length - 1);
}

/** Every video ID written in the notes of one lane folder, in note order. */
export function idsInLane(lane) {
  const dir = path.join(P.guides, lane);
  const ids = [];
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort()) {
    const text = fs.readFileSync(path.join(dir, f), "utf8");
    if (/^status:\s*(planned|removed)\s*$/m.test(text)) continue;
    for (const m of text.matchAll(/^### (V-[\w-]+) ·/gm)) ids.push(m[1]);
  }
  return ids;
}

/** The script for one video. */
export function readScript(id) {
  const lane = laneFolder(id);
  const dir = path.join(P.guides, lane);
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const text = fs.readFileSync(path.join(dir, f), "utf8");
    const lines = text.split(/\r?\n/);
    const at = lines.findIndex((l) => l.startsWith(`### ${id} ·`) || l.trim() === `### ${id}`);
    if (at < 0) continue;

    const head = lines[at].split("·").map((s) => s.trim());
    const howTo = clean(head[1] || "");
    const first = /desktop first/i.test(lines[at]) ? "desktop" : "phone";
    const featureName = clean((text.match(/^# (.+)$/m) || [])[1] || "");

    const steps = [];
    let header = null;
    for (let i = at + 1; i < lines.length; i++) {
      const l = lines[i];
      if (/^#{1,3} /.test(l)) break;
      if (!l.startsWith("|")) continue;
      const c = cells(l);
      if (!header) {
        header = c.map((h) => h.toLowerCase());
        continue;
      }
      if (c.every((x) => /^-+$/.test(x))) continue;
      const col = (name) => c[header.findIndex((h) => h.startsWith(name))] ?? "";
      steps.push({
        n: col("#"),
        what: clean(col("robot does")),
        hold: Number(col("hold")) || 0,
        voice: clean(col("voice says")),
        caption: clean(col("caption")),
      });
    }
    if (!steps.length) throw new Error(`${id}: found the heading in ${f} but no script table under it`);
    return { id, lane, note: f.replace(/\.md$/, ""), noteFile: path.join(dir, f), howTo, first, featureName, section: sectionName(lane), steps };
  }
  throw new Error(`No "### ${id} ·" heading in guides\\${lane}\\`);
}

export function sectionName(lane) {
  const f = path.join(P.guides, lane, "_section-intro.md");
  if (!fs.existsSync(f)) return "";
  return (fs.readFileSync(f, "utf8").match(/^section:\s*(.+)$/m) || [])[1]?.trim() || "";
}

/** The section intro: name and one line (English, on screen) and the voice line. */
export function readSectionIntro(lane) {
  const f = path.join(P.guides, lane, "_section-intro.md");
  const text = fs.readFileSync(f, "utf8");
  const row = (label) => {
    const l = text.split(/\r?\n/).find((x) => x.startsWith("|") && cells(x)[0]?.replace(/\*\*/g, "").toLowerCase().startsWith(label));
    if (!l) throw new Error(`${f}: no "${label}" row`);
    return cells(l).map(clean);
  };
  const name = row("section name");
  const line = row("one short line");
  const voice = row("voice says");
  return {
    lane,
    laneNumber: Number(lane.split("-")[0]),
    name: name[1] || sectionName(lane),
    line: line[1],
    voice: voice[2] || voice[1],
  };
}
