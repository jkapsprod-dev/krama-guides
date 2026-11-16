---
tags: [guide]
lane: 2
who: [couple, family, helper, planner]
status: draft
checked: no
video: partly made
internal: false
code: ["app/w/[workspaceId]/stays/pickups/page.tsx", "app/w/[workspaceId]/stays/pickups/run-form.tsx", "app/w/[workspaceId]/stays/pickups/pickup-controls.tsx", "app/w/[workspaceId]/stays/pickups/actions.ts", "app/w/[workspaceId]/stays/pickups/waiting.ts", "lib/pickups/plan.ts", "app/pickup/[token]/page.tsx"]
---
# Pickups

**What it is:** Pickups groups arrivals into trips. Each trip, called a run, has a place, a time, a vehicle and a driver. Each driver gets a private page with only their runs.
**Why you'd use it:** Three flights land at Ahmedabad airport between 6 and 7 am the day before the sangeet. One car takes all of them. The driver needs the list, and the time moves when a flight is late.

## How to plan pickup runs
1. Open **Stays & Travel**. On a phone, tap **More** first.
2. Tap the **Pickups** tab.
3. Under **Waiting for a run**, set the **Time window (minutes)**. Add **Seats per vehicle** if you know it.
4. Tap **Suggest runs**.
5. Read the **Suggested runs**. Nothing is saved yet.
6. Tap **Make these runs**.

Each new run still needs a vehicle and a driver. Tap **Edit** on the run and fill in **Vehicle** and **Driver**. The steps are in the next task.

**Tip:** Krama puts people from one place into one run if they land close together. A longer time window means fewer runs.
**Stuck?** Guests with no arrival time can't be grouped. Add their time under **Arrivals & departures**, or add them to a run by hand.

## How to add a run by hand
1. Open the **Pickups** tab.
2. Tap **Add a run**.
3. Fill in the **Arrival place**, **Date** and **Leaves at**.
4. Fill in the **Vehicle** and **Seats for guests**.
5. Choose the **Driver**.
6. Tap **Save run**.

To add a guest to the run, use **Add someone arriving that day**. Pick the guest in **Choose…** and tap **Add**. To remove a guest, tap **Take out**.

**Tip:** Put the pillar or gate in **Meeting point**, like Gate 4. The driver sees it.
**Stuck?** The **Driver** box lists your vendors and your team. If the driver is not there, add them in **Money**, under **Vendors**, first.

## How to move a run that's late
1. Open the **Pickups** tab.
2. Find the run.
3. Tap **Running late?**
4. Type how late in **How late**, like 40 min.
5. Tap **Move the run**.

The driver's page shows the new time when they open it. Krama does not message the driver or the guests. Tell them yourself if you want to.

**Tip:** Type "on time" to put the run back to its planned time.
**Stuck?** If Krama can't read it, type it like "40 min" or "1h 10m". The most you can add is 12 hours.

## How to send a driver their link
1. Open the **Pickups** tab.
2. Scroll to **Drivers' links**.
3. Tap **Make a link** under the driver's name.
4. Tap **Send on WhatsApp**. Your WhatsApp opens with a ready message.
5. Press send in WhatsApp.

**Tip:** Sent it to the wrong person? Tap **New link**. The old link stops working at once. Tap **Turn off** to stop a link for good.
**Stuck?** A driver shows here only after you pick them as the **Driver** of a run. If there is no **Send on WhatsApp**, they have no phone saved. Tap **Copy link** and send it yourself.

## How to see your pickups
This part is for drivers. Forward it to your drivers.

1. Open the link the family sent you.
2. Find the day and the time of your run.
3. Read the place and where to meet.
4. Read each guest's name and their flight or train.
5. Open the link again later to see any change.

The page is called **Your pickups**. You see the guest's name and the last digits of their phone.

**Tip:** If a run is late, the page says how many minutes late it is, with the new time.
**Stuck?** If it says "This link doesn't work", ask the family for a new link. Don't forward your link. It is only for you.

## See also
- [[arrivals-and-departures]]
- [[tickets-from-guests]]
- [[stays-and-rooms]]
- [[guest-rsvp-page]]
- [[members]]
- [[vendors]]
- [[event-day]]

## Video scripts

### V-2-pickups-1 · How to plan pickup runs · about 47 s · phone first
Demo login: lane 2, couple (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the Pickups tab with the text "3 arrivals aren't in a run yet." | 6 | Teen flight subah chhe baje ke aas paas aa rahi hain. Ek hi gaadi kaafi hai. | Three flights, one car |
| 1 | Open **Stays & Travel** from **More** | 6 | Stays and Travel kholo. | Open Stays & Travel |
| 2 | Tap the **Pickups** tab | 6 | Pickups tab pe tap karo. | Open Pickups |
| 3 | Set **Time window (minutes)** | 6 | Time window mein minutes likho. | Set the time window |
| 4 | Tap **Suggest runs** | 6 | Suggest runs pe tap karo. | Tap Suggest runs |
| 5 | Show the **Suggested runs** | 7 | Yeh sujhaaye hue runs hain. Abhi kuch save nahi hua. | Nothing is saved yet |
| 6 | Tap **Make these runs** | 6 | Make these runs pe tap karo. | Tap Make these runs |
| end | Show the new run with its guests | 6 | Ho gaya. Ab run mein driver aur gaadi jodo. | The run is ready |

### V-2-pickups-2 · How to add a run by hand · about 48 s · phone first
Demo login: lane 2, couple (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the Pickups tab with "No runs yet." | 6 | Station se haveli tak gaadi kaun legi, yeh tay karna hai. | Who drives to the station? |
| 1 | Open the **Pickups** tab | 6 | Pickups tab kholo. | Open Pickups |
| 2 | Tap **Add a run** | 6 | Add a run pe tap karo. | Tap Add a run |
| 3 | Fill **Arrival place**, **Date** and **Leaves at** | 8 | Kahan se, kis din aur kis time nikalna hai, woh bharo. | Place, date and time |
| 4 | Fill **Vehicle** and **Seats for guests** | 6 | Gaadi aur seats likho. | Vehicle and seats |
| 5 | Choose the **Driver** | 6 | Driver chuno. | Choose the driver |
| 6 | Tap **Save run** | 6 | Save run pe tap karo. | Tap Save run |
| end | Show the new run on its day | 6 | Ho gaya. Run list mein aa gaya. | The run is on the list |

### V-2-pickups-3 · How to move a run that's late · about 40 s · phone first
Demo login: lane 2, couple (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show a run for a flight that is delayed | 6 | Flight chalis minute late hai. Driver ko naya time chahiye. | The flight is late |
| 1 | Open the **Pickups** tab | 7 | Pickups tab kholo. | Open Pickups |
| 2 | Tap **Running late?** on the run | 7 | Running late pe tap karo. | Tap Running late |
| 3 | Type 40 min in **How late** | 7 | How late mein 40 min likho. | Type 40 min |
| 4 | Tap **Move the run** | 7 | Move the run pe tap karo. | Tap Move the run |
| end | Show "Moved. The driver's page shows the new time." | 6 | Ho gaya. Driver ke page pe naya time dikhega. | The new time is saved |

### V-2-pickups-4 · How to send a driver their link · about 45 s · phone first
Demo login: lane 2, couple (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md. The robot stops at WhatsApp opening and never presses send.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show a run whose driver has no link yet | 6 | Driver ko list kaise bhejein. Sab kuch phone pe likhna lamba hai. | The driver needs the list |
| 1 | Open the **Pickups** tab | 6 | Pickups tab kholo. | Open Pickups |
| 2 | Scroll to **Drivers' links** | 6 | Drivers' links tak scroll karo. | Find Drivers' links |
| 3 | Tap **Make a link** | 6 | Make a link pe tap karo. | Tap Make a link |
| 4 | Tap **Send on WhatsApp** | 9 | Send on WhatsApp pe tap karo. | Tap Send on WhatsApp |
| 5 | Show WhatsApp open with the ready message | 7 | WhatsApp khulega. Message taiyaar hai. Bhejna aapko hai. | You press send |
| end | Show the driver's link row with Copy link | 6 | Ho gaya. Driver ke paas apna link hai. | The driver has a link |

### V-2-pickups-5 · How to see your pickups · about 35 s · phone first
Demo login: lane 2, demo driver link made in V-2-pickups-4 (Appendix E). No sign-in is needed.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show a message with the driver link | 6 | Parivaar ne aapko ek link bheja hai. | You got a link |
| 1 | Open the link and show **Your pickups** | 7 | Link kholo. Aapke pickups dikhenge. | Open the link |
| 2 | Point to the day and the run time | 7 | Din aur time dekho. | See the day and time |
| 3 | Point to the place and Meet at | 7 | Jagah aur milne ki jagah dekho. | See where to meet |
| 4 | Point to the guest names and flight | 8 | Guest ka naam aur flight ya train dekho. | See who you pick up |
| end | Show the full page | 6 | Bas, aapke saare pickups ek jagah hain. | All your pickups in one place |
