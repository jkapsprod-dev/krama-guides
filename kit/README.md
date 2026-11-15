# The Krama video kit

One command turns a guide note's video script into a finished guide video. It makes the voice, has
the robot record the app, then gives the recording the Krama look and renders a phone video and a
desktop video. The look is the launch film's fonts, colours, grain and gold thread.

Every command below runs from the `kit` folder, in PowerShell, cmd or Git Bash.

## 1. Before you start

- 1C and 3B set everything up: Node 24, FFmpeg, OpenMontage with the Piper voice, HyperFrames 0.8.146
  and the recording robot. The kit needs nothing else installed.
- **Docker Desktop must be running.** The robot needs it to start the app.
- The video needs a robot spec: `recorder\specs\<lane folder>\<ID>.mjs` (see `recorder\README.md`).

## 2. Make a video

```bash
npm run make -- --id V-2-add-a-guest-1
```

That one command does all of this, in this order:

1. **Voice.** It reads the **Voice says** lines from the video's script table in the guide note.
   It makes each one with OpenMontage's Piper voice and saves it as
   `voiceover\ai\<ID>\<step>.wav`. Lines that haven't changed are not made again.
2. **Recording.** The robot records the phone and desktop takes. Each step lasts at least as long as
   its voice line plus half a second, so the voice always fits.
3. **Build.** It makes one HyperFrames project per size in `kit\build\<ID>\phone` and `\desktop`:
   - a 3 s title with the feature name and "How to …"
   - the recording in a rounded screen card, with a soft gold ring and a gentle zoom on each tapped
     element
   - a short caption under the screen for each step
   - a gold thread that fills in step by step
   - a 3 s end card with "Krama Events" and krama.events/help
   - the voice lines, each placed at the start of its step
   - the music, quiet under the whole video, lower under each voice line, fading out on the end card
4. **Check.** `npx hyperframes@0.8.146 check` must pass, or the video stops there.
5. **Render.** Both sizes are rendered at about 3 Mbps.

More than one video:

```bash
npm run make -- --id V-2-add-a-guest-1,V-2-add-a-guest-2
npm run make -- --lane 2
npm run make -- --all
```

`--lane` and `--all` make every video whose note isn't planned or removed **and** that has a robot
spec. They say which ones they skipped. If one video fails, the rest still get made, and a list at
the end tells you what failed.

Options:

| Option | What it does |
|---|---|
| `--no-record` | Reuses the last recording. Use it after a change to look, captions, zoom or music |
| `--size phone` or `--size desktop` | Makes one size only |
| `--no-render` | Stops after the check. Then `npm run preview -- --id <ID> --size phone` opens it in the browser |
| `--new-voice` | Makes every AI voice line again |

## 3. What you get

For `V-2-add-a-guest-1` (lane folder `2-guests`):

| File | What it is |
|---|---|
| `videos\final\2-guests\V-2-add-a-guest-1-phone.mp4` | Phone video, 1080×1920 |
| `videos\final\2-guests\V-2-add-a-guest-1-desktop.mp4` | Desktop video, 1920×1080 |
| `videos\final\2-guests\V-2-add-a-guest-1-phone.srt`, `-desktop.srt` | Subtitles: what the voice says, timed to that video |
| `voiceover\V-2-add-a-guest-1.md` | Every line with its start and end in both videos, what the AI voice reads, and how to record your own |
| `voiceover\ai\V-2-add-a-guest-1\<step>.wav` | The AI voice lines |

The captions burned into the video are the note's **Caption** column, in English. The `.srt` files
hold the spoken Hinglish lines.

Each recording also refreshes the step screenshots in `guides\img\<note>\` (the robot does that).
Videos, `.srt` files and voice WAVs stay out of git (`.gitignore`); back them up with the folder.

## 4. Section intros

```bash
npm run intro -- --lane 2
npm run intro -- --all
```

Each intro is 6 seconds, unless its voice line is longer: then it runs just long enough for the
line (lane 2's line is 5.7 s, so its intro is 6.5 s; a shorter **Voice says** line brings it back to 6). It shows the section name and its one line from
`guides\<lane folder>\_section-intro.md`, with the gold mark, the thread, the voice line and the
music. It runs a little longer only if the voice needs it. The files are
`videos\final\<lane folder>\V-<lane>-section-intro-phone.mp4` and `-desktop.mp4`, each with an
`.srt`.

## 5. Changing things

Change the setting, then run make again. Add `--no-record` unless the recording itself must change.

| You want | Change this |
|---|---|
| A step longer or shorter | **Hold (s)** in the note's script table and `hold` in the robot spec. Then make again, recording included |
| Different caption words | The **Caption** column in the note (8 words at most) |
| Bigger or smaller captions | `captions` in `kit.config.json` |
| More or less zoom | `zoom` in `kit.config.json`. `max` is for small buttons, `min` for wide boxes. `1` means no zoom. Phone is set to `1`, so the whole phone screen always shows |
| Music louder or quieter | `music.level` (when nobody speaks) and `music.underVoice` (under a line) in `kit.config.json` |
| A different track | Put it in `music\`, then set `music.file` |
| Another AI voice, or slower speech | `voice.model` (`hi_IN-priyamvada-medium`, `hi_IN-pratham-medium`, `hi_IN-rohan-medium`) and `voice.speed` (higher is slower) in `kit.config.json`, then make again with the recording |
| A word sounds wrong | Add it to `kit\voice\hinglish-words.json` (see below) |
| A line or caption for one size only | `voiceover\<ID>.sizes.json` (see below) |
| The look itself | `kit\template\guide\` (the title, the screen, the captions, the end card) and `kit\brand\` |

### Hinglish words

The Hindi Piper voices read Devanagari well and Roman letters badly. So the kit spells each
Hinglish line in Devanagari, word by word, using `kit\voice\hinglish-words.json`. A word that isn't in
the list is spelled by simple rules. Make prints it, and `voiceover\<ID>.md` lists it under
**Check these words**. Add the word in lower case, for example `"mehmaan": "मेहमान"`, and run make
again.

To spell a whole line your own way, add it under `"lines"`, written exactly as in the note.

### A line for one size only

Sometimes the robot does a different thing on desktop. For example, a computer has no (+) button,
so the desktop take taps **Add guest** instead. Make warns when this happens. To fix it, write
`voiceover\<ID>.sizes.json`:

```json
{
  "desktop": {
    "1": { "voice": "Upar Add guest pe tap karo.", "caption": "Tap Add guest" }
  }
}
```

The keys are the step numbers from the note's script table. Leave out `voice` or `caption` to keep
the note's one.

## 6. Use your own voice

There are two ways. Both work for every video, and the robot records again, so each step fits your
voice.

| | Your cloned voice | Your own recording |
|---|---|---|
| You record | One sample, once (1 to 3 minutes) | Every line of every video |
| New or changed lines | Made for you | You record them again |
| Sounds like | A very close copy of you | Exactly you |
| Cost | ElevenLabs, about $0.10 a video | Free |

If a video has your own recording, that wins. If not, your cloned voice is used when it's switched on.
Otherwise the video gets the free Piper voice.

### Your cloned voice

1. Record 1 to 3 minutes of yourself talking calmly in Hinglish, the way you'd explain the app to a
   family. Use a quiet room with your phone about a hand away from your mouth, and keep it to one
   person only. Reading a few guide lines out loud works well.
2. Save it as `voiceover\my-voice\sample.wav`. MP3 and M4A work too. Several files work as
   `sample-1.wav`, `sample-2.wav` and so on.
3. Run `npm run clone-voice`. It cleans the sample a little and makes your voice on ElevenLabs, using
   the key in `tools\OpenMontage\.env`. It saves the voice's id in `voiceover\my-voice\voice.json` and
   switches the kit to it (`voice.engine` becomes `"cloned"`). This needs an ElevenLabs plan with
   voice cloning (Starter or above). Only clone your own voice, or a voice you have written permission
   to use.
4. Run `npm run make -- --id <ID>` (and `npm run intro -- --lane <n>`) to make videos in your voice.

Each line is made knowing the line before it and the line after it, so the voice carries on from line
to line like one person talking, not like separate clips. The lines are saved in
`voiceover\cloned\<ID>\`. Only new or changed lines are made again, because each one costs a little.
Make prints the cost before it starts, and it stops if one video would cost more than
`voice.cloned.maxCostPerVideo` in `kit.config.json` ($1).

To tune how it sounds, change `voice.cloned` in `kit.config.json`, then run make again:

| You want | Change |
|---|---|
| Livelier, more natural ups and downs | `stability` lower (0.35) and `style` higher (0.35) |
| Steadier, calmer | `stability` higher (0.6) and `style` lower (0.1) |
| Faster or slower | `speed` (1 is your sample's pace; 0.7 to 1.2) |
| Read from the Hinglish as written | `text` to `"roman"` (`"devanagari"` usually sounds more natural) |

To go back to the Piper voice, run `npm run clone-voice -- --off`. `--on` switches back to your cloned
voice. A new sample needs `npm run clone-voice -- --again`.

### Your own recording for one video

1. Open `voiceover\<ID>.md`. Read the **Voice says** lines in order, calmly. Leave about **one second
   of quiet** between lines. Include any line marked for one size only (`desktop-1` and so on), right
   after its step.
2. Save it as `voiceover\my-voice\<ID>.wav`. MP3 and M4A work too.
3. Run `npm run make -- --id <ID>`.

The kit cuts your recording into lines at the pauses. It also cleans each line lightly: it cuts rumble,
lowers steady background noise and evens out loud and soft words. Then it evens out the volume, so you
sound clear but still like yourself. If the kit can't find the right number of lines, it says so. Then
leave longer pauses, or save one file per line as `voiceover\my-voice\<ID>\<step>.wav`.

To go back to the AI voice, delete or move your file and run make again.

While the robot records, the voice it uses stands in `voiceover\ai\<ID>\` for a moment, because that
is where the robot looks. The Piper files are put back afterwards.

## 7. If something goes wrong

| Problem | Fix |
|---|---|
| "Docker Desktop is not running" | Start Docker Desktop, then run make again |
| A step fails while recording | See `recorder\README.md`, section 6 |
| "the robot does … but the note's line is for …" | The two sizes differ at that step. Add a line for that size (section 5) |
| "voice runs … s past its step" | Run make again with the recording, so the robot can lengthen the step |
| `hyperframes check` fails | It prints each error with a `Fix:` line. If you changed `kit\template\`, the change is the likely cause |
| A render is slow | Normal: about 4 to 8 minutes per size on this PC. `--size phone` makes one size |
| You want to look before rendering | `npm run make -- --id <ID> --no-record --no-render`, then `npm run preview -- --id <ID> --size phone` |

## 8. What's where

| Path | What it is |
|---|---|
| `bin\make.mjs`, `bin\intro.mjs`, `bin\preview.mjs`, `bin\clone-voice.mjs` | The commands |
| `lib\` | Reading notes, voice, music, building, check and render, timings |
| `template\guide\` | The guide video: `index.html` (screen, rings, zoom, thread, sound) and `compositions\` (intro title, captions, end card) |
| `template\section\` | The section intro |
| `brand\` | Fonts (SIL OFL), grain, mark and thread, copied from `app\promo\launch-60s`. Nothing here links into `app\` |
| `voice\hinglish-words.json` | How the AI voice says each word |
| `voice\cloud.py` | Makes your cloned voice and its lines (ElevenLabs, through OpenMontage) |
| `kit.config.json` | Voice, music levels, zoom, caption size, bitrate |
| `build\` | The projects make last built (not in git, rebuilt every time) |
