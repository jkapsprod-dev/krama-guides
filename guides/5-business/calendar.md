---
tags: [guide]
lane: 5
who: [planner, vendor]
status: final
checked: 2026-11-16
video: made
internal: false
code: ["app/business/[orgId]/calendar/page.tsx", "app/business/[orgId]/calendar/calendar-forms.tsx", "app/business/[orgId]/calendar/actions.ts", "lib/nav/business.ts"]
---
# Calendar

**Time it saves:** Your bookings, wedding functions, site visits, leave and crew shifts sit on one calendar, so you do not check three diaries before you say yes.
**What it is:** One month calendar for your business, with warnings when two things clash.
**Why you'd use it:** A client rings at 9 pm and asks if you are free on the Sangeet day, and you can answer without opening your diary.

## How to block time on your calendar
Anyone on the team can do this.

1. Open **Calendar**. Click the day you want in the month grid.
2. Click **Add to calendar**.
3. Pick **What is it?**: **Site visit**, **Trial or tasting**, **Meeting**, **Leave**, **Blocked date** or **Other**. Type a **Title**.
4. Check **From**. It starts on today, so change it to the day you want. For more than one day, fill **To (optional)**. Untick **All day** to set a start and end time.
5. Click **Save**. The entry shows on that day.

To take something off, click **Remove** next to it on the day. Click **Remove** again to confirm.

**Tip:** Use **Blocked date** for days you take no work, such as a family wedding. The calendar then warns you if a job lands on that day.
**Stuck?** If it says "The end must be after the start.", check **From** and **To (optional)**, or the start and end times.

## How to spot double bookings
1. Open **Calendar**. Use the month arrows to go to the right month.
2. Look for a small red dot in the corner of a day.
3. Click that day. The panel on the day shows the red lines.
4. Read each line. It tells you what clashes.

The red lines can say:
- "Double-booked": one crew person has two shifts at the same time.
- "Different venues in one day": one crew person is at two places.
- "More jobs than you take": the day is over your limit.
- "Work on a blocked day": a job falls on leave or a blocked date.

The day panel also shows **Free**, **Full** or "Blocked", with how many crew are free and busy.

**Tip:** The colours of the dots tell you what is on the day: **Booking**, **Wedding function**, **Visit or leave** and **Crew shift**. Warnings never stop you. You decide what to move.
**Stuck?** If a day you expect looks empty, you may be on the wrong month. It says "Nothing on this day." when there is nothing.

## How to set the most jobs you take in a day
Owners and admins only.

1. Open **Calendar**.
2. Scroll to **Most jobs you take on one day**.
3. Type a number from 0 to 50.
4. Click **Save**. You see "Saved."

**Tip:** Each day square shows the jobs for that day, like 2/3. If a day goes over your number, the calendar warns you. Type 0 for no limit.
**Stuck?** If it says "Enter a number from 0 to 50.", use a whole number in that range.

## See also
- [[crew-and-shifts]]
- [[bookings]]
- [[weddings]]
- [[functions]]

## Video scripts

### V-5-calendar-1 · How to block time on your calendar · 46 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md).

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show business Home | 5 | "Site visit ya chutti ki date yaad kaise rakhein?" | Keep visits and leave in one place |
| 1 | Click **Calendar** in the sidebar, then click a day | 7 | "Calendar kholo aur ek din chuno." | Open Calendar, pick a day |
| 2 | Click **Add to calendar** | 4 | "Add to calendar pe click karo." | Click Add to calendar |
| 3 | Pick **Site visit** in **What is it?** and type "Venue visit, Ahmedabad" in **Title** | 8 | "Kya hai woh chuno aur title likho." | Pick the type, add a title |
| 4 | Untick **All day** and set the start and end time | 8 | "Time chahiye toh All day hata do aur time daalo." | Set the time |
| 5 | Click **Save** | 4 | "Save pe click karo." | Click Save |
| end | Show the entry on that day | 4 | "Ho gaya. Ab woh din calendar mein hai." | Done |

### V-5-calendar-2 · How to spot double bookings, then set the most jobs you take in a day · 51 s · desktop first
Demo login: lane 5, planner (Neha Desai, Utsav Planners). "Voice says" is in Hinglish (DECISIONS.md). Start with a **Blocked date** saved on the Sangeet day of the Sharma-Patel wedding.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show **Calendar** with a red dot on one day | 5 | "Kya koi din double book ho gaya?" | Is any day double booked? |
| 1 | Point to the red dot on the Sangeet day | 4 | "Laal dot ka matlab hai warning." | Red dot means a warning |
| 2 | Click that day | 4 | "Us din pe click karo." | Click the day |
| 3 | Point to the red line in the day panel | 5 | "Yahan likha hai kya clash hua." | Read the warning |
| 4 | Point to the dots and **Wedding function** in the list | 5 | "Neeche din ka poora schedule dikhta hai." | See what is on the day |
| 5 | Hold on the day panel | 4.2 | "Ho gaya. Ab aap decide kar sakte ho kya hilana hai." | Now you can fix it |
| 6 | Scroll to **Most jobs you take on one day** | 5 | "Most jobs you take on one day tak scroll karo." | Find the limit box |
| 7 | Type 2 in the box | 4 | "Apni limit likho, jaise do." | Type your limit |
| 8 | Click **Save** | 4 | "Save pe click karo." | Click Save |
| end | Show "Saved." and the jobs shown on the day squares | 5 | "Ho gaya. Limit se zyada job aayi toh warning milegi." | Done |
