# The recording robot

The robot clicks through the real app and records raw, silent videos for the guides. It also starts
and stops the app for you. It adds no titles or effects. The video kit (`kit\`) does that later.

Run every command below from the `recorder` folder in Git Bash, cmd or PowerShell.

## 1. One-time setup

1. Have **Node 24**, **pnpm**, **ffmpeg** and **Docker Desktop** (running) on the PC. 1C set these up.
2. Install the robot's one package (Playwright 1.63.0, the same version as the app, so its Chromium is
   already on the PC):

   ```bash
   npm install
   ```

## 2. Start and stop the app

```bash
npm run app:start
```

This does what `app\docs\guides-recording.md` says, one step at a time, and skips any step that is
already done:

1. Installs the app's packages (`pnpm install --frozen-lockfile`) if they are missing or the lockfile
   changed.
2. Starts the local database in Docker if it is down, then applies new migrations.
3. Writes `app\.env.local` with `pnpm guides:env` if it is missing. This turns on recording mode.
4. Builds the app (`pnpm build`, 3 to 6 minutes) if `app\` is on a new commit since the last build.
5. Runs `pnpm start --port 3400` in the background, writes `recorder\app.pid`, and waits until
   `http://127.0.0.1:3400/login` answers.

The app's output goes to `recorder\.cache\app.log`. The only files the robot adds in `app\` are ones
git ignores (`node_modules`, `.next`, `.env.local`).

You don't have to start the app first: every `record` command starts it if it isn't running. Several
lanes can record at the same time and share one app. If two start it at once, one waits for the other.

```bash
npm run app:stop
```

This stops the app. The database keeps running, because other copies of the app may use it. To stop the database too:
`npm run app:stop -- --db` (the data is kept).

After `git -C app pull`, just record again: the robot sees the new commit and rebuilds. Stop the app
first if it is running, so the new build is the one that starts.

## 3. Record

```bash
npm run record -- --id V-2-add-a-guest-1
npm run record -- --lane 2
npm run record -- --all
npm run list
```

- `--id` records one video (or several, with commas). `--lane` records every video in one lane, and
  `--all` records everything.
- Each video is recorded twice: **phone** (390×844) and **desktop** (1920×1080), both at 2× so they
  are sharp. Add `--size phone` or `--size desktop` for only one.
- Add `--no-shots` to skip the step screenshots.
- `npm run list` shows every video the robot knows.

Before **each** take, the robot resets that lane's demo data (`pnpm seed:guides --lane N`), so every
video starts from the same story. Each role signs in once off camera, and the robot keeps the sign-in
in `recorder\.cache\auth\`. No video types a password.

## 4. What you get

For a video `V-2-add-a-guest-1` in lane folder `2-guests`:

| File | What it is |
|---|---|
| `videos\raw\2-guests\V-2-add-a-guest-1-phone.mp4` | Phone take, 780×1688, 30 fps |
| `videos\raw\2-guests\V-2-add-a-guest-1-desktop.mp4` | Desktop take, 3840×2160, 30 fps |
| `videos\raw\2-guests\V-2-add-a-guest-1.json` | For each size: where each step starts and ends (seconds) and where the tapped element was (`target` in screen points, `targetPx` in video pixels). The kit uses it for highlights and zooms |
| `guides\img\add-a-guest\V-2-add-a-guest-1-<step>-<size>.png` | One screenshot per step, without the robot's cursor (phone at 2×, desktop at 1920×1080) |

A cursor glides to each target in 0.6 to 0.8 seconds. On phone it's a soft fingertip dot and on
desktop it's an arrow. Each tap shows a small ripple.

If a take fails, the robot keeps going with the next one. It deletes the half-made video and saves
the screen at the failure to `recorder\.cache\failures\`.

## 5. Write a new video spec

Each video in a guide note's **Video scripts** gets one file:
`recorder\specs\<lane folder>\<ID>.mjs`, for example `specs\2-guests\V-2-add-a-guest-1.mjs`. The lane
folder is the same as in `guides\`. Copy that file and change it. Each `step()` is one row of the
script table:

```js
await step({ n: 3, what: "Type Rekha Mausi in Full name", hold: 6,
  do: () => type(form.getByLabel("Full name", { exact: true }), "Rekha Mausi") });
```

- `n` is the row's **#** (0, 1, 2 … `end`), `what` is **Robot does**, and `hold` is **Hold (s)**.
- `do` is what the robot does in that row. Leave it out for a row that only shows the screen.
- `hold` is the whole length of the step, the action included.
- **Voice:** if `voiceover\ai\<ID>\<n>.wav` exists (for example `voiceover\ai\V-2-add-a-guest-1\3.wav`),
  the step lasts at least as long as that line plus half a second, so the voice always fits. Record
  again after adding voice files.

The spec also sets:

- `id`: the video ID, the same as the file name.
- `note`: the guide note's name (screenshots go to `guides\img\<note>\`).
- `role`: who is signed in: `host`, `helper`, `planner` or `vendor`. Leave it out for a guest-link video.
- `start(seed)`: the page to open off camera before recording starts. `seed.weddingPath` is `/w/<id>`.
  The seed also gives `plannerPath`, `vendorPath` and `guestLinkPath`.
- `setup` (optional): anything to do off camera before recording starts.

These helpers are there to use inside `run`:

| Helper | What it does |
|---|---|
| `tap(locator)` | Glide to it and tap it, with a ripple |
| `type(locator, text)` | Tap a box, then type at a calm pace |
| `show(locator)` | Glide to it without tapping (it still counts as the step's target) |
| `page` | The Playwright page, for anything else |
| `phone` | `true` on the phone take, `false` on desktop. Use it where the two screens differ |

Find buttons by the names the app shows (`app\messages\en.json`), the same words the guide uses in
bold. If the app has no clear way to find something, write it in the lane's `_needs-app-changes.md`.
Never change `app\`.

## 6. If something goes wrong

| Problem | Fix |
|---|---|
| "Docker Desktop is not running" | Start Docker Desktop (whale icon in the tray), then run the command again |
| "Too many attempts" on sign-in | `docker exec supabase_db_krama-celebrations psql -U postgres -c "delete from public.edge_rate_limits"`, then record again |
| The app won't start | Read `recorder\.cache\app.log`. Run `npm run app:stop`, then `npm run app:start` |
| A step waits and then fails | Open the screenshot in `recorder\.cache\failures\`. A button may have a new name. Fix the spec |
| A step runs longer than its hold | The robot warns you. Raise that step's `hold` in the spec |
