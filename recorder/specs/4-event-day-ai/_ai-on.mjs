// node _ai-on.mjs  — starts the stand-in AI (port 3499) and a SECOND copy of the app on port 3410 that
// uses it (the main app on 3400 is not touched and keeps running without AI). Lane 4's AI videos open
// http://127.0.0.1:3410 and sign in with the same saved session. Stop both with node _ai-off.mjs.
// It sets AI_BASE_URL, AI_API_KEY and AI_MODEL only for that one process; no file in app\ changes.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(here, "..", "..", "..", "app");
const PIDS = path.join(here, ".ai-pids.json");
const LOG = path.join(here, ".ai.log");
export const AI_APP_PORT = 3410;

const up = async (url) => {
  try {
    return (await fetch(url, { signal: AbortSignal.timeout(3000) })).ok;
  } catch {
    return false;
  }
};

const out = fs.openSync(LOG, "a");
const pids = fs.existsSync(PIDS) ? JSON.parse(fs.readFileSync(PIDS, "utf8")) : {};

if (!(await up("http://127.0.0.1:3499/_health"))) {
  const s = spawn(process.execPath, [path.join(here, "_stand-in-ai.mjs")], { detached: true, stdio: ["ignore", out, out], windowsHide: true });
  s.unref();
  pids.standIn = s.pid;
}
if (!(await up(`http://127.0.0.1:${AI_APP_PORT}/login`))) {
  const a = spawn("cmd.exe", ["/d", "/s", "/c", `pnpm start --port ${AI_APP_PORT}`], {
    cwd: APP,
    detached: true,
    stdio: ["ignore", out, out],
    windowsHide: true,
    env: { ...process.env, AI_BASE_URL: "http://127.0.0.1:3499/v1", AI_API_KEY: "stand-in", AI_MODEL: "stand-in" },
  });
  a.unref();
  pids.app = a.pid;
}
fs.writeFileSync(PIDS, JSON.stringify(pids));
const until = Date.now() + 120_000;
while (Date.now() < until) {
  if ((await up("http://127.0.0.1:3499/_health")) && (await up(`http://127.0.0.1:${AI_APP_PORT}/login`))) {
    console.log(`Stand-in AI on 3499 and the app with AI on http://127.0.0.1:${AI_APP_PORT}`);
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 1000));
}
console.error(`Did not come up. See ${LOG}.`);
process.exit(1);
