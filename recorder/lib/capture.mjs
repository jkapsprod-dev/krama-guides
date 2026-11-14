// Records the page sharply: Chrome's screencast sends frames at full device pixels (2x), and
// ffmpeg turns them into a steady 30 fps H.264 MP4. Playwright's built-in video is soft and low
// bitrate, so it isn't used. Frames only arrive when the page changes; the last frame is repeated
// in between, so the video's clock matches the real clock (the step times in <ID>.json rely on it).
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const FPS = 30;

export class Capture {
  /** @param {import("playwright").Page} page @param {{width:number,height:number}} out pixels */
  constructor(page, out, file) {
    this.page = page;
    this.out = out;
    this.file = file;
    this.latest = null;
    this.written = 0;
    this.t0 = 0;
    this.frozen = false;
  }

  async start() {
    fs.mkdirSync(path.dirname(this.file), { recursive: true });
    const { width, height } = this.out;
    this.ffmpeg = spawn(
      "ffmpeg",
      [
        ...["-y", "-loglevel", "error"],
        ...["-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-"],
        ...["-vf", `scale=${width}:${height}:flags=lanczos,setsar=1`],
        ...["-c:v", "libx264", "-preset", "medium", "-crf", "16"],
        ...["-pix_fmt", "yuv420p", "-r", String(FPS), "-movflags", "+faststart", this.file],
      ],
      { stdio: ["pipe", "ignore", "pipe"], windowsHide: true },
    );
    this.ffmpegErr = "";
    this.ffmpeg.stderr.on("data", (d) => (this.ffmpegErr += d));
    this.ffmpeg.stdin.on("error", () => {}); // reported on exit instead
    this.done = new Promise((resolve) => this.ffmpeg.on("close", resolve));

    this.cdp = await this.page.context().newCDPSession(this.page);
    let first;
    const gotFirst = new Promise((r) => (first = r));
    this.cdp.on("Page.screencastFrame", ({ data, sessionId }) => {
      this.cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
      if (this.frozen) return;
      this.latest = Buffer.from(data, "base64");
      if (!this.t0) {
        this.t0 = performance.now();
        first();
      }
      this.pump();
    });
    await this.cdp.send("Page.startScreencast", {
      format: "jpeg",
      quality: 95,
      maxWidth: width,
      maxHeight: height,
      everyNthFrame: 1,
    });
    await gotFirst;
    this.timer = setInterval(() => this.pump(), 1000 / FPS / 2);
  }

  /** Seconds since the first frame: the position in the finished video. */
  now() {
    return (performance.now() - this.t0) / 1000;
  }

  /** Writes the latest frame until the video has caught up with the clock. */
  pump() {
    if (!this.latest) return;
    const due = Math.floor(this.now() * FPS) + 1;
    while (this.written < due) {
      this.ffmpeg.stdin.write(this.latest);
      this.written++;
    }
  }

  /** While frozen, the video keeps showing the last frame (used while taking a screenshot). */
  async frozenWhile(fn) {
    this.pump();
    this.frozen = true;
    try {
      return await fn();
    } finally {
      this.frozen = false;
    }
  }

  async stop() {
    this.pump();
    clearInterval(this.timer);
    await this.cdp.send("Page.stopScreencast").catch(() => {});
    await this.cdp.detach().catch(() => {});
    this.ffmpeg.stdin.end();
    const code = await this.done;
    if (code !== 0) throw new Error(`ffmpeg failed (exit ${code}): ${this.ffmpegErr}`);
    return this.written / FPS;
  }
}
