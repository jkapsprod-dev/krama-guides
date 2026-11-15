// npm run intro -- --lane 2       the 6-second section intro for lane 2 (phone and desktop)
// npm run intro -- --all          every lane
//
// Reads guides\<lane folder>\_section-intro.md (section name, its one line, the voice line), makes
// the voice, builds kit/template/section, checks it, and renders
// videos\final\<lane folder>\V-<lane>-section-intro-phone.mp4 and -desktop.mp4 with an .srt each.
// Options: --size phone|desktop, --no-render, --new-voice
import fs from "node:fs";
import path from "node:path";
import { CONFIG, FRAME, KIT, P, ROOT, SIZES, asciiJson, copyDir, escapeHtml, laneFolder, log, r3 } from "../lib/common.mjs";
import { readSectionIntro } from "../lib/note.mjs";
import { LEAD_IN, prepareVoice } from "../lib/voice.mjs";
import { buildBed } from "../lib/music.mjs";
import { check, render } from "../lib/hyperframes.mjs";
import { fill } from "../lib/build-guide.mjs";
import { writeSrt, writeVoiceNote } from "../lib/outputs.mjs";

const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const opt = (n) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

const BASE = 6; // seconds
const VOICE_AT = 0.2; // the voice starts just before the name appears

function makeIntro(lane) {
  const s = readSectionIntro(lane);
  const id = `V-${s.laneNumber}-section-intro`;
  log(`${id} · ${s.name} · guides\\${lane}\\_section-intro.md`);
  const voice = prepareVoice(id, [{ n: "1", roman: s.voice }], { force: flag("new-voice"), voice: CONFIG.voice.intro });
  const line = voice.lines["1"];
  // Six seconds, unless the voice needs a little longer to finish calmly.
  const duration = r3(Math.max(BASE, VOICE_AT + line.seconds + 0.6));
  if (duration > BASE) console.log(`[kit] ${id}: the voice is ${line.seconds} s, so the intro runs ${duration} s. A shorter Voice says line in _section-intro.md keeps it at ${BASE} s.`);
  const voiceStart = r3(VOICE_AT);
  const timeline = [{ n: "1", start: 0, end: duration, caption: s.line, roman: s.voice, dev: line.dev, voiceStart: r3(voiceStart + LEAD_IN), voiceEnd: r3(voiceStart + line.seconds) }];

  const sizes = opt("size") ? [opt("size")] : SIZES;
  const outputs = [];
  for (const size of sizes) {
    const { W, H } = FRAME[size];
    const dir = P.build(id, size);
    fs.rmSync(dir, { recursive: true, force: true });
    copyDir(path.join(KIT, "template", "section"), dir);
    copyDir(path.join(KIT, "brand", "fonts"), path.join(dir, "assets", "fonts"));
    fs.mkdirSync(path.join(dir, "assets", "brand"), { recursive: true });
    fs.mkdirSync(path.join(dir, "assets", "voice"), { recursive: true });
    fs.mkdirSync(path.join(dir, "shared"), { recursive: true });
    fs.copyFileSync(path.join(KIT, "brand", "grain.png"), path.join(dir, "assets", "brand", "grain.png"));
    fs.copyFileSync(path.join(KIT, "brand", "brand.css"), path.join(dir, "shared", "brand.css"));
    fs.copyFileSync(path.join(KIT, "brand", "brand.js"), path.join(dir, "shared", "brand.js"));
    fs.copyFileSync(line.file, path.join(dir, "assets", "voice", "1.wav"));
    buildBed(path.join(dir, "assets", "music-bed.wav"), duration, [[timeline[0].voiceStart, timeline[0].voiceEnd]], {
      level: Math.min(0.45, CONFIG.music.level * 1.4),
      fadeOut: 1.2,
    });

    const variables = [
      { id: "sectionName", type: "string", label: "Section name", default: s.name },
      { id: "line", type: "string", label: "Its one line", default: s.line },
      { id: "eyebrow", type: "string", label: "Small line above the name", default: "Krama guides" },
      { id: "ink", type: "color", label: "Ink (background)", default: "#12100e" },
      { id: "ivory", type: "color", label: "Ivory (text)", default: "#f3ede3" },
      { id: "mutedIvory", type: "color", label: "Muted ivory", default: "#b8ae9f" },
      { id: "gold", type: "color", label: "Gold (the one accent)", default: "#d4b06a" },
    ];
    const index = path.join(dir, "index.html");
    fs.writeFileSync(
      index,
      fill(fs.readFileSync(index, "utf8"), {
        RESOLUTION: size === "phone" ? "portrait" : "landscape",
        VARIABLES: asciiJson(variables).replace(/'/g, "\\u0027"),
        W,
        H,
        TITLE: escapeHtml(`${id} - ${s.name} (${size})`),
        DURATION: duration,
        VOICES: `      <audio id="voice-1" src="assets/voice/1.wav" data-start="${voiceStart}" data-duration="${line.seconds}" data-track-index="11" data-volume="1"></audio>`,
        DATA: asciiJson({ W, H, duration }),
      }),
    );
    fs.writeFileSync(
      path.join(dir, "hyperframes.json"),
      JSON.stringify({ $schema: "https://hyperframes.heygen.com/schema/hyperframes.json", paths: { blocks: "compositions", assets: "assets" } }, null, 2) + "\n",
    );
    fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify({ id: `${id}-${size}`, name: `${s.name} section intro (${size})` }, null, 2) + "\n");

    check(dir);
    const srt = path.join(P.final(lane), `${id}-${size}.srt`);
    writeSrt(srt, timeline);
    outputs.push(path.relative(ROOT, srt));
    if (!flag("no-render")) {
      const out = path.join(P.final(lane), `${id}-${size}.mp4`);
      render(dir, out);
      outputs.push(path.relative(ROOT, out));
    }
  }
  const timelines = Object.fromEntries(SIZES.map((z) => [z, timeline])); // the same in both sizes
  writeVoiceNote({ id, title: `Section intro · ${s.name}`, note: "_section-intro", first: sizes[0], voice, timelines, unknown: line.unknown || [], outputs });
  outputs.push(path.relative(ROOT, P.voiceMd(id)));
  return outputs;
}

const lanes = flag("all") ? fs.readdirSync(P.guides).filter((d) => /^\d-/.test(d) && fs.existsSync(path.join(P.guides, d, "_section-intro.md"))) : opt("lane") ? [laneFolder(opt("lane"))] : null;
if (!lanes) {
  console.log("Say which lane: --lane <n> or --all");
  process.exit(1);
}
let failed = 0;
for (const lane of lanes) {
  try {
    const files = makeIntro(lane);
    log(`done ${lane}\n${files.map((f) => `    ${f}`).join("\n")}`);
  } catch (e) {
    failed++;
    console.error(`\n[kit] ${lane} FAILED: ${e.message}`);
  }
}
process.exit(failed ? 1 : 0);
