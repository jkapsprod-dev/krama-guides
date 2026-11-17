---
tags: [guide]
lane: 3
who: [couple, family, helper, planner]
status: final
checked: 2026-11-17
video: made
internal: false
code: [components/helpers/heads-up.tsx, lib/helpers/heads-up.ts, lib/helpers/weather.ts, lib/helpers/festivals.ts, lib/helpers/data/holidays-in.ts, app/w/[workspaceId]/events/event-form.tsx]
---
# Heads-up

**What it is:** A card on Home and on a function's page that warns you about rain, heat or wind, and about festivals and long weekends that fall on your function dates.
**Why you'd use it:** Your mehndi is on an open lawn. A week before, Krama tells you heavy rain is coming, so you can book a covered backup.

**Who can see this:** Everyone in the wedding sees the card. It has no money and no guest details.

**What Heads-up covers, honestly:**
- Weather alerts need two things. The function must be marked **Open-air function**, and it needs a city. The forecast only reaches about nine days ahead.
- Festival and long-weekend warnings use a holiday list inside Krama. The list covers 2026 only. It is not a panchang. It does not know tithis or auspicious dates.
- If a function is in a later year, Krama says those dates are not checked yet.
- The card stays hidden when there is nothing to say.

## How to get weather alerts for an open-air function
1. Open **Functions**, then tap the function, for example the mehndi.
2. Tap **Edit details**.
3. Tick **Open-air function**.
4. Under **City for the forecast**, choose the nearest city from the list.
5. Tap **Save**.

**Tip:** Set a date and a start time on the function too. Without a date, there is nothing to check.
**Stuck?** No alert shows? That can be good news. Alerts show only for rain, heat or strong wind in the next nine days, and only when a city is chosen. A function further away is checked once it comes closer.

## How to read a festival or long-weekend warning
1. Open **Home**. Look for the **Heads-up** card.
2. Read each line. It names the function, the date and the festival or long weekend.
3. A weather line says what to do, such as keeping a covered area ready.
4. Tap **Open function** beside a line to go to that function.
5. Talk to your family about the date. Krama only warns you. It never changes a date.

**Tip:** A function's own page shows the same card at the top, only for that function.
**Stuck?** You see **Festival and long-weekend warnings cover 2026 for now. Functions in later years are not checked yet.** Your function is in a later year, so Krama did not check it. To turn Heads-up off, see [[smart-helpers]].

## See also
- [[smart-helpers]]
- [[gold-today]]
- [[functions]]
- [[home]]

## Video scripts

### V-3-heads-up-1 · How to get weather alerts for an open-air function · about 53 s · phone first
Demo login: lane 3, host (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **Functions** list | 4.0 | Mehndi lawn mein hai. Baarish ho gayi to? | Mehndi is on an open lawn |
| 1 | Tap **Open Mehendi** | 3.0 | Mehndi pe tap karo. | Open the function |
| 2 | Tap **Edit details** | 8.4 | Edit details pe tap karo. | Tap Edit details |
| 3 | Tick **Open-air function** | 11.3 | Open-air function ko tick karo. | Tick Open-air function |
| 4 | Choose Ahmedabad under **City for the forecast** | 4.0 | City for the forecast mein Ahmedabad chuno. | Choose the city |
| 5 | Tap **Save** | 12.9 | Save pe tap karo. | Tap Save |
| end | Show the function page | 3.5 | Ab mausam ka khatra ho to Krama pehle bata dega. | Krama warns you early |

### V-3-heads-up-2 · How to read a festival or long-weekend warning · about 32 s · phone first
Demo login: lane 3, host (Appendix E). A demo function date is set next to a 2026 holiday so the card shows. "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show Home | 4.0 | Shaadi ki date ke paas koi tyohaar to nahi? | Any festival near your date? |
| 1 | Scroll to the **Heads-up** card | 4.0 | Home par Heads-up card dekho. | Find the Heads-up card |
| 2 | Point at one festival line | 5.1 | Yahan likha hai kaunsa function, kaunsi date, aur kaunsa tyohaar. | Function, date and festival |
| 3 | Tap **Open function** | 3.0 | Open function pe tap karo. | Tap Open function |
| 4 | Show the same card on the function page | 5.2 | Function ke page par bhi yahi card milta hai. | The card is here too |
| end | Show the function page | 3.8 | Ab family se date par baat kar lo. | Now talk to your family |
