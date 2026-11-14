// Finds the video specs: recorder\specs\<lane folder>\<ID>.mjs (lane folder as in guides\, e.g. 2-guests).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { SPECS } from "./paths.mjs";

export async function loadSpecs() {
  const specs = [];
  if (!fs.existsSync(SPECS)) return specs;
  for (const laneFolder of fs.readdirSync(SPECS).sort()) {
    const dir = path.join(SPECS, laneFolder);
    const lane = Number(laneFolder.split("-")[0]);
    if (!fs.statSync(dir).isDirectory() || !(lane >= 1 && lane <= 5)) continue;
    for (const name of fs.readdirSync(dir).sort(byVideoId)) {
      if (!/^V-.*\.mjs$/.test(name)) continue;
      const file = path.join(dir, name);
      const spec = (await import(pathToFileURL(file).href)).default;
      const id = name.replace(/\.mjs$/, "");
      if (spec.id !== id) throw new Error(`${file}: its id is "${spec.id}", the file name says "${id}".`);
      if (!spec.note) throw new Error(`${file}: add note: "<guide note name>".`);
      specs.push({ ...spec, lane, laneFolder, file });
    }
  }
  return specs;
}

/** V-2-add-a-guest-2 before V-2-add-a-guest-10. */
function byVideoId(a, b) {
  return a.localeCompare(b, "en", { numeric: true });
}
