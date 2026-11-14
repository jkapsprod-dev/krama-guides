---
tags: [guides, app-fixes]
made: 2026-11-14 (3A)
app: krama-celeb main @ 4fb01ef6
---
# App fixes from the guides · [[STATUS]] · [[DECISIONS]]

Things the writing lanes found in the live app that Jay wants fixed (3A, 14 Nov 2026). They change words or behaviour, so they are **not** for 6B (6B only adds selectors with no visual change). They need their own 🔵 app session in `mandapos`, like 1B.

The guides describe the app **as it is today**. When a fix lands, update the notes listed under "Guides to update".

## 1. Old brand name "Krama Celebrations"

The brand is Krama Events. Families see the old name in these places (all in `app\`):

| Where people see it | Where in the code |
|---|---|
| Members invite on WhatsApp and email | `messages\en.json`: `Members.whatsAppMessage`, `Members.emailSubject`, `Members.whatsAppJoinMessage` |
| Wrap-up "wedding in numbers" card (posted to the family feed) | `messages\en.json`: `Wrapup.numbers.cardFoot` |
| Guest photo upload page | `app\up\[token]\page.tsx` (its `Wordmark` uses the `brand` string) |
| App name and wordmark | `messages\en.json`: `App.name` and the `brand` string; `components\wordmark.tsx` |
| Calendar files, the data export, PDF and Excel reports | `lib\calendar-export\ics.ts`, `lib\lifecycle\export-archive.ts`, `lib\reports\render-pdf.ts`, `lib\reports\render-xlsx.ts` |
| Privacy notice and security page intros | `messages\en.json` (the two `intro` strings that name the company) |

Check with Jay first whether "Krama Celebrations" is the legal company name in the privacy notice. If it is, keep it there and change the rest. Change every language, not only English.

## 2. Wording

| Screen | Now | Fix | Where |
|---|---|---|---|
| Proposal accepted (planner) | "Your wedding workspace is ready…" | Say "wedding", never "workspace" | `Proposal.donePlanner` |
| Commission earnings (planned) | "Krama pays it out…" | Krama never moves money. Reword before payouts open | `Codes.earnings.note` |
| Codes & planner, Referral code | "…it starts working when the assistant launches" | The assistant is live in the pilot. Match today's app | `Codes.referral.reward.unlocked` |
| Business (+) sheet title | "Add to your wedding" | A business title, like "Add to your business" | `Nav.quickAddTitle` (used on both sides) |

## 3. Hide what can't work yet

| What | Why | Where |
|---|---|---|
| **Alerts** in Home's **Add widget** list | It only says "Coming soon" | `lib\home\widgets.ts` |
| **WhatsApp invites and reminders** row on **Plan & add-ons** (shows **On** in the pilot) | Krama doesn't send WhatsApp messages by itself; the WhatsApp API isn't built | `app\w\[workspaceId]\settings\plan\page.tsx`, `lib\billing\skus.ts` (`ADDONS`) |
| **Ask for a wedding** for vendors on the business **Weddings** page | Nobody can approve a vendor's request: **Codes & planner** lists planners only | `app\business\[orgId]\weddings\page.tsx` |

## 4. A lasting link to the function recap

The recap (`app\w\[workspaceId]\events\[eventId]\recap`) opens only from the **See how it went** moment card. The card shows once, within about 7 days after the function, and goes after **Got it**. Add a **See how it went** link on a finished function's page. Code: `lib\moments\kinds.ts` (`momentNextHref`).

## 5. Bugs (the code is wrong, Jay 14 Nov)

| What | Now | Should be | Where |
|---|---|---|---|
| Helpers and **Vendors** | Helpers get "page not found" on **Money**, **Vendors** (every vendor page calls `requireMoney`) | Helpers can see vendor names and phones, never amounts (as `app\docs` and the help article say) | `app\w\[workspaceId]\money\vendors\`, `app\w\[workspaceId]\money\load.ts` |
| **Notifications** menu item | Hosts and planners have none; they reach it only through the bell, then **See all notifications** | A **Notifications** item for every role | `lib\nav\model.ts` |

**Not bugs (the code is right):** viewers may react, report and add photos on the family feed and gallery; the Money page is titled **Budget**.

## Guides to update when these land

| Fix | Notes |
|---|---|
| 1 | none quote the brand; check [[wrap-up]] and [[upload-qr]] screenshots |
| 2 | [[referral-code]], [[commission-earnings]], [[getting-around-the-portal]] |
| 3 | [[home]], [[plan-and-add-ons]], [[weddings]] |
| 4 | [[function-recap]] (add "How to open the recap later") |
| 5 | [[vendors]], [[notifications]], [[emergency-card]] (helpers), and the `who` line of [[vendors]] |

## Prompt for the app session

Paste into a 🔵 app session (folder `mandapos`, Worktree on, Sonnet):

```
/start-task guide-app-fixes
Read C:\Users\jayka\code\krama-guides\guides\_app-fixes.md (read only; don't change anything in krama-guides). Show me a short plan first, and ask me about the legal company name before changing the privacy notice. Make fixes 1 to 5 in every language. pnpm check and e2e green, open a PR, merge when green, then /wrap-up.
```
