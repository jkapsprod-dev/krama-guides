---
tags: [guide]
lane: 5
who: [admin]
status: draft
checked: no
video: none
internal: true
code: ["app/admin/operations/page.tsx", "app/admin/operations/panels.tsx", "app/admin/operations/switch-forms.tsx", "app/admin/operations/helper-switches.tsx", "app/admin/operations/security-panel.tsx", "app/admin/operations/actions.ts"]
---
# Operations and kill switches

**Time it saves:** Jobs, health and every switch sit on one page, so you do not open Supabase or Vercel to check.
**What it is:** What the platform is doing right now, as counts and public IDs only. The page ends with the kill switches. Superadmins only.
**Why you'd use it:** On a Saturday night, weather alerts are going out wrong during a big sangeet weekend. You switch that one helper off for every wedding in one click.

## How to check health and jobs
1. Click **Operations** in the sidebar. On a phone the tab is **Health**.
2. Read **Weddings and deletion**. It counts weddings by state: **Active**, **Warning sent**, **Frozen**, **Legal hold**, **Being deleted**. **Jobs that keep failing** names each failing job.
3. Read **Scheduled jobs**. The **Queue** line shows waiting, running, gave up and overdue. Each scheduled job shows its last run and its status.
4. Read **Health**: **Database**, **Admin audit log**, **CI on main**, **Production deploys**, **Migrations**.
5. Skim **Storage**, **AI** and **Security**. **Security** covers the last 24 hours.

**Tip:** Most alerts on **Overview** link straight to the panel here that holds the problem.
**Stuck?** "Not connected" or "Could not reach" on **Health** means that outside source is not set up or did not answer. It does not mean the platform is down. Reload to try again.

## How to use a kill switch
Switches change on a computer only. On a phone, **Operations** says so.
1. Open **Operations**. Scroll to **Kill switches**.
2. Find the switch you need (the list below).
3. Type a **Reason (kept in the audit log)**. Use 3 to 280 characters. Leave out names, emails and phone numbers.
4. Click the switch's button.
5. Check the state line above the button. Also check **Overview**, which warns while a switch is on.

The four switches:
- **Smart helpers**: Weather alerts, Festival and long-weekend clashes, Gold price per gram, Snap a bill. Each has its own **Switch off** button, and **Switch on** when it is off. Off hides that helper for every wedding and business at once. Each wedding can also switch helpers off itself.
- **Free during the pilot**: While on, every wedding has the base plan and every add-on free, and nothing can be bought. **End the pilot** keeps the base plan free for good for weddings that exist now. New weddings get the trial. **Start the pilot again** turns it back on.
- **New weddings and businesses**: **Pause** stops anyone creating a wedding or a business. Existing members, invitations, RSVPs and the scheduler carry on. **Resume** opens it again.
- **Maintenance banner**: One line above every page, for everyone, signed in or not. Type the **Banner text** (up to 280 characters), then click **Show banner**. Click **Clear banner** to remove it.

There is also an **AI** switch under **Every call to the AI**. It stops typed questions, voice and meeting minutes for everyone within about 30 seconds.

**Tip:** Every change is written to the audit log with the switch name and your reason. The banner text itself is not logged.
**Stuck?** "Give a reason of 3 to 280 characters." means the reason is too short or too long. "Leave names, emails and phone numbers out of the reason" means the reason looks personal. Rewrite it. If you get **Page not found**, you are not a superadmin.

## See also
- [[admin-overview]]
- [[admin-billing]]
- [[admin-accounts]]

## Video scripts
None. Admin guides have no videos.
