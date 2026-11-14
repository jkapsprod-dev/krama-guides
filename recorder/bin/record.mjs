// npm run record -- --id V-2-add-a-guest-1     one video (both sizes)
// npm run record -- --lane 2                   every video in one lane
// npm run record -- --all                      everything
// Options: --size phone | desktop (only one size), --no-shots (skip step screenshots),
//          --list (show the videos the robot knows).
import { chromium } from "playwright";

import { ensureApp } from "../lib/app.mjs";
import { loadSpecs } from "../lib/catalog.mjs";
import { recordTake, SIZES } from "../lib/video.mjs";

const args = process.argv.slice(2);
const values = (flag) => {
  const out = [];
  args.forEach((a, i) => {
    if (a === flag && args[i + 1]) out.push(...args[i + 1].split(","));
    else if (a.startsWith(`${flag}=`)) out.push(...a.slice(flag.length + 1).split(","));
  });
  return out;
};

const specs = await loadSpecs();

if (args.includes("--list")) {
  for (const s of specs) console.log(`${s.id.padEnd(28)} lane ${s.lane}  ${s.laneFolder}/${s.note}`);
  process.exit(0);
}

const ids = values("--id");
const lanes = values("--lane").map(Number);
const sizes = values("--size");
for (const s of sizes) {
  if (!SIZES[s]) {
    console.error(`Unknown size "${s}". Use phone or desktop.`);
    process.exit(1);
  }
}

let chosen;
if (args.includes("--all")) chosen = specs;
else if (ids.length || lanes.length) {
  chosen = specs.filter((s) => ids.includes(s.id) || lanes.includes(s.lane));
  const missing = ids.filter((id) => !specs.some((s) => s.id === id));
  if (missing.length) {
    console.error(`No spec for ${missing.join(", ")}. Run npm run list to see them.`);
    process.exit(1);
  }
} else {
  console.error("Say what to record: --id <ID>, --lane <N> or --all. See recorder\\README.md.");
  process.exit(1);
}
if (!chosen.length) {
  console.error("Nothing to record.");
  process.exit(1);
}

await ensureApp(); // starts the app if it isn't running; several lanes share one app

const browser = await chromium.launch({ headless: true });
const failed = [];
const saved = [];
try {
  for (const spec of chosen) {
    for (const size of sizes.length ? sizes : ["phone", "desktop"]) {
      try {
        saved.push(await recordTake(browser, spec, size, { shots: !args.includes("--no-shots") }));
      } catch (e) {
        console.error(e.message);
        failed.push(`${spec.id} ${size}`);
      }
    }
  }
} finally {
  await browser.close();
}

console.log(`\nDone: ${saved.length} recorded${failed.length ? `, ${failed.length} failed: ${failed.join("; ")}` : ""}.`);
for (const f of saved) console.log(`  ${f}`);
process.exit(failed.length ? 1 : 0);
