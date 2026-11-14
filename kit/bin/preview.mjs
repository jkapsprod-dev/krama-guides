// npm run preview -- --id V-2-add-a-guest-1 --size phone
// Opens the last built project for that video in the HyperFrames preview (browser). Build it first
// with `npm run make -- --id <ID> --no-record --no-render` if you only want to look.
import fs from "node:fs";
import { CONFIG, P, run } from "../lib/common.mjs";

const argv = process.argv.slice(2);
const opt = (n) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const id = opt("id");
const size = opt("size") || "phone";
if (!id) {
  console.log("Say which video: --id <ID> [--size phone|desktop]");
  process.exit(1);
}
const dir = P.build(id, size);
if (!fs.existsSync(dir)) {
  console.log(`Nothing built for ${id} (${size}) yet. Run: npm run make -- --id ${id} --no-record --no-render`);
  process.exit(1);
}
run("npx", ["--yes", `hyperframes@${CONFIG.hyperframes}`, "preview"], { cwd: dir });
