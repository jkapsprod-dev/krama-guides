---
tags: [guide]
lane: 2
who: [couple, family, planner]
status: draft
checked: no
video: partly made
internal: false
code:
  - "app/w/[workspaceId]/settings/automations/page.tsx"
  - "app/w/[workspaceId]/settings/automations/actions.ts"
  - "app/w/[workspaceId]/guests/to-send/page.tsx"
  - "app/w/[workspaceId]/guests/to-send/actions.ts"
  - "lib/db/automations.ts"
  - "lib/automations/rules.ts"
  - "components/automations/links.tsx"
---
# Automations and To send

**What it is:** Ready rules that do the chasing for you. Every rule is off until a host or a planner switches it on.
**Why you'd use it:** The reply-by date for the Sharma-Patel sangeet has passed. Nobody wants to chase 40 families one by one. You switch on one rule and Krama reminds them, or lines up a message for you to send.

Krama never sends WhatsApp messages by itself. When a family has no email, the message waits in **To send**. You open it, send it from your own WhatsApp, and tap **Mark sent**.

Some rules do send an email by themselves. These are **Reply-by date passed** and **Payment due in 3 days**. The **Function time changed** rule can also email invited families. Rules only run between 8 am and 9 pm in your wedding's timezone.

## How to switch on an automation
Only a host or a planner can do this.

1. Tap **More**.
2. Tap **Settings**.
3. Tap **Automations**.
4. Find the rule you want, such as **Reply-by date passed**.
5. Tap **Switch on**.
6. Check that the tag now says **On**.

The four rules are **Reply-by date passed**, **Payment due in 3 days**, **Room allocated** and **Function time changed**. You can switch each one on or off by itself. Under each rule you can see when it last ran.

**Tip:** Set a reply-by date first. **Reply-by date passed** needs it. See [[invitations-and-reminders]].
**Stuck?** If the rules show no button, the wedding is frozen or on hold. Ask a host.

## How to send what's waiting
1. Open **Guests**.
2. Tap **More**, then **To send**.
3. Tap **Preview message** on a family to read it.
4. Tap **Send on WhatsApp**. For email, tap **Send by email**.
5. Press send in your own app.
6. Come back and tap **Mark sent**.

Tap **Dismiss** if you do not want to send that message at all.

**Tip:** Do a few every day. Krama shows the oldest 50 first. Once you mark some as sent, the next ones show up.
**Stuck?** If the page says **Nothing to send.**, all is done. A message only waits here after you switch on a rule that prepares one.

## How to pause all of them
1. Tap **More**.
2. Tap **Settings**, then **Automations**.
3. Tap **Stop all automations**.

The tag at the top changes from **Running** to **Stopped**. Emails that were waiting are dropped. Each rule keeps its own switch. To start again, tap **Resume automations**.

**Tip:** Pause everything while you fix a wrong date. Then resume.
**Stuck?** Stopping does not clear **To send**. Those messages stay until you send or dismiss them.

## See also
- [[invitations-and-reminders]]
- [[personal-messages]]
- [[stays-and-rooms]]
- [[guest-list]]
- [[functions]]
- [[members]]
- [[money-due]]
- [[notifications]]

## Video scripts

### V-2-automations-and-to-send-1 · How to switch on an automation · about 46 s · phone first
Demo login: lane 2, couple (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the Guests page with many families waiting | 6 | Roz roz yaad dilana thaka deta hai. | Chasing every family is tiring |
| 1 | Tap **More** | 5 | More pe tap karo. | Tap More |
| 2 | Tap **Settings** | 8 | Settings kholo. | Open Settings |
| 3 | Tap **Automations** | 12 | Automations pe tap karo. | Tap Automations |
| 4 | Scroll to **Reply-by date passed** | 14 | Reply-by date passed wala rule dhundo. | Find the rule |
| 5 | Tap **Switch on** | 6 | Switch on dabao. | Tap Switch on |
| end | Show the **On** tag on the rule | 6 | Ab yeh rule chalu hai. | The rule is on |

### V-2-automations-and-to-send-2 · How to send what's waiting · about 50 s · phone first
Demo login: lane 2, couple (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the **To send** page with messages waiting | 5 | Kuch messages aapke bhejne ke liye ready hain. | Messages are waiting |
| 1 | Open **Guests** | 4 | Guests kholo. | Open Guests |
| 2 | Tap **More**, then **To send** | 5 | More pe tap karo, phir To send. | Open To send |
| 3 | Tap **Preview message** on the first family | 5 | Preview message dabake padh lo. | Read the message |
| 4 | Tap **Send on WhatsApp** | 5 | Send on WhatsApp dabao. Phir aap khud send dabao. | You press send |
| 5 | Return to Krama and tap **Mark sent** | 5 | Wapas aao aur Mark sent dabao. | Tap Mark sent |
| end | Show the next family on top | 4 | Ab agla message. | On to the next one |

### V-2-automations-and-to-send-3 · How to pause all of them · about 64 s · phone first
Demo login: lane 2, couple (Appendix E). "Voice says" is in the voiceover language from DECISIONS.md.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the Automations page with the tag **Running** | 7 | Kabhi kabhi sab kuch ek saath rokna padta hai. | Sometimes you need a pause |
| 1 | Tap **More** | 5 | More pe tap karo. | Tap More |
| 2 | Tap **Settings** | 15 | Settings kholo. | Open Settings |
| 3 | Tap **Automations** | 21 | Automations pe tap karo. | Tap Automations |
| 4 | Tap **Stop all automations** | 9 | Stop all automations dabao. | Tap Stop all automations |
| end | Show the tag **Stopped** and the **Resume automations** button | 12 | Sab ruk gaya. Resume automations se phir chalu karo. | Everything is paused |
