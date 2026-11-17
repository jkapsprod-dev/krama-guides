// Off-camera setup helpers for the lane 3 specs (Money & family). This file starts with "_", so the
// robot does not read it as a video. Everything here runs before recording starts, with fast clicks,
// and only touches the lane 3 demo wedding in the LOCAL demo database (never krama-dev or krama-prod).
import { execFileSync } from "node:child_process";

import { fixture } from "./_lib.mjs";

/** Runs one SQL statement in the LOCAL demo database (Docker). */
export function psql(sql) {
  return execFileSync("docker", ["exec", "supabase_db_krama-celebrations", "psql", "-U", "postgres", "-At", "-c", sql], {
    windowsHide: true,
    encoding: "utf8",
  }).trim();
}

const orgOf = (p) => p.split("/").pop(); // /business/<id>
const sqlText = (s) => String(s).replace(/'/g, "''");

/**
 * A quote from Rangoli Decor, sent by Utsav Planners for the family to approve. The app builds this
 * through the planner and vendor portals (lane 5); here it is written straight into the local demo
 * database so it shows on the Quotes tab.
 */
export function addQuote(seed, { title, amountRupees, note, inclusions, validIso }) {
  const ws = seed.weddingPath.split("/").pop();
  const planner = orgOf(seed.plannerPath);
  const vendor = orgOf(seed.vendorPath);
  psql(
    `with r as (insert into public.quote_requests (org_id, wedding_id, wedding_public_id, title, category, status) ` +
      `values ('${planner}', '${ws}', '${seed.weddingId}', '${sqlText(title)}', 'decor', 'awaiting_client') returning id) ` +
      `insert into public.quotes (request_id, org_id, vendor_org_id, amount_paise, note, status, submitted_at, valid_until, inclusions) ` +
      `select r.id, '${planner}', '${vendor}', ${Number(amountRupees) * 100}, '${sqlText(note)}', 'shortlisted', now(), ` +
      `'${validIso}', '${sqlText(inclusions)}' from r`,
  );
}

/** Adds a vendor through the Add a vendor form. */
export async function addVendor(page, seed, { name, type, phone }) {
  await page.goto(`${seed.weddingPath}/money/vendors/new`);
  await page.getByLabel("Name", { exact: true }).fill(name);
  if (type) await page.getByLabel("Type", { exact: true }).selectOption({ label: type });
  if (phone) await page.getByLabel("Phone", { exact: true }).fill(phone);
  await page.getByRole("button", { name: "Save vendor" }).click();
  await page.waitForURL(/\/money\/vendors\/[0-9a-f-]{36}$/);
}

/** Adds a shagun entry through the form. */
export async function addShagun(page, seed, { direction = "We received", type = "Cash or envelope", family, name, amount, what, fn }) {
  await page.goto(`${seed.weddingPath}/shagun/new`);
  await page.getByLabel("What happened").selectOption({ label: direction });
  await page.getByLabel("Type", { exact: true }).selectOption({ label: type });
  if (family) await page.getByLabel("Family on the guest list").selectOption({ label: family });
  if (name) await page.getByLabel("Name", { exact: true }).fill(name);
  if (amount) await page.getByLabel("Amount (₹)").fill(amount);
  if (what) await page.getByLabel("What is it").fill(what);
  if (fn) await page.getByLabel("Function", { exact: true }).selectOption({ label: fn });
  await page.getByRole("button", { name: "Save entry" }).click();
  await page.waitForURL((u) => /\/shagun$/.test(u.pathname) || /\/shagun\?/.test(u.pathname + u.search));
}

/** Uploads files to a function's album on the Photos page (off camera). */
export async function addPhotos(page, seed, album, files) {
  await page.goto(`${seed.weddingPath}/photos`);
  await page.getByLabel("Album").selectOption({ label: album });
  await page.locator('input[type="file"]').setInputFiles(files.map((f) => fixture(f)));
  await page.getByText(/photos? added/).waitFor({ timeout: 60_000 });
  await page.waitForTimeout(500);
}

/** Uploads files on the Files page (off camera). */
export async function addFiles(page, seed, files) {
  await page.goto(`${seed.weddingPath}/files`);
  await page.locator('input[type="file"]').setInputFiles(files.map((f) => fixture(f)));
  for (let i = 0; i < files.length; i++) await page.getByText("Uploaded.").nth(i).waitFor({ timeout: 60_000 });
  await page.waitForTimeout(500);
}

/** Adds an outfit through the Add an outfit form (off camera). */
export async function addOutfit(page, seed, { name, fn, outfit, colour, bridal = false }) {
  await page.goto(`${seed.weddingPath}/outfits/new`);
  await page.getByLabel("Name", { exact: true }).fill(name);
  await page.getByLabel("Function", { exact: true }).selectOption({ label: fn });
  if (bridal) await page.getByLabel("In the bridal party").check();
  await page.getByLabel("Outfit", { exact: true }).fill(outfit);
  if (colour) await page.getByLabel("Main colour").selectOption({ label: colour });
  await page.getByRole("button", { name: "Save outfit" }).click();
  await page.waitForURL(/\/outfits\/[0-9a-f-]{36}/);
}
