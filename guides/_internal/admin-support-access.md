---
tags: [guide]
lane: 5
who: [admin]
status: draft
checked: no
video: none
internal: true
code: ["app/admin/support/page.tsx", "app/admin/support/grant-list.tsx", "app/admin/support/support-forms.tsx", "app/admin/support/support-section.tsx", "app/admin/support/actions.ts", "app/admin/accounts/[publicId]/grants/[grantId]/page.tsx"]
---
# Support access

**Time it saves:** Every request, grant and review is on one page, so nothing waits in a chat thread.
**What it is:** The only way Krama staff look inside a wedding. A host has to say yes in the app. Access is read-only, ends on time, and every view is in the admin audit log and in the host's Activity log. Without a grant, no wedding data is shown to anyone on staff. Superadmins and support admins use it.
**Why you'd use it:** A host says the run sheet will not load two days before the haldi. You ask for access to **Run sheet** only. The host allows it, you look, and you end it.

## How to see and end support access
1. Click **Support** in the sidebar.
2. Read the list, newest first. Each row shows the wedding's public ID, a status and the sections.
3. The statuses are **Waiting for the host**, **Active**, **Declined**, **Ended** and **Expired**. Break-glass rows carry a red **Break-glass** tag.
4. To stop an **Active** access, click **End now**.
5. To cancel your own request that is still **Waiting for the host**, click **Withdraw request**.

**Tip:** Access ends by itself at its end time. End it early as soon as you have what you need. The host can also end it from their own screen.
**Stuck?** "This has already been answered or ended." means the host acted first. Reload the page.

## How to read a wedding's sections under a grant
1. Open **Support**. Find your **Active** access.
2. Click a section name, for example **Guests** or **Money**. Only the admin who asked sees these links.
3. Read the tables. The page says it is read-only and when it ends.
4. Click **Back to the account** when done.

**Tip:** Each time a section loads, it is logged for you and for the host. Open only what you need.
**Stuck?** "This access isn't active any more, so nothing can be shown." means it ended or ran out. Ask the host again from the wedding's account.

## How to ask for break-glass and approve it
Superadmins only. Use it only for a security incident or a legal order when no host can be reached. It needs two different superadmins. It lasts at most 4 hours. The host is told when it ends.
1. Open the wedding's account. Scroll to **Break-glass**.
2. Tick the sections. Type **Why break-glass is needed**. Choose **For how long**.
3. Click **Ask for break-glass**. The page says another superadmin has to approve it.
4. The second superadmin opens **Support**, finds the request and clicks **Approve break-glass**.
5. After approval, you can open the sections as in the task above.

**Tip:** You cannot approve your own request.
**Stuck?** With one superadmin, the **Break-glass** block says it cannot be used. Another superadmin must be added first. "A different superadmin has to do this." means you tried to approve your own request.

## How to mark break-glass as reviewed
Superadmins only. A different superadmin than the one who asked must review each break-glass after it ends.
1. Click **Support**. Find the break-glass row that has ended.
2. Type your **Review note** in the box under it.
3. Click **Mark as reviewed**.
4. The row now shows the review time and your note.

**Tip:** **Needs you** on **Overview** warns until the review is done. It becomes an alert after 7 days.
**Stuck?** "Another superadmin has to review this." means you asked for it. Ask the other superadmin to do the review.

## See also
- [[admin-accounts]]
- [[admin-overview]]
- [[members]]
- [[data-and-privacy]]

## Video scripts
None. Admin guides have no videos.
