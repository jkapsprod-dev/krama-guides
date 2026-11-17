// Shared helpers for the lane 4 specs. This file starts with "_" so the robot does not read it as a
// video. It talks to the LOCAL demo database only (the Docker container supabase_db_krama-celebrations),
// never krama-dev or krama-prod. It sets up, off camera, the things lane 4's demo data lacks
// (guides\_video-list.md, "Lane 4"): a function that falls today, a run sheet, tables, a finished
// function, a finished wedding. Nothing here runs on camera.
import { execFileSync } from "node:child_process";

const DB = "supabase_db_krama-celebrations";

/** Runs one SQL statement on the local demo database and returns its output. */
export function sql(query) {
  return execFileSync("docker", ["exec", "-i", DB, "psql", "-U", "postgres", "-At", "-v", "ON_ERROR_STOP=1", "-c", query], {
    encoding: "utf8",
    windowsHide: true,
  }).trim();
}

const q = (text) => String(text).replace(/'/g, "''");

/** The wedding's id, from seed.weddingPath (/w/<id>). */
export const ws = (seed) => seed.weddingPath.split("/").pop();

/** A function's id by name (Mehendi, Haldi, Sangeet, Wedding, Reception). */
export function fn(seed, name) {
  const id = sql(`select id from public.events where workspace_id='${ws(seed)}' and name='${name}'`);
  if (!id) throw new Error(`No function called ${name} in this wedding.`);
  return id;
}

/** Moves one function in time, as hours from now (negative is the past). */
export function moveFunction(seed, name, startH, endH) {
  sql(
    `update public.events set starts_at = now() + interval '${startH} hours', ends_at = now() + interval '${endH} hours' ` +
      `where workspace_id='${ws(seed)}' and name='${name}'`,
  );
}

/** A function that is happening now: started an hour ago, ends in four hours (run sheet ticks are on). */
export function todayFunction(seed, name) {
  moveFunction(seed, name, -1, 4);
}

/**
 * Puts the whole wedding in the past: every function is over and the last one ended `daysAgo` days ago,
 * so Wrap-up is open (it opens the day after the last function).
 */
export function endWedding(seed, daysAgo = 2) {
  sql(
    `update public.events set starts_at = now() - interval '${daysAgo} days' - interval '5 hours', ` +
      `ends_at = now() - interval '${daysAgo} days' where workspace_id='${ws(seed)}'`,
  );
}

/**
 * A run sheet for one function: items are { title, at: minutes after the function starts, dur, contact? }.
 * contact is the name of one of the wedding's contacts (for example Rangoli Decor), so the Contacts tab has a number.
 */
export function runSheet(seed, name, items) {
  const w = ws(seed);
  const e = fn(seed, name);
  sql(`delete from public.timeline_items where workspace_id='${w}' and event_id='${e}'`);
  items.forEach((it, i) => {
    const contact = it.contact
      ? `(select id from public.contacts where workspace_id='${w}' and name='${q(it.contact)}')`
      : "null";
    sql(
      `insert into public.timeline_items (workspace_id, event_id, starts_at, duration_min, title, sort_order, contact_id) ` +
        `select '${w}', '${e}', starts_at + interval '${it.at} minutes', ${it.dur ?? 30}, '${q(it.title)}', ${i}, ${contact} ` +
        `from public.events where id='${e}'`,
    );
  });
}

/** Adds numbered tables to one function (labels 1, 2 … the app shows them as Table 1, Table 2), as the Seating tab would. */
export function addTables(seed, name, count = 12, seats = 10) {
  const w = ws(seed);
  const e = fn(seed, name);
  sql(`delete from public.seating_tables where workspace_id='${w}' and event_id='${e}'`);
  sql(
    `insert into public.seating_tables (workspace_id, event_id, label, shape, seats, sort_order) ` +
      `select '${w}', '${e}', n::text, 'round', ${seats}, n from generate_series(1, ${count}) n`,
  );
}

/** Seats the first `families` families (by name) at the tables, three people each, three families a table. */
export function seatFamilies(seed, name, families = 24) {
  const w = ws(seed);
  const e = fn(seed, name);
  sql(
    `insert into public.seat_assignments (workspace_id, event_id, table_id, household_id, people) ` +
      `select '${w}', '${e}', t.id, h.id, 3 ` +
      `from (select id, row_number() over (order by name) rn from public.households where workspace_id='${w}' order by name limit ${families}) h ` +
      `join (select id, row_number() over (order by sort_order) rn from public.seating_tables where event_id='${e}') t ` +
      `on t.rn = ((h.rn - 1) / 3) + 1`,
  );
}

/**
 * A made-up friend's wedding that owns the referral code ANJALI-DHRUV27, so "Use code" has a real
 * code to find. It is not one of the demo weddings and Riya is not in it.
 */
export function friendReferralCode() {
  sql(
    `insert into public.workspaces (id, name) values ('00000000-0000-4000-8000-0000000f4001', 'Anjali and Dhruv wedding (made up)') on conflict (id) do nothing`,
  );
  // A new wedding gets its own referral code by itself; give it the made-up one.
  sql(
    `update public.codes set code='ANJALIDHRUV27', display='ANJALI-DHRUV27' where workspace_id='00000000-0000-4000-8000-0000000f4001' and kind='referral'`,
  );
  return "ANJALI-DHRUV27";
}

/**
 * A function that finished yesterday, with a run sheet that was ticked (the "Bride's mehndi" item is the
 * key moment, started 12 minutes late) and 8 families (16 people) checked in. For the recap and the "That's … done." card.
 */
export function finishedFunction(seed, name) {
  const w = ws(seed);
  moveFunction(seed, name, -30, -26);
  runSheet(seed, name, [
    { title: "Mehndi artists arrive", at: 0, dur: 30 },
    { title: "Bride's mehndi", at: 30, dur: 60 },
    { title: "Guests' mehndi", at: 90, dur: 90 },
    { title: "Lunch", at: 180, dur: 60 },
  ]);
  const e = fn(seed, name);
  sql(
    `update public.timeline_items set started_at = starts_at + interval '12 minutes', done_at = starts_at + interval '12 minutes' + (duration_min * interval '1 minute'), ` +
      `key_moment = (title = 'Bride''s mehndi') where event_id='${e}' and title <> 'Lunch'`,
  );
  sql(
    `insert into public.check_ins (id, workspace_id, event_id, household_id, people, scanned_at) ` +
      `select gen_random_uuid(), '${w}', '${e}', h.id, 2, now() - interval '28 hours' ` +
      `from (select h.id, row_number() over (order by h.name) rn from public.households h where h.workspace_id='${w}' and exists (select 1 from public.invitations i join public.guests g on g.id = i.guest_id where i.event_id='${e}' and g.household_id = h.id) order by h.name limit 8) h`,
  );
}

// ── AI videos ───────────────────────────────────────────────────────────────────────────────
// The recording app on port 3400 has no AI. The AI videos open a second copy of the app on port 3410
// that uses a small stand-in AI (_stand-in-ai.mjs). Start both first with `node _ai-on.mjs` in this
// folder; stop them with `node _ai-off.mjs`. The saved sign-in works on both ports.

/** Where the AI videos open the app. */
export const AI_APP = "http://127.0.0.1:3410";

/** Tells the stand-in what the next microphone clips will say (replaces anything waiting). */
export async function saySoon(...texts) {
  const res = await fetch("http://127.0.0.1:3499/_say", { method: "POST", body: JSON.stringify({ texts }) });
  if (!res.ok) throw new Error("The stand-in AI is not running. Run `node _ai-on.mjs` in recorder/specs/4-event-day-ai first.");
}

/**
 * A pretend microphone for the robot's browser, which has none: getUserMedia gives a quiet audio stream, so the
 * app's own Speak button records a short clip and sends it for reading, just as with a real microphone.
 * Add it before the page loads (an init script), then load the page again.
 */
export const FAKE_MIC = () => {
  navigator.mediaDevices.getUserMedia = async () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    const dest = ctx.createMediaStreamDestination();
    osc.connect(gain).connect(dest);
    osc.start();
    return dest.stream;
  };
};
