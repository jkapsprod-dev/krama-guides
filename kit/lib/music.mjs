// The music bed: the chosen track, evened out, turned down under every voice line with soft ramps,
// faded in at the start and out over the end card. Written as one WAV the composition plays.
import fs from "node:fs";
import { CONFIG, P, ffmpeg, loudnessGain, seconds } from "./common.mjs";

/** Gain envelope as [t, gain] points. voice = [[start, end], ...] in video seconds. */
export function envelope(total, voice, opts = {}) {
  const m = { ...CONFIG.music, ...opts };
  const base = m.level;
  const low = m.underVoice;
  const down = 0.35; // ramp under a line
  const up = 0.7; // ramp back after it
  // Lines close together stay ducked between them.
  const spans = [];
  for (const [a, b] of [...voice].sort((x, y) => x[0] - y[0])) {
    const last = spans[spans.length - 1];
    if (last && a - last[1] < down + up + 0.6) last[1] = Math.max(last[1], b);
    else spans.push([a, b]);
  }
  const pts = [[0, 0], [Math.min(0.8, total / 4), base]];
  for (const [a, b] of spans) {
    pts.push([Math.max(a - down, pts[pts.length - 1][0] + 0.01), base]);
    pts.push([Math.max(a, pts[pts.length - 1][0] + 0.01), low]);
    pts.push([Math.max(b, pts[pts.length - 1][0] + 0.01), low]);
    pts.push([Math.max(b + up, pts[pts.length - 1][0] + 0.01), base]);
  }
  const fadeAt = Math.max(pts[pts.length - 1][0] + 0.01, total - (opts.fadeOut ?? m.fadeOut));
  // The fade starts from whatever the level is at that moment.
  pts.push([fadeAt, gainAt(pts, fadeAt)]);
  pts.push([total, 0]);
  return pts.filter(([t]) => t <= fadeAt || t === total).sort((x, y) => x[0] - y[0]);
}

function gainAt(pts, t) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [t0, g0] = pts[i];
    const [t1, g1] = pts[i + 1];
    if (t >= t0 && t <= t1) return g0 + ((g1 - g0) * (t - t0)) / Math.max(1e-6, t1 - t0);
  }
  return pts[pts.length - 1][1];
}

/** ffmpeg expression for a piecewise-linear envelope (nested ifs). */
function expr(pts) {
  let e = String(pts[pts.length - 1][1].toFixed(4));
  for (let i = pts.length - 2; i >= 0; i--) {
    const [t0, g0] = pts[i];
    const [t1, g1] = pts[i + 1];
    const slope = (g1 - g0) / Math.max(1e-6, t1 - t0);
    e = `if(lt(t\\,${t1.toFixed(3)})\\,${g0.toFixed(4)}+${slope.toFixed(5)}*(t-${t0.toFixed(3)})\\,${e})`;
  }
  return e;
}

export function buildBed(out, total, voice, opts = {}) {
  const m = { ...CONFIG.music, ...opts };
  if (!fs.existsSync(P.music)) throw new Error(`Music file missing: ${P.music}`);
  const norm = loudnessGain(P.music, m.loudness);
  const pts = envelope(total, voice, opts);
  const loop = seconds(P.music) - m.startAt < total + 1;
  ffmpeg([
    ...(loop ? ["-stream_loop", "-1"] : []),
    "-ss", String(m.startAt),
    "-t", total.toFixed(3),
    "-i", P.music,
    "-af", `volume=${norm.toFixed(4)},volume=${expr(pts)}:eval=frame,alimiter=limit=0.84:level=false`,
    "-ar", "48000",
    "-ac", "2",
    out,
  ]);
  return pts;
}
