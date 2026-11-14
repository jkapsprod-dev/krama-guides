// Starts and stops the app for recording, exactly as app\docs\guides-recording.md says:
// local Supabase in Docker, .env.local from `pnpm guides:env`, `pnpm build`, `pnpm start --port 3400`.
// The only files it adds in app\ are git-ignored ones (node_modules, .next, .env.local).
import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { APP, APP_LOG, APP_URL, CACHE, PID_FILE, PORT } from "./paths.mjs";

const STATE_FILE = path.join(CACHE, "app-state.json"); // what was installed / built last time
const LOCK_DIR = path.join(CACHE, "app-start.lock");

const log = (msg) => console.log(`[app] ${msg}`);

/** Runs a command in app\ through cmd (so pnpm.cmd works on Windows), showing its output. */
function run(cmd, { quiet = false, allowFail = false } = {}) {
  if (!quiet) log(`> ${cmd}`);
  const r = spawnSync(cmd, {
    cwd: APP,
    shell: true,
    stdio: quiet ? "pipe" : "inherit",
    encoding: "utf8",
    windowsHide: true,
  });
  if (r.status !== 0 && !allowFail) {
    if (quiet) process.stderr.write(`${r.stdout ?? ""}${r.stderr ?? ""}`);
    throw new Error(`"${cmd}" failed (exit ${r.status}).`);
  }
  return r;
}

const git = (args) =>
  spawnSync("git", ["-C", APP, ...args], { encoding: "utf8" }).stdout?.trim() ?? "";

function fileHash(file) {
  return fs.existsSync(file) ? createHash("sha1").update(fs.readFileSync(file)).digest("hex") : "";
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  } catch {
    return {};
  }
}
function writeState(patch) {
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify({ ...readState(), ...patch }, null, 2));
}

/** True when the app answers on /login. */
export async function isUp() {
  try {
    const res = await fetch(`${APP_URL}/login`, { signal: AbortSignal.timeout(5000) });
    return res.status === 200;
  } catch {
    return false;
  }
}

function readPid() {
  try {
    return Number(fs.readFileSync(PID_FILE, "utf8").trim()) || null;
  } catch {
    return null;
  }
}

function pidAlive(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/** Only one lane sets up and starts the app at a time; the others wait and then share it. */
async function withLock(fn) {
  fs.mkdirSync(CACHE, { recursive: true });
  let told = false;
  for (;;) {
    try {
      fs.mkdirSync(LOCK_DIR);
      break;
    } catch {
      const age = Date.now() - (fs.statSync(LOCK_DIR, { throwIfNoEntry: false })?.mtimeMs ?? 0);
      if (age > 20 * 60_000) fs.rmSync(LOCK_DIR, { recursive: true, force: true }); // stale
      if (!told) log("Another lane is starting the app. Waiting…");
      told = true;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  try {
    return await fn();
  } finally {
    fs.rmSync(LOCK_DIR, { recursive: true, force: true });
  }
}

/** Step 1 of the doc: packages. Reinstalls when the lockfile changed. */
function ensureInstalled() {
  const lock = fileHash(path.join(APP, "pnpm-lock.yaml"));
  if (fs.existsSync(path.join(APP, "node_modules")) && readState().lockHash === lock) return;
  log("Installing the app's packages (pnpm install --frozen-lockfile)…");
  run("pnpm install --frozen-lockfile");
  writeState({ lockHash: lock });
}

/** Step 2: the local database in Docker, plus any new migrations. */
function ensureDatabase() {
  const docker = spawnSync("docker", ["info"], { stdio: "ignore" });
  if (docker.status !== 0) {
    throw new Error("Docker Desktop is not running. Start it (whale icon in the tray) and try again.");
  }
  const status = run("pnpm exec supabase status", { quiet: true, allowFail: true });
  if (status.status !== 0) {
    log("Starting the local database (first time takes a few minutes)…");
    run(
      "pnpm exec supabase start -x studio,imgproxy,vector,logflare,edge-runtime,realtime,postgres-meta,supavisor",
    );
  }
  run("pnpm exec supabase migration up", { quiet: true });
}

/** Step 3: .env.local, written by the app's own script (never copied by hand). */
function ensureEnv() {
  const file = path.join(APP, ".env.local");
  if (fs.existsSync(file) && /GUIDE_RECORDING=1/.test(fs.readFileSync(file, "utf8"))) return;
  log("Writing app\\.env.local (pnpm guides:env)…");
  run("pnpm guides:env");
}

/** Step 4a: build, again whenever app\ moved to another commit since the last build. */
function ensureBuilt() {
  const head = git(["rev-parse", "HEAD"]);
  const built = fs.existsSync(path.join(APP, ".next", "BUILD_ID"));
  if (built && readState().builtHead === head) return;
  log(`Building the app at ${head.slice(0, 8)} (3 to 6 minutes)…`);
  run("pnpm build");
  writeState({ builtHead: head });
}

/** Step 4b: `pnpm start --port 3400` in the background, with a pid file. */
async function launch() {
  fs.mkdirSync(CACHE, { recursive: true });
  const out = fs.openSync(APP_LOG, "a");
  fs.writeSync(out, `\n=== ${new Date().toISOString()} pnpm start --port ${PORT}\n`);
  const child = spawn("cmd.exe", ["/d", "/s", "/c", `pnpm start --port ${PORT}`], {
    cwd: APP,
    detached: true,
    stdio: ["ignore", out, out],
    windowsHide: true,
  });
  child.unref();
  fs.writeFileSync(PID_FILE, String(child.pid));
  log(`Started (pid ${child.pid}). Waiting for ${APP_URL}/login…`);
  const until = Date.now() + 120_000;
  while (Date.now() < until) {
    if (await isUp()) return;
    if (!pidAlive(child.pid)) break;
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`The app did not answer on ${APP_URL}/login. See ${APP_LOG}.`);
}

/** Starts the app if it isn't answering yet. Safe to call from several lanes at once. */
export async function ensureApp() {
  if (await isUp()) return;
  await withLock(async () => {
    if (await isUp()) return; // another lane started it while we waited
    ensureInstalled();
    ensureDatabase();
    ensureEnv();
    ensureBuilt();
    await launch();
  });
  log(`Ready at ${APP_URL}`);
}

/** Stops the app (the pid file's process tree, then anything still listening on the port). */
export async function stopApp({ db = false } = {}) {
  const pid = readPid();
  if (pid && pidAlive(pid)) {
    spawnSync("taskkill", ["/PID", String(pid), "/T", "/F"], { stdio: "ignore" });
    log(`Stopped pid ${pid}.`);
  }
  fs.rmSync(PID_FILE, { force: true });
  // `next start` is sometimes left behind on the port (guides-recording.md §4).
  spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-Command",
      `Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }`,
    ],
    { stdio: "ignore" },
  );
  log((await isUp()) ? `Something still answers on port ${PORT}.` : "The app is stopped.");
  if (db) {
    log("Stopping the local database (data is kept)…");
    run("pnpm exec supabase stop");
  }
}
