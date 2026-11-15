// The timed voiceover note (voiceover/<ID>.md) and the .srt files that sit next to the videos.
import fs from "node:fs";
import path from "node:path";
import { CONFIG, P, fmtTime, r1 } from "./common.mjs";

/** .srt of what the voice says (the Voice says lines as written), timed to one size's video. */
export function writeSrt(file, timeline) {
  const rows = timeline.filter((t) => t.voiceStart && t.roman);
  const body = rows.map((t, i) => `${i + 1}\n${fmtTime(t.voiceStart)} --> ${fmtTime(t.voiceEnd)}\n${t.roman}\n`).join("\n");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
  return file;
}

const t = (s) => (s == null ? "" : `${r1(s).toFixed(1)}`);

/**
 * voiceover/<ID>.md: every line with its start and end in each size, what the AI voice reads, and
 * how to record your own voice for this video.
 */
export function writeVoiceNote({ id, title, note, first, voice, timelines, unknown, outputs }) {
  const sizes = [first, first === "phone" ? "desktop" : "phone"].filter((s) => timelines[s]);
  const rows = timelines[sizes[0]].map((row) => row.n);
  const cell = (s, n, k) => t(timelines[s]?.find((r) => r.n === n)?.[k]);
  const lines = [];
  const tag = { ai: CONFIG.voice.model, cloned: "cloned" }[voice.source] || "my-voice";
  const says = {
    ai: `AI voice \`${CONFIG.voice.model}\` (OpenMontage Piper), files in \`voiceover\\ai\\${id}\\\``,
    cloned: `your cloned voice (ElevenLabs \`${CONFIG.voice.cloned?.model}\`), files in \`voiceover\\cloned\\${id}\\\``,
  }[voice.source] || `your own recording, from \`voiceover\\my-voice\\\``;
  lines.push("---", "tags: [voiceover]", `video: ${id}`, `voice: ${tag}`, "---");
  lines.push(`# ${id} · ${title}`, "");
  lines.push(`From [[${note}]]. Made by \`npm run make\` in \`kit\\\`; don't edit by hand, it is written again on every make.`, "");
  lines.push(
    `**Voice:** ${says}. Each line starts at its step (after ${0.3} s of quiet).`,
    "",
  );
  const head = ["#", ...sizes.flatMap((s) => [`${s} start`, `${s} end`]), "Voice says", "Caption", "AI reads"];
  lines.push(`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`);
  for (const n of rows) {
    const r = timelines[sizes[0]].find((x) => x.n === n);
    // Sizes that say something else at this step get a row of their own.
    const own = sizes.slice(1).filter((s) => {
      const o = timelines[s].find((x) => x.n === n);
      return o && (o.roman !== r.roman || o.caption !== r.caption);
    });
    const times = sizes.flatMap((s) => (own.includes(s) ? ["", ""] : [cell(s, n, "voiceStart"), cell(s, n, "voiceEnd")]));
    lines.push(`| ${n} | ${times.join(" | ")} | ${r.roman} | ${r.caption} | ${r.dev} |`);
    for (const s of own) {
      const o = timelines[s].find((x) => x.n === n);
      const t2 = sizes.flatMap((z) => (z === s ? [cell(s, n, "voiceStart"), cell(s, n, "voiceEnd")] : ["", ""]));
      lines.push(`| ${n} (${s} only) | ${t2.join(" | ")} | ${o.roman} | ${o.caption} | ${o.dev} |`);
    }
  }
  lines.push("", "Times are seconds from the start of each finished video (the 3 s intro title included).", "");
  if (unknown.length) {
    lines.push(
      "## Check these words",
      "",
      `The AI voice spelled these by rule, so they may sound a little off: ${[...new Set(unknown)].map((w) => `**${w}**`).join(", ")}. Add them to \`kit\\voice\\hinglish-words.json\` and run make again.`,
      "",
    );
  }
  lines.push(
    "## Record your own voice for this video",
    "",
    `Read the **Voice says** lines in order, calmly, with about one second of quiet between lines. Save it as \`voiceover\\my-voice\\${id}.wav\`, then run \`npm run make -- --id ${id}\` in \`kit\\\`. The kit cuts it into lines, the robot records again so every step fits your voice, and both videos are made again with your voice.`,
    "",
  );
  if (outputs?.length) lines.push("## Files", "", ...outputs.map((o) => `- \`${o}\``), "");
  fs.writeFileSync(P.voiceMd(id), lines.join("\n"));
  return P.voiceMd(id);
}
