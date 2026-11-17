// Shared helpers for the lane 3 specs (Money & family). This file starts with "_", so the robot does
// not read it as a video.
//
// script(id, phone) reads the video's script table from the guide note, so a step's `what` and
// `hold` always match the note (the kit compares them). For a step that is different on a computer,
// voiceover\<ID>.sizes.json may carry a "what" next to the "voice" and "caption" (the kit ignores
// "what"; the robot uses it for that size's take, "phone" or "desktop").
//
// The off-camera helpers (setup) drive the real app through its own screens, with fast clicks, before
// recording starts. They only ever talk to the lane 3 demo wedding in the local demo database.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, "..", "..", "..");
const NOTES = path.join(ROOT, "guides", "3-money-family");
export const FIXTURES = path.join(ROOT, "recorder", "specs", "3-money-family", "_fixtures");

const clean = (s) => String(s ?? "").replace(/\*\*/g, "").trim();

/** Reads one video's table. Returns r(n) -> { n, what, hold } for the step numbered n ("end" too). */
export function script(id, phone = true) {
  let rows = null;
  for (const f of fs.readdirSync(NOTES).filter((f) => f.endsWith(".md") && !f.startsWith("_"))) {
    const lines = fs.readFileSync(path.join(NOTES, f), "utf8").split(/\r?\n/);
    const at = lines.findIndex((l) => l.startsWith(`### ${id} ·`));
    if (at < 0) continue;
    rows = new Map();
    let header = null;
    for (let i = at + 1; i < lines.length; i++) {
      const l = lines[i];
      if (/^#{1,3} /.test(l)) break;
      if (!l.startsWith("|")) continue;
      const c = l.split("|").slice(1, -1).map((x) => x.trim());
      if (!header) { header = c.map((h) => h.toLowerCase()); continue; }
      if (c.every((x) => /^-+$/.test(x))) continue;
      const col = (name) => c[header.findIndex((h) => h.startsWith(name))] ?? "";
      rows.set(String(col("#")), { what: clean(col("robot does")), hold: Number(col("hold")) || 3 });
    }
    break;
  }
  if (!rows) throw new Error(`No "### ${id} ·" table in guides\\3-money-family\\`);

  let sized = {};
  try {
    sized = JSON.parse(fs.readFileSync(path.join(ROOT, "voiceover", `${id}.sizes.json`), "utf8"))[phone ? "phone" : "desktop"] ?? {};
  } catch {}
  return (n) => {
    const row = rows.get(String(n));
    if (!row) throw new Error(`${id}: the note has no step ${n}`);
    const o = sized[String(n)] ?? {};
    return { n, what: o.what ?? row.what, hold: row.hold };
  };
}

/** A date as YYYY-MM-DD, `days` from today in India (the robot's clock). */
export function isoDay(days = 0) {
  const d = new Date(Date.now() + days * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(d);
}

/** Opens a section by its name: More then the section on a phone, the sidebar on a computer. */
export async function openSection({ page, tap, phone }, name, { exactName } = {}) {
  if (phone) await tap(page.getByRole("link", { name: "More", exact: true }));
  const link = phone
    ? page.getByRole("link", { name: new RegExp(`^${exactName ?? name}(\\s|$)`) }).first()
    : page.getByRole("link", { name: exactName ?? name, exact: true }).first();
  await link.waitFor({ state: "visible" });
  const target = new URL((await link.getAttribute("href")) ?? "/", page.url()).pathname;
  await tap(link);
  // The page can be slow to open. Wait for it here, so the step covers the whole move.
  await page.waitForURL((u) => u.pathname === target, { timeout: 60_000 }).catch(() => {});
}

/** Picks an option in a native <select>: taps it, then chooses (the list itself is not drawn in the video). */
export async function pick({ tap }, select, option) {
  await tap(select);
  await select.selectOption(typeof option === "string" ? { label: option } : option);
}

// ---------------------------------------------------------------------------------------------
// Off camera (setup). Fast, no cursor.
// ---------------------------------------------------------------------------------------------

/** Schedules an instalment on an expense through the expense page. */
export async function scheduleInstalment(page, seed, expenseName, amount, dueIso) {
  await page.goto(`${seed.weddingPath}/money?tab=expenses`);
  const href = await page.getByRole("link", { name: new RegExp(expenseName) }).filter({ visible: true }).first().getAttribute("href");
  await page.goto(href);
  await page.getByText("Schedule an instalment", { exact: true }).click();
  await page.getByLabel("Amount", { exact: true }).fill(String(amount));
  await page.getByLabel("Due on", { exact: true }).fill(dueIso);
  await page.getByRole("button", { name: "Add instalment", exact: true }).click();
  await page.getByText(/Due /).first().waitFor();
  await page.waitForTimeout(600);
}

/** Adds an expense through the form (name, total, optional vendor and function). */
export async function addExpense(page, seed, { what, total, vendor, fn, side }) {
  await page.goto(`${seed.weddingPath}/money/expenses/new`);
  await page.getByRole("textbox", { name: "What is it for?" }).fill(what);
  await page.getByLabel("Total agreed").fill(total);
  if (side) await page.getByLabel("Whose side", { exact: true }).selectOption({ label: side });
  if (vendor) await page.getByLabel("Vendor", { exact: true }).selectOption({ label: vendor });
  if (fn) await page.getByLabel("Function", { exact: true }).selectOption({ label: fn });
  await page.getByRole("button", { name: "Save expense" }).click();
  await page.waitForURL(/\/money\/expenses\/[0-9a-f-]{36}$/);
}

/** Empties every planned amount on the Budget tab, then saves (so the budget starts blank). */
export async function clearBudget(page, seed) {
  await page.goto(`${seed.weddingPath}/money/budget`);
  const boxes = page.getByRole("textbox", { name: /^Planned for / });
  await boxes.first().waitFor();
  for (let i = 0, n = await boxes.count(); i < n; i++) await boxes.nth(i).fill("");
  await page.getByRole("button", { name: "Save budget" }).click();
  await page.getByText("Budget saved.").waitFor();
  await page.waitForTimeout(500);
}

/**
 * The typical-split card needs a budget band picked at set-up, and the app has no screen to pick it
 * again. So this sets it in the LOCAL demo database (the lane 3 wedding only), off camera.
 */
export function setBudgetBand(seed, band = "10_25l") {
  const id = seed.weddingPath.split("/").pop();
  const sql =
    `update public.workspaces set config = coalesce(config, '{}'::jsonb) || jsonb_build_object('onboarding', ` +
    `coalesce(config->'onboarding', '{}'::jsonb) || '{"budgetBand":"${band}"}'::jsonb) where id = '${id}'`;
  execFileSync("docker", ["exec", "supabase_db_krama-celebrations", "psql", "-U", "postgres", "-c", sql], {
    windowsHide: true,
    stdio: "pipe",
  });
}

/** Taps a box that already has text, selects it and types over it (calm pace, like type()). */
export async function typeOver({ page, tap }, locator, text) {
  await tap(locator);
  await page.keyboard.press("Control+A");
  await page.keyboard.type(text, { delay: 85 });
}

/** Opens the Add an expense form: (+) then Add an expense on a phone, Add expense on Money on a computer. */
export async function openAddExpense({ page, tap, phone }) {
  if (phone) {
    await tap(page.getByRole("navigation").getByRole("button", { name: "Add", exact: true }));
    await tap(page.getByRole("dialog").getByRole("link", { name: "Add an expense", exact: true }));
  } else {
    await tap(page.getByRole("link", { name: "Add expense", exact: true }));
  }
}

/** A small made-up file in this folder's _fixtures (made by _make-fixtures.mjs). */
export const fixture = (name) => path.join(FIXTURES, name);

/** Opens Notifications: More then Notifications on a phone; the bell then See all notifications on a computer. */
export async function openNotifications({ page, tap, phone }) {
  if (phone) return openSection({ page, tap, phone }, "Notifications");
  await tap(page.getByRole("button", { name: /^Notifications/ }));
  await tap(page.getByRole("dialog").getByRole("link", { name: "See all notifications" }));
}
