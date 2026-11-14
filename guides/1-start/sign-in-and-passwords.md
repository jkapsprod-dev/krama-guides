---
tags: [guide]
lane: 1
who: [couple, family, helper, planner, vendor]
status: draft
checked: no
video: script
internal: false
code: [app/(auth)/login/login-form.tsx, app/(auth)/login/page.tsx, app/(auth)/login/forgot/forgot-form.tsx, app/(auth)/login/new-password/new-password-form.tsx, app/(auth)/resend-confirmation.tsx]
---
# Sign in and passwords

**What it is:** Sign in with your email and password, or ask Krama to email you a link.
**Why you'd use it:** You are at the mehndi and need the vendor's number. Your phone has signed you out, and you can't remember the password.

## How to sign in with a password
1. Open the Krama sign-in page.
2. Type your **Email address**.
3. Type your **Password**. Tap **Show password** to check what you typed.
4. Tap **Sign in**.

**Tip:** Let your phone save the password, so you only tap **Sign in** next time.
**Stuck?** "That email and password don't match" means one of them has a typo. Check the email first. If you still can't get in, use **Forgot password?**.

## How to sign in without a password
1. Open the Krama sign-in page.
2. Type your **Email address**. Leave the password empty.
3. Tap **Email me a sign-in link instead**.
4. **Check your email** appears. Open the link in the email. It can take a minute, so look in spam too.
5. You are signed in.

**Tip:** Typed the wrong email? Tap **Use a different email** to start again.
**Stuck?** "That sign-in link has expired or was already used" means the link works only once. Ask for a new one.

## How to reset a forgotten password
1. On the sign-in page, tap **Forgot password?**.
2. Type your **Email address**.
3. Tap **Send reset link**.
4. Open the link in the email.
5. On **Set a new password**, type a **New password**. Use at least 10 characters, with a letter and a number.
6. Tap **Save password**.

**Tip:** Resetting signs out your other devices. That keeps your wedding safe if a phone was lost.
**Stuck?** Krama says the same thing whether or not the email has an account, so nothing tells you either way. Check spam, and check you used the email you signed up with.

## How to get the confirm email again
You see **Confirm your email first** if you sign in before you open the link from sign-up.
1. On **Confirm your email first**, read the note. It says to open the link we emailed you.
2. Look in your inbox and spam for that email.
3. No email? Tap **Send it again**.
4. You see "Sent. Please check your email." Open the new link.
5. Sign in again.

**Tip:** Open the link on the same phone you signed up on. Then Krama keeps the password you chose.
**Stuck?** "Too many attempts" means you tried too often. Wait a few minutes and try again.

## See also
- [[create-an-account]]
- [[your-account]]
- [[join-the-wedding]]

## Video scripts

### V-1-sign-in-and-passwords-1 · How to sign in with a password · about 30 s · phone first
Demo login: lane 1, host Riya Sharma (Appendix E). The robot starts signed out and types the demo email and password. "Voice says" is in Hinglish.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the sign-in page | 5 | Phone ne sign out kar diya? Koi baat nahi. | Signed out? Sign in again |
| 1 | Type the **Email address** | 5 | Apna email daalo. | Type your email |
| 2 | Type the **Password** | 5 | Phir apna password. | Type your password |
| 3 | Tap **Sign in** | 5 | Sign in pe tap karo. | Tap Sign in |
| end | Show **Your weddings** or Home | 6 | Bas, aap andar ho. | You are in |

### V-1-sign-in-and-passwords-2 · How to sign in without a password · about 35 s · phone first
Demo login: lane 1, host Riya Sharma (Appendix E). The robot starts signed out and uses the demo email only. "Voice says" is in Hinglish.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the sign-in page | 5 | Password yaad nahi? Email se link mangao. | No password? Use a link |
| 1 | Type the **Email address** | 4 | Pehle apna email daalo. | Type your email |
| 2 | Tap **Email me a sign-in link instead** | 5 | Email me a sign-in link instead pe tap karo. | Tap Email me a sign-in link |
| 3 | Show **Check your email** | 4 | Check your email dikhega. | Check your email |
| 4 | Open the email and tap the link | 5 | Email mein link pe tap karo. | Tap the link in the email |
| end | Show the signed-in screen | 5 | Ho gaya, sign in ho gaye. | You are signed in |

### V-1-sign-in-and-passwords-3 · How to reset a forgotten password · about 40 s · phone first
Demo login: none. The robot uses a fresh made-up address at example.test, never the demo accounts (Appendix E). "Voice says" is in Hinglish.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show the sign-in page | 4 | Password bhool gaye? Naya bana lo. | Forgot your password? |
| 1 | Tap **Forgot password?** | 4 | Forgot password pe tap karo. | Tap Forgot password |
| 2 | Type the **Email address** | 4 | Apna email daalo. | Type your email |
| 3 | Tap **Send reset link** | 4 | Send reset link dabao. | Tap Send reset link |
| 4 | Open the email and tap the link | 4 | Email ka link kholo. | Open the link in the email |
| 5 | Type a **New password** | 4 | Naya password daalo. | Type a new password |
| 6 | Tap **Save password** | 4 | Save password pe tap karo. | Tap Save password |
| end | Show the signed-in screen | 4 | Ho gaya. Naya password save ho gaya. | Password saved |

### V-1-sign-in-and-passwords-4 · How to get the confirm email again · about 30 s · phone first
Demo login: none. The robot uses a fresh made-up address at example.test that has signed up but not opened the confirm link yet (Appendix E). "Voice says" is in Hinglish.

| # | Robot does | Hold (s) | Voice says | Caption |
|---|---|---|---|---|
| 0 | Show **Confirm your email first** | 5 | Confirm wala email nahi mila? | No confirm email? |
| 1 | Point to the note about the emailed link | 6 | Pehle inbox aur spam dekho. | Check inbox and spam |
| 2 | Tap **Send it again** | 6 | Send it again pe tap karo. | Tap Send it again |
| end | Show "Sent. Please check your email." | 7 | Naya email aa jayega. Uska link kholo. | Open the new link |
