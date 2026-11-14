---
tags: [guide]
lane: 5
who: [admin]
status: draft
checked: no
video: none
internal: true
code: ["app/admin/accounts/page.tsx", "app/admin/accounts/account-search.tsx", "app/admin/accounts/account-view.tsx", "app/admin/accounts/account-forms.tsx", "app/admin/accounts/actions.ts", "app/admin/accounts/[publicId]/page.tsx"]
---
# Accounts

**Time it saves:** A public ID or one exact email takes you straight to the account, with no scrolling through lists.
**What it is:** Look up a wedding or a business, read its record, and make the few changes support is allowed to make. Superadmins and support admins only. Analysts get **Page not found**. Every page you open is written to the admin audit log.
**Why you'd use it:** A host writes in: the wedding is about to go read-only, but the family still needs the photos and guest data. You find the wedding and extend how long it is kept.

## How to find an account
1. Click **Accounts** in the sidebar.
2. Type a public ID or one exact email address in **Public ID or exact email**.
3. Click **Search**.
4. A public ID opens that account at once. An email lists every account that person belongs to, with their role. Click one.
5. Read the page. A wedding shows **Account holder**, **Retention**, **People**, **Usage**, **Support history** and **Actions**. A business shows its details, **Owners**, **Team** and the same two blocks.

**Tip:** Only exact matches work. Search never lists by a part of a name or a part of an email. Names, emails and phone numbers never go in the address bar, because the search is a form post.
**Stuck?** "No account found for that." means the ID or email is not exact. Check for a typo. Support admins see "Your role can look at accounts but not change them." under **Actions**. Only superadmins can change things.

## How to extend retention
Superadmins only. Do this when a host asks for more time.
1. Open the wedding's account. Go to **Actions**, then **Extend retention**.
2. Pick a date in **Keep until**. The hint shows the earliest and latest allowed days.
3. Type a **Reason**. Use 10 to 300 characters. A ticket number is fine.
4. Click **Extend retention**.
5. The page says "Retention extended to" the new date. The host sees this in their Activity log.

**Tip:** The date can only move later. It must be at least 3 days away and never past the latest day the host could choose themselves. A legal hold is never touched.
**Stuck?** If the form is missing, the wedding is under a legal hold or being deleted, or it is already kept as long as allowed. "Something changed while you were looking" means someone else edited it. Reload and try again.

## How to verify a business
Superadmins only.
1. Open the business account. Go to **Actions**, then **Verification**.
2. Type a **Reason**. Use 10 to 300 characters. Write no names, emails or phone numbers.
3. Click **Verify business**.
4. The page shows "Business verified." and the badge shows the date.

**Tip:** To undo it, open the same block and click **Remove verification**. Both changes appear under **Support history**.
**Stuck?** "Take any email address or phone number out of the reason." means the reason looks personal. The log is permanent, so write only a ticket number or a short fact.

## How to allow one more code change
Superadmins only. A code can be changed once for free. After that, only support can unlock it, when the host or business asks.
1. Open the wedding or planner account. Go to **Actions**, then **Code change**.
2. On a wedding, choose **Which code**: **Wedding code** or **Referral code**. A planner account has **Planner code** only.
3. Type a **Reason**.
4. Click **Allow one more change**.

**Tip:** The page says they can change the code once more. It does not change the code for them.
**Stuck?** The block is missing on vendor, venue and hotel accounts. Only weddings and planners have it.

## How to ask a host for support access
You cannot read inside a wedding without the host's yes. See [[admin-support-access]] for the full rules.
1. Open the wedding's account. Scroll to the **Support access** block, then **Ask the host**.
2. Tick the **Sections to see**.
3. Type **Why you need access (the host reads this)**. Add a **Ticket (optional)**.
4. Choose **For how long**.
5. Click **Send request to the host**.
6. The page says "Sent." The host sees it in Settings and gets a notice.

**Tip:** Keep the time short. The host sees every view you make in their Activity log.
**Stuck?** "A request is already waiting or active. End it before asking again." means there is an open request. Open **Support** and use **Withdraw request** or **End now**.

## See also
- [[admin-support-access]]
- [[admin-billing]]
- [[data-and-privacy]]

## Video scripts
None. Admin guides have no videos.
