// npm run make -- --id V-2-add-a-guest-1      one video (or several, with commas)
// npm run make -- --lane 2                    every video in lane 2 that has a robot spec
// npm run make -- --all                       every video that has a robot spec
//
// For each video, in order: voice lines → robot recording (holds fit the voice) → HyperFrames
// composition → hyperframes check → render phone and desktop → .srt next to them.
//
// Options:
//   --size phone|desktop   only one size
//   --no-record            reuse the last recording (for changes to look, captions, zoom, music)
//   --no-render            stop after the check (quick look: npx hyperframes@0.8.146 preview in kit\build\<ID>\<size>)
//   --new-voice            make every AI voice line again, even if nothing changed
import fs from "node:fs";
import path from "node:path";
import { P, ROOT, SIZES, laneFolder, log, run } from "../lib/common.mjs";
import { idsInLane, readScript } from "../lib/note.mjs";
import { prepareVoice, withRecorderVoice } from "../lib/voice.mjs";
import { buildGuide } from "../lib/build-guide.mjs";
import { check, render } from "../lib/hyperframes.mjs";
import { writeSrt, writeVoiceNote } from "../lib/outputs.mjs";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const opt = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

function specExists(id) {
  return fs.existsSync(path.join(P.recorder, "specs", laneFolder(id), `${id}.mjs`));
}

function pickIds() {
  if (opt("id")) return opt("id").split(",").map((s) => s.trim()).filter(Boolean);
  const lanes = flag("all")
    ? fs.readdirSync(P.guides).filter((d) => /^\d-/.test(d))
    : opt("lane")
      ? [laneFolder(opt("lane"))]
      : null;
  if (!lanes) {
    console.log("Say which videos: --id <ID>, --lane <n> or --all");
    process.exit(1);
  }
  const ids = lanes.flatMap((l) => idsInLane(l));
  const ready = ids.filter(specExists);
  const missing = ids.filter((id) => !specExists(id));
  if (missing.length) console.log(`[kit] ${missing.length} video(s) have no robot spec yet and are skipped (first: ${missing.slice(0, 3).join(", ")})`);
  return ready;
}

function makeOne(id) {
  const script = readScript(id);
  const sizes = opt("size") ? [opt("size")] : SIZES;
  log(`${id} · ${script.howTo} · guides\\${script.lane}\\${script.note}.md`);

  // Lines for one size only (voiceover\<ID>.sizes.json), where the robot does something else there.
  const sizedFile = path.join(ROOT, "voiceover", `${id}.sizes.json`);
  const sized = fs.existsSync(sizedFile) ? JSON.parse(fs.readFileSync(sizedFile, "utf8")) : {};
  const scriptFor = (size) => ({
    ...script,
    steps: script.steps.map((s) => {
      const o = sized[size]?.[String(s.n)];
      if (!o) return s;
      return { ...s, sized: true, voice: o.voice ?? s.voice, caption: o.caption ?? s.caption, voiceKey: o.voice ? `${size}-${s.n}` : String(s.n) };
    }),
  });

  // 1. Voice: the note's lines, each followed by any size-only line for the same step.
  const lines = [];
  for (const s of script.steps) {
    if (s.voice) lines.push({ n: String(s.n), roman: s.voice });
    for (const size of SIZES) {
      const o = sized[size]?.[String(s.n)];
      if (o?.voice) lines.push({ n: `${size}-${s.n}`, roman: o.voice });
    }
  }
  const voice = prepareVoice(id, lines, { force: flag("new-voice") });
  const unknown = Object.values(voice.lines).flatMap((l) => l.unknown || []);
  if (unknown.length) console.log(`[kit] words spelled by rule (check them): ${[...new Set(unknown)].join(", ")}`);

  // 2. Recording, sized to the voice.
  const rawJson = path.join(P.raw(script.lane), `${id}.json`);
  if (!flag("no-record") || !fs.existsSync(rawJson)) {
    log(`record ${id} (${sizes.join(" and ")})`);
    withRecorderVoice(id, voice, () =>
      run("npm", ["run", "record", "--", "--id", id, ...(opt("size") ? ["--size", opt("size")] : [])], { cwd: P.recorder }),
    );
  }
  const rec = JSON.parse(fs.readFileSync(rawJson, "utf8"));

  // 3–5. Build, check, render each size.
  const timelines = {};
  const outputs = [];
  for (const size of sizes) {
    if (!rec[size]) throw new Error(`${rawJson} has no ${size} take. Record it first.`);
    const built = buildGuide(scriptFor(size), rec[size], voice, size);
    timelines[size] = built.timeline;
    check(built.dir);
    const srt = path.join(P.final(script.lane), `${id}-${size}.srt`);
    writeSrt(srt, built.timeline);
    outputs.push(path.relative(ROOT, srt));
    if (!flag("no-render")) {
      const out = path.join(P.final(script.lane), `${id}-${size}.mp4`);
      render(built.dir, out);
      outputs.push(path.relative(ROOT, out));
    }
  }

  // Voiceover note with the real timings. With --size, the other size's times come from its last
  // recording (built again, not checked or rendered), so the note keeps both columns.
  for (const size of SIZES) {
    if (!timelines[size] && rec[size]) timelines[size] = buildGuide(scriptFor(size), rec[size], voice, size).timeline;
  }
  const md = writeVoiceNote({ id, title: script.howTo, note: script.note, first: script.first, voice, timelines, unknown, outputs });
  outputs.push(path.relative(ROOT, md));
  return outputs;
}

const ids = pickIds();
const done = [];
const failed = [];
for (const id of ids) {
  try {
    done.push([id, makeOne(id)]);
  } catch (e) {
    console.error(`\n[kit] ${id} FAILED: ${e.message}`);
    failed.push([id, e.message]);
  }
}
log(`done: ${done.length}, failed: ${failed.length}`);
for (const [id, files] of done) console.log(`  ${id}\n${files.map((f) => `    ${f}`).join("\n")}`);
for (const [id, msg] of failed) console.log(`  FAILED ${id}: ${msg.split("\n")[0]}`);
process.exit(failed.length ? 1 : 0);
