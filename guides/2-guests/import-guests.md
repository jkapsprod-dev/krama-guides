---
tags: [guide]
lane: 2
who: [couple, family, planner]
status: final
checked: 2026-11-15
video: made
internal: false
code: ["app/w/[workspaceId]/guests/import/page.tsx", "app/w/[workspaceId]/guests/import/import-flow.tsx", "app/w/[workspaceId]/guests/import/actions.ts", "app/w/[workspaceId]/guests/guests-more.tsx", "lib/guests/csv.ts", "lib/guests/import.ts"]
---
# Import guests

**What it is:** Bring your whole guest list in at once from an Excel or Google Sheets file, or from your phone's contacts. You can add up to 2,000 guests at a time.
**Why you'd use it:** Your father has kept a list of 300 names in Excel for months. You upload it once instead of typing every name.

## How to import guests from a CSV file
1. Save your list as a CSV file. Put column names in the first row.
2. Open **Guests**.
3. Tap **More**, then tap **Import contacts**.
4. Under **CSV file**, choose your file.
5. Under **Match your columns**, check each column. Pick **Don't import** for any you do not want.
6. Tap **Review**.

**Tip:** Only the **Name** column is needed. The others are **Phone**, **Email**, **Side**, **Relation**, **City**, **Family**, **Meal**, **Tags** and **Notes**. Guests with the same **Family** are put in one family.
**Stuck?** **Choose which column holds the name.** means no column is set to **Name**. Pick one, then tap **Review** again. A file with more than 2,000 guests must be split in two.

## How to check duplicates and finish the import
1. Look at **Possible duplicates**. These guests are left out unless you tick them.
2. Look at **Put these together?**. Tick the people who are one family.
3. Under **Invite everyone to**, pick a function.
4. Tap the big button that starts with Import, like Import 120 guests.
5. Tap **View guests** to see your list.

**Tip:** A phone number Krama can't read is left blank. You can fix it later with **Edit**.
**Stuck?** Nobody shows up to send links to? You left **Invite everyone to** empty. Open **Guests**, tick everyone and invite them. See [[guest-list]].

## How to import from your phone's contacts
1. Open **Guests** on your Android phone.
2. Tap **More**, then tap **Import contacts**.
3. Tap **From your phone's contacts**.
4. Tick the people you want, then confirm on your phone.
5. Tap **Review**, then finish as in the steps above.

**Tip:** You choose the contacts. Krama sees only the ones you tick.
**Stuck?** You can't see **From your phone's contacts**? Your phone or browser does not allow it. This works on some Android phones only. Use a CSV file instead.

## See also
- [[guest-list]]
- [[add-a-guest]]
- [[send-rsvp-links]]
- [[invitations-and-reminders]]

## Video scripts

### V-2-import-guests-1 · How to import guests from a CSV file · about 44 s · phone first
Demo login: lane 2, couple (Appendix E). Off camera, put a small made-up file called sharma-list.csv on the phone, with columns Name, Phone and City. "Voice says" is in Hinglish.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show **Home** | 5 | Excel mein poori list hai? Ek baar mein jodo. | Got a list in Excel? |
| 1 | Tap **Guests** in the bottom bar | 6 | Guests kholo. | Open Guests |
| 2 | Tap **More** | 5 | More pe tap karo. | Tap More |
| 3 | Tap **Import contacts** | 5 | Import contacts pe tap karo. | Tap Import contacts |
| 4 | Choose the file under **CSV file** | 7 | Apni CSV file chuno. | Choose your file |
| 5 | Show **Match your columns** | 7 | Columns theek se milaao. | Check the columns |
| 6 | Tap **Review** | 6 | Review pe tap karo. | Tap Review |
| end | Show the review list | 5 | Ab list jaanch lo. | Time to check the list |

### V-2-import-guests-2 · How to check duplicates and finish the import · about 44 s · phone first
Demo login: lane 2, couple (Appendix E). Continue from the review screen of the file in video 1, which has one repeated guest and two guests who share a surname and a city. "Voice says" is in Hinglish.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the review screen | 5 | Kya koi naam do baar aa gaya? | Any repeated names? |
| 1 | Show **Possible duplicates** | 8 | Possible duplicates ko dhyan se dekho. | Check Possible duplicates |
| 2 | Tick the family in **Put these together?** | 8 | Ek parivaar ho to unhe saath tick karo. | Tick families |
| 3 | Pick **Haldi** under **Invite everyone to** | 7 | Function chuno. | Pick a function |
| 4 | Tap the button Import 4 guests | 6 | Import pe tap karo. | Tap Import |
| 5 | Tap **View guests** | 7 | View guests pe tap karo. | Tap View guests |
| end | Show the full list | 5 | Poori list jud gayi. | Your list is in |

### V-2-import-guests-3 · How to import from your phone's contacts · about 48 s · phone first
Demo login: lane 2, couple (Appendix E). Use an Android phone with three made-up contacts. "Voice says" is in Hinglish.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show **Home** | 5 | Mehmaan aapke phone mein hi hain? | Guests are in your phone |
| 1 | Tap **More**, then **Import contacts** on **Guests** | 12 | More kholo, phir Import contacts. | Open Import contacts |
| 2 | Tap **From your phone's contacts** | 8 | From your phone's contacts pe tap karo. | Tap From your phone's contacts |
| 3 | Pick three contacts on the phone | 9 | Jin logon ko jodna hai unhe chuno. | Pick the contacts |
| 4 | Show the review list | 8 | Review pe tap karo. | Tap Review |
| end | Show the review list | 5 | Ab list jaanch lo. | Time to check the list |
