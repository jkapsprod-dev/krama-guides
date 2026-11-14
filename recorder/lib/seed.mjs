// Resets one lane's demo data (`pnpm seed:guides --lane N` in app\) and reads the printed links.
// The wedding's address changes on every reset, so every take reads it fresh.
import { spawnSync } from "node:child_process";

import { APP, APP_URL } from "./paths.mjs";

export function seedLane(lane) {
  const r = spawnSync(`pnpm seed:guides --lane ${lane}`, {
    cwd: APP,
    shell: true,
    encoding: "utf8",
    windowsHide: true,
    env: { ...process.env, GUIDES_APP_URL: APP_URL },
  });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  if (r.status !== 0) throw new Error(`Seeding lane ${lane} failed:\n${out}`);

  const pick = (re) => out.match(re)?.[1] ?? null;
  const weddingPath = pick(/Wedding:.*?https?:\/\/[^/\s]+(\/w\/[\w-]+)/);
  if (!weddingPath) throw new Error(`Could not read the wedding address from the seed output:\n${out}`);
  return {
    lane,
    weddingPath, // e.g. /w/<uuid>
    weddingId: pick(/ID\s+(\S+)/), // the public wedding ID shown in the app
    plannerPath: pick(/Planner:.*?https?:\/\/[^/\s]+(\/business\/[\w-]+)/),
    vendorPath: pick(/Vendor:.*?https?:\/\/[^/\s]+(\/business\/[\w-]+)/),
    guestLinkPath: pick(/Guest link.*?https?:\/\/[^/\s]+(\/rsvp\/\S+)/),
    output: out.trim(),
  };
}

/** Demo logins (docs/guides-recording.md §6). Test values only, made up by the seed. */
export function login(lane, role) {
  return {
    email: `guide-l${lane}-${role}@example.test`,
    password: `KramaGuide${lane}demo`,
  };
}
