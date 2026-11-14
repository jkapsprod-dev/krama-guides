// Where everything lives. The recorder sits in krama-guides\recorder; the app copy in krama-guides\app.
import path from "node:path";
import { fileURLToPath } from "node:url";

export const RECORDER = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const ROOT = path.resolve(RECORDER, "..");
export const APP = path.join(ROOT, "app");
export const CACHE = path.join(RECORDER, ".cache"); // git-ignored
export const SPECS = path.join(RECORDER, "specs");
export const PID_FILE = path.join(RECORDER, "app.pid"); // git-ignored (recorder/*.pid)
export const APP_LOG = path.join(CACHE, "app.log");

export const PORT = 3400; // docs/guides-recording.md
export const APP_URL = `http://127.0.0.1:${PORT}`; // 127.0.0.1, not localhost, so cookies match

export const rawDir = (laneFolder) => path.join(ROOT, "videos", "raw", laneFolder);
export const imgDir = (note) => path.join(ROOT, "guides", "img", note);
export const voiceFile = (id, step) => path.join(ROOT, "voiceover", "ai", id, `${step}.wav`);
