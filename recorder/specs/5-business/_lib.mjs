// Shared helpers for the lane 5 specs (planners and vendors). The file starts with "_" so the robot
// does not read it as a video. Everything works through the app's own screens with made-up data
// (lane 5 demo business: Utsav Planners and Rangoli Decor).

/** The business sidebar on a computer, or the bottom bar on a phone. */
export const sidebarLink = (page, name) =>
  page.getByRole("complementary").getByRole("navigation", { name: "Main" }).getByRole("link", { name, exact: true });

/** The bottom bar on a phone. */
export const bottomBar = (page) => page.getByRole("navigation", { name: "Main" });

/** The list of sections on a phone's More page. */
export const moreLink = (page, name) =>
  page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name, exact: true });

/**
 * Open a page from the navigation. A computer taps the sidebar. A phone taps More, then the page
 * (Home, Weddings and Calendar are on the bottom bar itself).
 */
export async function openPage(page, tap, phone, name) {
  if (!phone) return tap(sidebarLink(page, name));
  if (["Home", "Weddings", "Calendar"].includes(name)) return tap(bottomBar(page).getByRole("link", { name, exact: true }));
  await tap(bottomBar(page).getByRole("link", { name: "More", exact: true }));
  await moreLink(page, name).waitFor();
  return tap(moreLink(page, name));
}

/** Pick an option in a drop-down: glide to it, then choose (a native list can't be drawn on video). */
export async function choose(show, locator, label) {
  await show(locator);
  await locator.selectOption({ label });
}

/** Fill a date box (yyyy-mm-dd): glide to it, then set it. */
export async function fillDate(show, locator, iso) {
  await show(locator);
  await locator.fill(iso);
}

/** The dialog that opens over the page (a sheet on a phone, a panel on a computer). */
export const dialog = (page) => page.getByRole("dialog");

/** Business pages for this lane, from the seed's planner or vendor address. */
export const planner = (seed, sub = "") => `${seed.plannerPath}${sub}`;
export const vendor = (seed, sub = "") => `${seed.vendorPath}${sub}`;

// ── off-camera helpers ─────────────────────────────────────────────────────────────────────────
import { sessionFor } from "../../lib/auth.mjs";
import { APP_URL } from "../../lib/paths.mjs";

/** The "Are you sure?" box that opens over the page. */
export const confirmBox = (page) => page.getByRole("alertdialog");

/**
 * Off camera: run something as another demo login of this lane (planner, vendor, host…), in its own
 * private browser window. The recording window is not touched.
 */
export async function withRole(page, role, fn, { lane = 5, size = { width: 1440, height: 900 } } = {}) {
  const browser = page.context().browser();
  const storageState = await sessionFor(browser, lane, role);
  const ctx = await browser.newContext({
    baseURL: APP_URL,
    storageState,
    viewport: size,
    locale: "en-IN",
    timezoneId: "Asia/Kolkata",
    colorScheme: "light",
    bypassCSP: true,
  });
  const p = await ctx.newPage();
  p.setDefaultTimeout(20_000);
  try {
    return await fn(p);
  } finally {
    await ctx.close();
  }
}

/** Off camera, as the planner: write a brief for Rangoli Decor (the vendor then has an unread brief and inbox note). */
export async function writeBriefOffCamera(page, seed, text = "Haldi setup ready by 7 am. Marigold and mango leaf.", contact = "Meena Bua 98250 11223") {
  await withRole(page, "planner", async (p) => {
    await p.goto(planner(seed, "/quotes"));
    const card = p.getByRole("listitem").filter({ hasText: "Rangoli Decor" }).filter({ has: p.getByRole("button", { name: "Save brief" }) });
    await card.getByRole("textbox", { name: "Brief", exact: true }).fill(text);
    await card.getByRole("textbox", { name: "Who to call on the day" }).fill(contact);
    await card.getByRole("button", { name: "Save brief" }).click();
    await p.getByText("Brief saved.").first().waitFor();
  });
}

/** Off camera, as the host: end the link with Utsav Planners (Codes & planner, Remove planner). */
export async function unlinkPlannerOffCamera(page, seed) {
  await withRole(page, "host", async (p) => {
    await p.goto(`${seed.weddingPath}/settings/codes`);
    await p.getByRole("button", { name: "Remove planner" }).click();
    await p.getByRole("button", { name: "Yes, remove" }).click();
    const none = p.getByLabel("Have a planner code?");
    await none.waitFor({ timeout: 45_000 }).catch(async () => {
      await p.reload(); // the page can be slow to refresh when the PC is busy
      await none.waitFor({ timeout: 30_000 });
    });
  });
}

/** Off camera, as the planner: ask to join the Sharma-Patel wedding by its Wedding ID. */
export async function askToJoinOffCamera(page, seed) {
  await withRole(page, "planner", async (p) => {
    await p.goto(planner(seed, "/weddings"));
    await p.getByLabel("Wedding ID", { exact: true }).fill(seed.weddingId);
    await p.getByRole("button", { name: "Send request" }).click();
    await p.getByText("Request sent.").first().waitFor();
  });
}

// ── small helpers for typing and files ─────────────────────────────────────────────────────────
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/** Tap a box that already has text, clear it, then type at a calm pace. */
export async function replace(page, tap, locator, text) {
  await tap(locator);
  await page.keyboard.press("Control+A");
  await page.keyboard.type(text, { delay: 85 });
}

/** A tiny made-up PDF with a title, for the Documents videos. Returns its path. */
export function samplePdf(fileName, line = "Sample document, made up for the guide.") {
  const dir = path.join(os.tmpdir(), "krama-guides-samples");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, fileName);
  const text = `BT /F1 20 Tf 72 720 Td (${line.replace(/[()]/g, "")}) Tj ET`;
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${text.length} >>\nstream\n${text}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let out = "%PDF-1.4\n";
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  for (const o of offsets) out += `${String(o).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  fs.writeFileSync(file, out);
  return file;
}

// ── Money ──────────────────────────────────────────────────────────────────────────────────────
/** A tab on the Money page (Due, Invoices, Challans, Purchases). */
export const moneyTab = (page, name) =>
  page.getByRole("link", { name, exact: true }).or(page.getByRole("tab", { name, exact: true })).first();

/** Off camera: save the business's GSTIN, state and UPI ID on Settings, so invoices can be issued. */
export async function billingDetailsOffCamera(page, seed) {
  await page.goto(planner(seed, "/settings"));
  const box = page.getByRole("region", { name: "Billing details" });
  await box.getByLabel("GSTIN", { exact: true }).fill("24ABCDE1234F1Z6");
  await box.getByLabel("State", { exact: true }).selectOption({ label: "24 Gujarat" });
  await box.getByLabel("UPI ID").fill("utsavplanners@okbank");
  await box.getByRole("button", { name: "Save billing details" }).click();
  await box.getByText("Saved.").first().waitFor();
}

/** Off camera: save billing details, then issue one invoice to the Sharma family for ₹1,25,000. */
export async function issueInvoiceOffCamera(page, seed, { dueDaysAgo = 0 } = {}) {
  await billingDetailsOffCamera(page, seed);
  await page.goto(planner(seed, "/money/invoices"));
  await page.getByRole("button", { name: "New invoice" }).or(page.getByRole("link", { name: "New invoice" })).first().click();
  await page.getByLabel("Name", { exact: true }).first().fill("Sharma family");
  await page.getByLabel("State (place of supply)").selectOption({ label: "24 Gujarat" });
  if (dueDaysAgo) {
    const d = new Date(Date.now() - dueDaysAgo * 864e5).toISOString().slice(0, 10);
    await page.getByLabel(/^Due date/).fill(d);
  }
  await page.getByLabel("Description").first().fill("Planning fee, advance");
  await page.getByLabel("Rate (₹)").first().fill("125000");
  await page.getByRole("button", { name: "Issue invoice" }).click();
  await page.getByText(/Still to pay|Issued|Print or save as PDF/).first().waitFor();
}

// ── Crew ───────────────────────────────────────────────────────────────────────────────────────
/** Pick the option whose text contains `text` (for lists whose labels are long). */
export async function chooseLike(show, locator, text) {
  await show(locator);
  const value = await locator.locator("option", { hasText: text }).first().getAttribute("value");
  await locator.selectOption(value);
}

/** The Crew tab of Calendar and crew. */
export const crewTab = (page) =>
  page.getByRole("navigation", { name: "Calendar sections" }).getByRole("link", { name: "Crew", exact: true });

/** Off camera: add Mahesh Parmar (made-up number) to the crew list. */
export async function addCrewOffCamera(page, seed) {
  await page.goto(planner(seed, "/calendar"));
  await crewTab(page).click();
  await page.getByRole("button", { name: "Add crew" }).click();
  const form = dialog(page);
  await form.getByLabel("Name", { exact: true }).fill("Mahesh Parmar");
  await form.getByLabel("Phone", { exact: true }).fill("98250 20011");
  await form.getByLabel("Type", { exact: true }).selectOption({ label: "Freelancer" });
  await form.getByLabel("Skills").fill("Tent and lights");
  await form.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByText("Mahesh Parmar").first().waitFor();
}

/** Off camera: give Mahesh a shift on the Haldi function. */
export async function assignShiftOffCamera(page) {
  const sel = page.getByLabel("Which function");
  await sel.selectOption(await sel.locator("option", { hasText: "Haldi" }).first().getAttribute("value"));
  await page.getByLabel("Who", { exact: true }).selectOption({ label: "Mahesh Parmar" }).catch(async () => {
    const who = page.getByLabel("Who", { exact: true });
    await who.selectOption(await who.locator("option", { hasText: "Mahesh" }).first().getAttribute("value"));
  });
  await page.getByLabel("Role", { exact: true }).fill("Tent lead");
  await page.getByLabel("Note for them").fill("Report at 6 am");
  await page.getByRole("button", { name: "Assign" }).click();
  await page.getByText("Assigned.").first().waitFor();
}

// ── a client (family) who signs up to accept a proposal ────────────────────────────────────────
const MAILPIT = "http://127.0.0.1:54324"; // the local mail catcher: nothing leaves this PC
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** The link in the newest email to an address, as a path on the recording app. */
async function mailPath(email, after) {
  for (let i = 0; i < 80; i++) {
    const found = await (await fetch(`${MAILPIT}/api/v1/search?query=${encodeURIComponent(`to:${email}`)}`)).json();
    for (const m of found.messages ?? []) {
      if (new Date(m.Created) < after) continue;
      const full = await (await fetch(`${MAILPIT}/api/v1/message/${m.ID}`)).json();
      const link = (full.HTML ?? "").match(/href="(https?:\/\/[^"]+)"/)?.[1]?.replace(/&amp;/g, "&");
      if (link) {
        const u = new URL(link);
        return `${u.pathname}${u.search}`;
      }
    }
    await sleep(500);
  }
  throw new Error(`No email arrived for ${email}.`);
}

/** A new made-up address for every take: the sign-up sends no email when the address already has an account. */
export const freshClientEmail = () => `meera.shah.${Date.now().toString(36)}@example.test`;
export const CLIENT_EMAIL = "meera.shah.l5@example.test";
export const CLIENT_PASSWORD = "Haldi2027ready";

/** Off camera: Meera Shah (made up) creates her account through the app's own sign-up and confirms by email. */
export async function clientSignUpOffCamera(page, { email = CLIENT_EMAIL, name = "Meera Shah", password = CLIENT_PASSWORD } = {}) {
  const after = new Date(Date.now() - 2000);
  await page.goto("/login");
  const existing = await page.getByRole("link", { name: "Create an account", exact: true }).waitFor().then(() => true).catch(() => false);
  if (existing) await page.getByRole("link", { name: "Create an account", exact: true }).click();
  await page.getByLabel("Your name", { exact: true }).fill(name);
  await page.getByLabel("Email address", { exact: true }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Create account", exact: true }).click();
  await page.getByRole("heading", { name: "Check your email" }).waitFor();
  await page.goto(await mailPath(email, after));
  await page.waitForLoadState("load");
}

/** Off camera, as the planner: put the client's email on the draft for Meera Shah and send it. Returns the link. */
export async function sendProposalOffCamera(page, seed, email = CLIENT_EMAIL) {
  return withRole(page, "planner", async (p) => {
    await p.goto(planner(seed, "/proposals"));
    await p.getByRole("link", { name: /Proposal for Meera Shah/ }).first().click();
    const box = p.getByLabel("Client's email");
    await box.fill(email);
    await p.getByRole("button", { name: "Save and send" }).click();
    const share = p.getByRole("region", { name: "Share with your client" }).or(p.getByText("Share with your client").locator(".."));
    await share.first().waitFor();
    const link = (await p.getByText(/\/proposal\/[\w-]{20,}/).first().innerText()).trim();
    return link;
  });
}

/** Off camera: send the draft to Meera Shah, and Meera accepts it. A booking now exists (Confirmed). */
export async function acceptProposalOffCamera(page, seed) {
  const email = freshClientEmail();
  const link = await sendProposalOffCamera(page, seed, email);
  const browser = page.context().browser();
  const ctx = await browser.newContext({
    baseURL: APP_URL,
    viewport: { width: 1440, height: 900 },
    locale: "en-IN",
    timezoneId: "Asia/Kolkata",
    colorScheme: "light",
    bypassCSP: true,
  });
  const p = await ctx.newPage();
  p.setDefaultTimeout(20_000);
  try {
    await clientSignUpOffCamera(p, { email });
    await p.goto(link);
    await p.getByLabel("Type your full name to accept").fill("Meera Shah");
    await p.getByRole("button", { name: "Accept proposal" }).click();
    await p.getByText(/Thank you/).first().waitFor();
  } finally {
    await ctx.close();
  }
}

// ── Quote requests ─────────────────────────────────────────────────────────────────────────────
/** Off camera, as the vendor: read Rangoli Decor's Business ID from its Settings page. */
export async function vendorBusinessId(page, seed) {
  return withRole(page, "vendor", async (p) => {
    await p.goto(vendor(seed, "/settings"));
    return (await p.getByRole("region", { name: "Business ID" }).locator("p").first().innerText()).trim();
  });
}

/** Off camera, as the planner: add Rangoli Decor to the vendor book. */
export async function addVendorToBookOffCamera(page, seed) {
  const id = await vendorBusinessId(page, seed);
  await withRole(page, "planner", async (p) => {
    await p.goto(planner(seed, "/quotes"));
    await p.getByLabel("Vendor ID", { exact: true }).fill(id);
    await p.getByRole("button", { name: "Add vendor" }).click();
    await p.getByText("Rangoli Decor").first().waitFor();
  });
  return id;
}

/** Off camera, as the planner: send a quote request for decor to Rangoli Decor. */
export async function sendQuoteRequestOffCamera(page, seed) {
  await withRole(page, "planner", async (p) => {
    await p.goto(planner(seed, "/quotes"));
    await p.getByRole("button", { name: "New quote request" }).click();
    const form = p.getByRole("dialog").or(p.locator("form").filter({ has: p.getByRole("button", { name: "Send request" }) })).first();
    const wedding = form.getByLabel("Wedding", { exact: true });
    await wedding.selectOption(await wedding.locator("option", { hasText: /Sharma/ }).first().getAttribute("value"));
    await form.getByLabel("What do you need?").fill("Mandap and stage decor");
    const cat = form.getByLabel("Category", { exact: true });
    await cat.selectOption(await cat.locator("option", { hasText: /cor/ }).first().getAttribute("value"));
    await form.getByLabel("Brief", { exact: true }).fill("Haldi and sangeet. 200 guests. Setup by 7 am.");
    await form.getByLabel("Reply by").fill(new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10));
    await form.getByRole("checkbox", { name: /Rangoli Decor/ }).check();
    await form.getByRole("button", { name: "Send request" }).click();
    await p.getByText("Collecting quotes").first().waitFor();
  });
}

/** Off camera, as the vendor: send a price for the open request. */
export async function sendQuoteOffCamera(page, seed) {
  await withRole(page, "vendor", async (p) => {
    await p.goto(vendor(seed));
    await p.getByRole("link", { name: /Quote requested/ }).first().click();
    await p.getByLabel("Your price (₹)").fill("52000");
    await p.getByLabel("What is included").fill("Mandap, stage, 200 chairs, lights");
    await p.getByLabel("Price holds until").fill(new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10));
    await p.getByRole("button", { name: "Send quote" }).click();
    await p.getByText("Quote sent.").first().waitFor();
  });
}

/** Off camera: open Rangoli Decor's page for the Sharma-Patel wedding. */
export async function openVendorWeddingPage(page, seed) {
  await page.goto(vendor(seed, "/weddings"));
  await page.getByRole("main").getByRole("link", { name: /Sharma.Patel wedding/ }).first().click();
  await page.waitForURL(/\/weddings\/[0-9a-f-]{36}/);
}

/** Show the first of these that is on screen (a short message may already be gone). */
export async function showAny(show, ...locators) {
  for (const loc of locators) {
    if (await loc.first().isVisible().catch(() => false)) return show(loc.first());
  }
  return show(locators.at(-1).first());
}
