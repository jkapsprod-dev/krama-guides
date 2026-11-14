---
tags: [guide]
lane: 5
who: [admin]
status: draft
checked: no
video: none
internal: true
code: ["app/admin/sign-in/page.tsx", "app/admin/enroll/page.tsx", "app/admin/passkey-button.tsx", "app/admin/not-found.tsx"]
---
# Admin sign-in

**Time it saves:** One tap on your device, with no email to wait for and no password to reset.
**What it is:** The locked door of the Krama admin console at admin.krama.events. You sign in with a passkey and nothing else. There is no email box, no sign-in link and no password.
**Why you'd use it:** A host rings at 9 pm to say a wedding is stuck. You open your computer, click once, and you are in.

## How to sign in
1. Open admin.krama.events. The page is called **Admin sign-in**.
2. Click **Sign in with passkey**.
3. Approve the prompt on your device. The button reads "Waiting for your passkey" while it waits.
4. The console opens. Superadmins land on **Overview**.
5. When you are done, click **Sign out**.

**Tip:** A session lasts up to 12 hours. It also ends after 30 minutes with no activity. Sign in again when that happens.
**Stuck?** If a message says it didn't work, use the device that holds your admin passkey. An emailed link or a Google sign-in never opens the console for an admin. If you see **Page not found**, your session ended or you are not an active admin. Click **Admin sign-in** and try again.

## How to set up your passkey
Do this once per device, or after you lose a passkey. You need a one-time link from a superadmin.
1. Open the one-time link. The page is called **Set up your passkey**.
2. Click **Create passkey**.
3. Approve the prompt on your device. The button reads "Waiting for your device" while it waits.
4. Krama signs you out and takes you to **Admin sign-in**.
5. Click **Sign in with passkey** to check that it works.

**Tip:** The link opens a 15-minute window. Make the passkey in that time.
**Stuck?** If the link has run out, ask a superadmin for a new one. A passkey on its own opens nothing. You also need an active admin record.

## See also
- [[admin-overview]]
- [[admin-support-access]]

## Video scripts
None. Admin guides have no videos.
