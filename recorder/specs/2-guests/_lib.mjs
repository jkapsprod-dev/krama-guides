// Shared helpers for the lane 2 specs. The file starts with "_" so the robot does not read it as a
// video. Everything here works through the app's own screens with made-up data (lane 2 demo wedding).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** A link in the main navigation: the bottom bar on a phone, the sidebar on a computer. */
export const navLink = (page, name) =>
  page.getByRole("navigation", { name: "Main" }).getByRole("link", { name, exact: true });

/** The Add a guest form. */
export const guestForm = (page) =>
  page.locator("form").filter({ has: page.getByRole("button", { name: "Save guest" }) });

/** The guest list's own region (not the header search). */
export const guestListRegion = (page) => page.getByRole("region", { name: "Guest list" });

/** The checkbox beside one guest on the Guests list. */
export const pick = (page, name) => page.getByRole("checkbox", { name: `Select ${name}`, exact: true });

/** The little bar that opens when guests are ticked. */
export const bulkBar = (page) => page.getByRole("region", { name: /selected$/ });

/** The "More" group on the Guests page (Import contacts, To send, Personal messages and so on). */
export const guestsMore = (page) => page.getByRole("main").locator("summary").filter({ hasText: /^More$/ }).first();

/** One item inside that group. */
export const moreItem = (page, name) =>
  page.getByRole("main").getByRole("link", { name: new RegExp("^" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });

/** A tab of Stays & Travel: Stays & rooms, Arrivals & departures, Pickups. */
export const stayTab = (page, name) =>
  page.getByRole("navigation", { name: "Stays & Travel" }).getByRole("link", { name, exact: true });

/** Open Stays & Travel: More, then the section on a phone; the sidebar on a computer. */
export async function openStays({ page, tap, phone }) {
  if (phone) {
    await tap(navLink(page, "More"));
    await tap(page.getByRole("main").getByRole("link", { name: /^Stays & Travel/ }));
  } else {
    await tap(navLink(page, "Stays & Travel"));
  }
}

/** Open Guests, then More, then one item of the More group (the same steps on both sizes). */
export async function openGuestsMoreItem({ page, tap }, item) {
  await tap(navLink(page, "Guests"));
  await tap(guestsMore(page));
  await tap(moreItem(page, item));
}

/**
 * Off camera: add made-up guests through the app's own Add a guest form, then go to `then`.
 * guests: [{ name, phone, email?, city?, familyName?, family? }]
 */
export async function addGuestsOffCamera(page, seed, guests, then) {
  for (const g of guests) {
    await page.goto(`${seed.weddingPath}/guests/new`);
    const form = guestForm(page);
    await form.getByLabel("Full name", { exact: true }).fill(g.name);
    if (g.phone) await form.getByLabel("Phone", { exact: true }).fill(g.phone);
    if (g.email) await form.getByLabel("Email", { exact: true }).fill(g.email);
    if (g.city) await form.getByLabel("City", { exact: true }).fill(g.city);
    if (g.family) await form.getByLabel("Family (for RSVPs)").selectOption({ label: g.family });
    if (g.familyName) await form.getByLabel("Family name", { exact: true }).fill(g.familyName);
    await form.getByRole("button", { name: "Save guest" }).click();
    const added = page.getByRole("button", { name: "Copy RSVP link" });
    const dup = page.getByRole("button", { name: "Add anyway" });
    await added.or(dup).first().waitFor({ timeout: 30_000 });
    if (await dup.isVisible()) {
      await dup.click();
      await added.waitFor({ timeout: 30_000 });
    }
  }
  await page.goto(then);
}

/** Off camera: tick a function for one guest on their page (the Invite button under Functions). */
export async function inviteOffCamera(page, seed, guestName, fn, then) {
  await page.goto(`${seed.weddingPath}/guests?q=${encodeURIComponent(guestName)}`);
  await page.getByRole("link", { name: new RegExp(`^${guestName}`) }).first().click();
  const panel = page.getByRole("region", { name: guestName, exact: true });
  await panel.getByRole("heading", { name: "Functions" }).waitFor();
  const row = panel.locator("li").filter({ hasText: fn });
  await row.getByRole("button", { name: "Invite" }).click();
  await row.getByRole("combobox").waitFor({ timeout: 30_000 });
  await page.goto(then);
}

/** WhatsApp and email links must never open from the robot: stop them at the door. */
export async function blockMessaging(page) {
  await page.context().route(/^(https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|chat\.whatsapp\.com)|whatsapp:|mailto:)/, (route) => route.abort());
}

/** A new browser context signed in as the lane's host, for set-up that must happen as the host (off camera). */
export async function hostContext(page) {
  const browser = page.context().browser();
  const { sessionFor } = await import("../../lib/auth.mjs");
  const storageState = await sessionFor(browser, 2, "host");
  return browser.newContext({ baseURL: "http://127.0.0.1:3400", storageState, viewport: { width: 390, height: 844 }, bypassCSP: true });
}

/** Picks the option of a drop-down whose text contains `text` (the full label is not always known). */
export async function selectContaining(select, text) {
  const label = await select.locator("option").evaluateAll((els, t) => els.map((o) => o.textContent.trim()).find((s) => s.includes(t)), text);
  if (!label) throw new Error(`No option containing "${text}"`);
  await select.selectOption({ label });
}

/**
 * Off camera: add a travel line through the Add travel form, then go to `then`.
 * t: { guest, direction?, by, number?, date, time?, from?, to?, pickup?, pickedUpBy?, driver? }
 */
export async function addTravelOffCamera(page, seed, t, then) {
  await page.goto(`${seed.weddingPath}/stays/travel/new`);
  await page.getByLabel("Guest", { exact: true }).selectOption({ label: t.guest });
  await page.getByLabel("Arriving or leaving", { exact: true }).selectOption({ label: t.direction ?? "Arriving" });
  await page.getByLabel("By", { exact: true }).selectOption({ label: t.by });
  if (t.number) await page.getByLabel("Flight / train number", { exact: true }).fill(t.number);
  await page.getByLabel("Date", { exact: true }).fill(t.date);
  if (t.time) await page.getByLabel("Time", { exact: true }).fill(t.time);
  if (t.from) await page.getByLabel("From", { exact: true }).fill(t.from);
  if (t.to) await page.getByLabel("To", { exact: true }).fill(t.to);
  if (t.pickup) {
    await page.getByRole("checkbox", { name: "Needs a pickup" }).check();
    if (t.pickedUpBy) await selectContaining(page.getByLabel("Picked up by", { exact: true }), t.pickedUpBy);
    if (t.driver) await selectContaining(page.getByLabel("Driver", { exact: true }), t.driver);
  }
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.waitForURL((u) => /\/stays\/travel\/?$/.test(u.pathname), { timeout: 30_000 });
  await page.goto(then);
}

/** Off camera: add a pickup run through the New run form, then go to `then`. */
export async function addRunOffCamera(page, seed, r, then) {
  await page.goto(`${seed.weddingPath}/stays/pickups/new`);
  await page.getByLabel("Arrival place", { exact: true }).fill(r.place);
  await page.getByLabel("Date", { exact: true }).fill(r.date);
  await page.getByLabel("Leaves at", { exact: true }).fill(r.time);
  if (r.meet) await page.getByLabel("Meeting point", { exact: true }).fill(r.meet);
  if (r.vehicle) await page.getByLabel("Vehicle", { exact: true }).fill(r.vehicle);
  if (r.seats) await page.getByLabel("Seats for guests", { exact: true }).fill(String(r.seats));
  if (r.driver) await selectContaining(page.getByLabel("Driver", { exact: true }), r.driver);
  await page.getByRole("button", { name: "Save run" }).click();
  await page.waitForURL((u) => /\/stays\/pickups\/?$/.test(u.pathname), { timeout: 30_000 });
  await page.goto(then);
}

/**
 * A tiny made-up train ticket as a PDF (text only, like an IRCTC e-ticket), so the app can read it.
 * Written by hand: a catalog, one page, the Helvetica font and the lines of text. Returns its path.
 */
export function makeTicketPdf(name = "sample-train-ticket.pdf") {
  const lines = [
    "IRCTC e-Ticket (Electronic Reservation Slip)",
    "PNR: 4521896307",
    "Train No: 12957",
    "Boarding At: DELHI (NDLS)",
    "Reservation Up to: AHMEDABAD JN (ADI)",
    "Arrival* 05:00 11-Feb-2027",
    "Passenger 1: ARYAN TIWARI",
  ];
  const content = ["BT", "/F1 12 Tf", "14 TL", "50 760 Td", ...lines.map((l) => `(${l.replace(/[()\\]/g, "\\$&")}) Tj T*`), "ET"].join("\n");
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}`;
  pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", ".cache", "fixtures");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, name);
  fs.writeFileSync(file, pdf, "latin1");
  return file;
}

/** Off camera, as the host: switch on "Let guests send their tickets" for the wedding. */
export async function allowTicketsOffCamera(hostPage, seed) {
  await hostPage.goto(`${seed.weddingPath}/stays/travel/tickets`);
  const toggle = hostPage.getByRole("switch", { name: "Let guests send their tickets" }).or(hostPage.getByRole("checkbox", { name: "Let guests send their tickets" })).first();
  await toggle.waitFor({ timeout: 30_000 });
  const on = (await toggle.getAttribute("aria-checked")) === "true" || (await toggle.isChecked().catch(() => false));
  if (!on) await toggle.click();
  await hostPage.waitForLoadState("networkidle");
}

/** Off camera, as the guest: send the made-up ticket from the guest link's Stay and travel tab. */
export async function sendTicketOffCamera(guestPage, guestLinkPath) {
  await guestPage.goto(`${guestLinkPath}?tab=stay`);
  const chooser = guestPage.waitForEvent("filechooser");
  await guestPage.getByLabel("Choose ticket").or(guestPage.getByText("Choose ticket")).first().click();
  await (await chooser).setFiles(makeTicketPdf());
  await guestPage.getByRole("button", { name: "Send to the hosts" }).waitFor({ timeout: 60_000 });
  await guestPage.getByRole("button", { name: "Send to the hosts" }).click();
  await guestPage.getByText(/^Sent\./).waitFor({ timeout: 30_000 });
}

/** Off camera, as the host: switch on the invite QR and return its sign-up address. */
export async function makeQrLink(hostPage, seed) {
  await hostPage.goto(`${seed.weddingPath}/guests/patrika`);
  const create = hostPage.getByRole("button", { name: "Create the QR" });
  const link = hostPage.locator("p.break-all");
  await create.or(link).first().waitFor({ timeout: 30_000 });
  if (await create.isVisible()) await create.click();
  await link.waitFor({ timeout: 30_000 });
  return (await link.innerText()).trim();
}

/** Off camera, as a stranger with the QR: send made-up details through the sign-up page. */
export async function sendDetailsOffCamera(browser, url, { name, phone, side, city }) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, bypassCSP: true });
  try {
    const guest = await ctx.newPage();
    await guest.goto(url);
    await guest.getByLabel("Your name", { exact: true }).fill(name);
    await guest.getByLabel("Phone number", { exact: true }).fill(phone);
    if (side) await guest.getByLabel("Which side are you from?").selectOption({ label: side });
    if (city) await guest.getByLabel("City", { exact: false }).fill(city);
    await guest.getByRole("button", { name: "Send my details" }).click();
    await guest.getByText("Thank you").first().waitFor({ timeout: 30_000 });
  } finally {
    await ctx.close();
  }
}

/** Writes a small made-up file the robot can hand to a file box. Returns its path. */
export function fixture(name, text) {
  const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", ".cache", "fixtures");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, name);
  fs.writeFileSync(file, text);
  return file;
}

/** Off camera: make a stay (hotel or home) through the Add a stay form. */
export async function addStayOffCamera(page, seed, { name, address = "Ashram Road, Ahmedabad", checkIn = "2027-02-10", checkOut = "2027-02-15" }, then) {
  await page.goto(`${seed.weddingPath}/stays/new`);
  await page.getByLabel("Name", { exact: true }).fill(name);
  await page.getByLabel("Address", { exact: true }).fill(address);
  await page.getByLabel("Check-in", { exact: true }).fill(checkIn);
  await page.getByLabel("Check-out", { exact: true }).fill(checkOut);
  await page.getByRole("button", { name: "Save stay" }).click();
  await page.waitForURL((u) => /\/stays(\?|$)/.test(u.pathname + u.search), { timeout: 30_000 });
  await page.goto(then);
}

/**
 * Off camera, as the host: take the Mehta family (Nisha and Rohan) off every function except `keep`,
 * so the guest page asks about one function only. Then open the guest link on `guestPage`.
 */
export async function keepOneFunctionOffCamera(guestPage, seed, keep = "Haldi", then = seed.guestLinkPath) {
  const ctx = await hostContext(guestPage);
  try {
    const host = await ctx.newPage();
    for (const who of ["Nisha Mehta", "Rohan Mehta"]) {
      await host.goto(`${seed.weddingPath}/guests?q=${encodeURIComponent(who)}`);
      await host.getByRole("link", { name: new RegExp(`^${who}`) }).first().click();
      const panel = host.getByRole("region", { name: who, exact: true });
      await panel.getByRole("heading", { name: "Functions" }).waitFor();
      for (const fn of ["Mehendi", "Haldi", "Sangeet", "Wedding", "Reception"].filter((f) => f !== keep)) {
        const row = panel.locator("li").filter({ hasText: fn });
        await row.getByRole("button", { name: "Remove" }).click();
        await row.getByRole("button", { name: "Invite" }).waitFor({ timeout: 30_000 });
      }
    }
  } finally {
    await ctx.close();
  }
  await guestPage.goto(then);
}

/** Off camera: add a made-up vendor (for example a driver) through Money > Vendors > Add vendor. */
export async function addVendorOffCamera(page, seed, { name, type = "Transport", phone = "98250 60001" }) {
  await page.goto(`${seed.weddingPath}/money/vendors/new`);
  await page.getByLabel("Name", { exact: true }).fill(name);
  const kind = page.getByLabel("Type", { exact: true });
  try {
    await selectContaining(kind, type);
  } catch {
    await selectContaining(kind, "Other");
  }
  await page.getByLabel("Phone", { exact: true }).fill(phone);
  await page.getByRole("button", { name: "Save vendor" }).click();
  // The form lives at /money/vendors/new, so that address must not count as "saved".
  await page.waitForURL((u) => /\/money\/vendors\/?$/.test(u.pathname) || (/\/money\/vendors\/[^/]+$/.test(u.pathname) && !/\/new\/?$/.test(u.pathname)), { timeout: 45_000 });
}
