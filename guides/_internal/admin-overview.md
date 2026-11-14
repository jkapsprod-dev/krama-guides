---
tags: [guide]
lane: 5
who: [admin]
status: draft
checked: no
video: none
internal: true
code: ["app/admin/page.tsx", "app/admin/needs-you-list.tsx", "app/admin/admin-shell.tsx"]
---
# Overview

**Time it saves:** One page shows what is wrong right now, so you skip checking Supabase, Vercel and GitHub one by one.
**What it is:** The first page of the admin console. It opens on **Needs you**, the list of alerts and warnings, then shows six counts. Superadmins only.
**Why you'd use it:** It is the morning of a big muhurat weekend. You want to know in one look whether anything is broken before families start messaging.

## How to work through Needs you
1. Sign in. **Overview** opens.
2. Read the heading, for example "1 alert, 2 warnings need you". Alerts come first, then warnings.
3. Click the first row. It takes you to the section and panel that holds the problem.
4. Fix it there. The row shows its place, such as "Operations › Health".
5. Go back to **Overview**. The row is gone once the problem is fixed.
6. Repeat until the page says "Nothing needs you right now."

**Tip:** Overview shows a line when a kill switch is on, for example "New weddings and businesses are paused." Check it after any switch change.
**Stuck?** A source Krama cannot reach, such as GitHub, shows on **Operations › Health**. It is not an alert here. Analysts and support admins get **Page not found** on Overview. That is by design.

## How to read the counts
1. Open **Overview**.
2. **Weddings live** counts active weddings and those with a warning sent. The line under it gives frozen, on hold and being deleted.
3. **Functions today** counts today's functions, India time. The line gives the next 7 days.
4. **New sign-ups** covers the last 7 days.
5. **Paying weddings** counts weddings with the base plan paid. Pilot weddings do not count.
6. **Revenue this month** is net of GST and before refunds. **Support access** shows grants active now and how many wait for a host.

**Tip:** A real zero shows as 0. Nothing on this page is a made-up number.
**Stuck?** If a figure looks wrong, the nightly roll-up may not have run. Check **Scheduled jobs** on **Operations**.

## What Needs you can show
Alerts:
- The admin audit log failed its integrity check.
- A job keeps failing.
- Files were left behind by deleted weddings.
- The scheduler has not run for over 45 minutes, so nothing is warned, frozen or deleted.
- Migrations wait to be applied.
- CI on main is failing.
- The latest production deploy failed.
- Supabase's own checks show a security error.
- A payment alert is open, or the daily check against Razorpay is failing.
- A wedding had more than 10 exports in a day.
- A break-glass access is still not reviewed 7 days after it ended.

Warnings:
- A scheduled job's last run failed.
- Queued jobs are more than 30 minutes overdue.
- Planner payouts are due for approval.
- A referrer has 3 or more referrals in 30 days.
- Sign-in lockouts reached 5 or more in a day.
- A wedding reached the guest list limit, or a business opened a wedding long after its last function.
- A break-glass access needs a review by another superadmin.

## See also
- [[admin-operations]]
- [[admin-billing]]
- [[admin-support-access]]

## Video scripts
None. Admin guides have no videos.
