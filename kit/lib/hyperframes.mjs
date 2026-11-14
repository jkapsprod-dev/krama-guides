// Check and render a built project with the pinned HyperFrames CLI.
import fs from "node:fs";
import path from "node:path";
import { CONFIG, log, run } from "./common.mjs";

const HF = `hyperframes@${CONFIG.hyperframes}`;

/** npx hyperframes check. Throws on errors; prints warnings. */
export function check(dir) {
  log(`check ${path.relative(process.cwd(), dir) || dir}`);
  const res = run("npx", ["--yes", HF, "check", "--json"], { cwd: dir, capture: true, allowFail: true });
  const text = (res.stdout || "").trim();
  let report = null;
  try {
    report = JSON.parse(text.slice(text.indexOf("{")));
  } catch {
    /* not JSON: fall back to the exit code */
  }
  const findings = [];
  const walk = (v) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") {
      if (typeof v.severity === "string" && (v.message || v.rule || v.code)) findings.push(v);
      Object.values(v).forEach(walk);
    }
  };
  walk(report);
  const errors = findings.filter((f) => /error/i.test(f.severity));
  const warnings = findings.filter((f) => /warn/i.test(f.severity));
  for (const f of warnings) console.log(`  warning  ${f.rule || f.code || ""}  ${f.message || ""}`);
  for (const f of errors) console.log(`  ERROR    ${f.rule || f.code || ""}  ${f.message || ""}${f.fix ? `\n           Fix: ${f.fix}` : ""}`);
  if (res.status !== 0 || errors.length) {
    if (!findings.length) console.log(text.slice(-4000), (res.stderr || "").slice(-2000));
    throw new Error(`hyperframes check found ${errors.length || "some"} error(s) in ${dir}`);
  }
  console.log(`  check passed (${warnings.length} warning${warnings.length === 1 ? "" : "s"})`);
  return { warnings };
}

/** Render to `out` (an absolute path). */
export function render(dir, out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const tmp = path.join(dir, "renders", path.basename(out));
  log(`render ${path.basename(out)}`);
  const t0 = Date.now();
  const res = run("npx", ["--yes", HF, "render", "--quality", CONFIG.video.quality, "--video-bitrate", CONFIG.video.bitrate, "--output", "renders/" + path.basename(out)], {
    cwd: dir,
    capture: true,
    allowFail: true,
  });
  const said = `${res.stdout || ""}\n${res.stderr || ""}`;
  for (const l of said.split(/\r?\n/)) {
    if (/rendered in|Lint:|error/i.test(l) && !/@hf-progress|\[INFO\]/.test(l)) console.log("  " + l.trim());
  }
  if (res.status !== 0) throw new Error(`hyperframes render failed:\n${said.slice(-3000)}`);
  if (!fs.existsSync(tmp)) throw new Error(`Render made no file at ${tmp}`);
  fs.copyFileSync(tmp, out);
  console.log(`  ${out}  (${Math.round((Date.now() - t0) / 1000)} s)`);
  return out;
}
