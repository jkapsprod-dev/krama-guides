// npm run clone-voice             make your cloned voice from voiceover\my-voice\sample.wav and switch
//                                  the kit to it (voice.engine "cloned" in kit.config.json)
// npm run clone-voice -- --off    go back to the free Piper voice (your cloned voice is kept)
// npm run clone-voice -- --on     use the cloned voice again
// npm run clone-voice -- --again  make the cloned voice again from a new sample
//
// The sample: 1 to 3 minutes of you talking calmly in Hinglish, in a quiet room, one person only.
// MP3 and M4A work too. Several files work as sample-1.wav, sample-2.wav and so on.
// Only clone your own voice, or a voice you have written permission to use.
import fs from "node:fs";
import path from "node:path";
import { KIT, P, ffmpeg, log, run, seconds } from "../lib/common.mjs";
import { CLONED_FILE, clonedVoice } from "../lib/voice.mjs";

const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const opt = (n) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const CONFIG_FILE = path.join(KIT, "kit.config.json");

function setEngine(name) {
  const text = fs.readFileSync(CONFIG_FILE, "utf8");
  const next = text.replace(/"engine": "[a-z]+"/, `"engine": "${name}"`);
  if (next === text && !text.includes(`"engine": "${name}"`)) throw new Error('kit.config.json has no "engine" setting under "voice"');
  fs.writeFileSync(CONFIG_FILE, next);
  log(`voice.engine is now "${name}" in kit.config.json`);
}

if (flag("off")) {
  setEngine("piper");
  console.log("Make videos again to hear the Piper voice: npm run make -- --id <ID>");
  process.exit(0);
}
if (flag("on")) {
  if (!clonedVoice()) {
    console.log("There is no cloned voice yet. Put your sample in voiceover\\my-voice\\sample.wav and run npm run clone-voice");
    process.exit(1);
  }
  setEngine("cloned");
  process.exit(0);
}

const samples = fs.existsSync(P.myVoice)
  ? fs.readdirSync(P.myVoice).filter((f) => /^sample(-\d+)?\.(wav|mp3|m4a)$/i.test(f)).sort().map((f) => path.join(P.myVoice, f))
  : [];
if (!samples.length) {
  console.log(
    "No sample found. Record 1 to 3 minutes of yourself talking calmly in Hinglish (a quiet room, phone close to your mouth),\n" +
      "save it as voiceover\\my-voice\\sample.wav (MP3 or M4A work too), then run npm run clone-voice again.",
  );
  process.exit(1);
}
const total = samples.reduce((a, f) => a + seconds(f), 0);
const sig = samples.map((f) => ({ file: path.basename(f), size: fs.statSync(f).size }));
const have = clonedVoice();
if (have && !flag("again") && JSON.stringify(have.samples) === JSON.stringify(sig)) {
  log(`your cloned voice already exists (${have.voiceId}), made from the same sample`);
  setEngine("cloned");
  process.exit(0);
}
if (total < 30) console.log(`[kit] the sample is only ${total.toFixed(0)} s. It works, but 1 to 3 minutes sounds much more like you.`);

// Light clean-up before upload: cut rumble, lower steady background noise. ElevenLabs also
// removes background noise on its side.
const tmp = path.join(KIT, "build", "voice-sample");
fs.mkdirSync(tmp, { recursive: true });
const cleaned = samples.map((f, i) => {
  const out = path.join(tmp, `sample-${i + 1}.wav`);
  ffmpeg(["-i", f, "-af", "highpass=f=80,afftdn=nf=-28", "-ar", "44100", "-ac", "1", out]);
  return out;
});

const name = opt("name") || "Krama guide voice";
log(`making your cloned voice "${name}" on ElevenLabs from ${samples.length} file(s), ${total.toFixed(0)} s`);
const res = run(
  P.python,
  [path.join(KIT, "voice", "cloud.py"), "clone", "--name", name, "--denoise", ...cleaned.flatMap((f) => ["--sample", f])],
  { shell: false, capture: true, allowFail: true, cwd: path.join(KIT, "voice") },
);
let made;
try {
  made = JSON.parse((res.stdout || "").trim().split("\n").pop());
} catch {
  made = null;
}
if (!made || !made.voice_id) {
  console.error(`[kit] ElevenLabs didn't make the voice.\n${res.stderr || res.stdout || ""}`);
  console.error("Instant voice cloning needs an ElevenLabs plan that includes it (Starter or above).");
  process.exit(1);
}
fs.writeFileSync(
  CLONED_FILE,
  JSON.stringify({ provider: "elevenlabs", voiceId: made.voice_id, name, samples: sig, sampleSeconds: Math.round(total), made: new Date().toISOString().slice(0, 10) }, null, 2) + "\n",
);
log(`saved voiceover\\my-voice\\voice.json (voice ${made.voice_id})`);
if (made.requires_verification) console.log("[kit] ElevenLabs asks you to verify this voice in its website before it can be used.");
setEngine("cloned");
console.log(
  "\nNext: make a video in your cloned voice. The robot records again so every step fits it:\n" +
    "  npm run make -- --id V-2-add-a-guest-1\n" +
    "Back to the Piper voice any time: npm run clone-voice -- --off",
);
