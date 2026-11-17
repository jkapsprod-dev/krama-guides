// node _ai-off.mjs  — stops the stand-in AI and the second app copy (port 3410) that _ai-on.mjs started.
// The main app on port 3400 is left running.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const PIDS = path.join(here, ".ai-pids.json");
const pids = fs.existsSync(PIDS) ? JSON.parse(fs.readFileSync(PIDS, "utf8")) : {};
for (const pid of Object.values(pids)) spawnSync("taskkill", ["/PID", String(pid), "/T", "/F"], { stdio: "ignore" });
for (const port of [3410, 3499]) {
  spawnSync(
    "powershell.exe",
    ["-NoProfile", "-Command", `Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }`],
    { stdio: "ignore" },
  );
}
fs.rmSync(PIDS, { force: true });
fs.rmSync(path.join(here, ".ai.log"), { force: true });
console.log("Stopped the stand-in AI and the app on port 3410.");
