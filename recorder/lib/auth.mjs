// Signs each demo role in once and keeps the session (Playwright storageState), so videos never
// type a password and the five lanes stay well under the app's sign-in limit (30 per 15 minutes).
import fs from "node:fs";
import path from "node:path";

import { APP_URL, CACHE } from "./paths.mjs";
import { login } from "./seed.mjs";

const stateFile = (lane, role) => path.join(CACHE, "auth", `lane${lane}-${role}.json`);

async function stillSignedIn(browser, file) {
  const ctx = await browser.newContext({ baseURL: APP_URL, storageState: file });
  try {
    const page = await ctx.newPage();
    await page.goto("/w");
    return !/\/(login|auth)\b/.test(new URL(page.url()).pathname);
  } finally {
    await ctx.close();
  }
}

/** Returns a storageState file for this lane's role, signing in off camera if needed. */
export async function sessionFor(browser, lane, role) {
  const file = stateFile(lane, role);
  if (fs.existsSync(file) && (await stillSignedIn(browser, file))) return file;

  const { email, password } = login(lane, role);
  const ctx = await browser.newContext({ baseURL: APP_URL });
  try {
    const page = await ctx.newPage();
    await page.goto("/login");
    await page.getByLabel("Email address", { exact: true }).fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await page.waitForURL((u) => !/\/(login|auth)\b/.test(u.pathname), { timeout: 30_000 });
    fs.mkdirSync(path.dirname(file), { recursive: true });
    await ctx.storageState({ path: file });
    console.log(`[auth] Signed in lane ${lane} ${role} (${email}).`);
    return file;
  } catch (e) {
    throw new Error(
      `Could not sign in as ${email}: ${e.message}\nIf the app says "Too many attempts", see recorder\\README.md.`,
    );
  } finally {
    await ctx.close();
  }
}
