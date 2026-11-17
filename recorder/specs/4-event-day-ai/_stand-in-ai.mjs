// A small stand-in for the AI service, for recording lane 4's AI videos only.
//
// Why: the recording app has no AI (guides-recording.md §7: AI_BASE_URL is empty), so the assistant's
// typed box, the answer language, the microphone and meeting minutes are switched off. The app asks
// an OpenAI-style service for three things, and this file answers them with plain rules:
//   1. "pick"    which of the 20 fixed questions a typed sentence means (the answer itself is then
//                worked out by the app from the demo wedding, as in the live app);
//   2. "note"    a short note → a task or an arrival to review;
//   3. "minutes" meeting notes → minutes and tasks;
//   and speech to text, which returns the sentence the video script queued with POST /_say.
// It listens on 127.0.0.1 only and keeps nothing. Start and stop it with _ai-on.mjs and _ai-off.mjs.
import http from "node:http";

export const STAND_IN_PORT = 3499;

const queue = []; // sentences the next microphone clips will "say"

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

/** The next date (YYYY-MM-DD) that falls on a weekday name; "next week" is 7 days on. */
function dateFor(word, today = new Date()) {
  const w = String(word || "").toLowerCase();
  const d = new Date(today);
  if (w === "next week") d.setDate(d.getDate() + 7);
  else if (DAYS.includes(w)) {
    const add = (DAYS.indexOf(w) - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + add);
  } else return undefined;
  return d.toISOString().slice(0, 10);
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// 1. Which of the 20 questions? Plain keyword rules; anything else is "none" (the app says it can't answer).
const PICKS = [
  [/how many guests|who.*(coming|said yes)|rsvp|said yes|attending/i, { id: "rsvp_summary" }],
  [/not (yet )?repl|awaiting|waiting for (a )?repl/i, { id: "awaiting_replies" }],
  [/next function|what time|when is/i, { id: "next_function" }],
  [/overdue/i, { id: "tasks_overdue" }],
  [/budget|spent/i, { id: "budget_summary" }],
  [/payment|due/i, { id: "payments_due" }],
  [/rooms?|stay/i, { id: "rooms_summary" }],
];
function pick(question) {
  for (const [re, p] of PICKS) if (re.test(question)) return { ...p, lang: "en" };
  return { id: "none", lang: "en" };
}

// 2. A short note → actions.
function actionsFor(note) {
  const out = [];
  for (const raw of note.split(/(?<=[.!?])\s+/)) {
    const s = raw.trim().replace(/[.!?]$/, "");
    const arrival = s.match(/^(.+?)\s+arrives?\s+(?:on\s+)?(\w+day)?\s*(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (arrival) {
      let hour = Number(arrival[3]) % 12;
      if ((arrival[5] || "").toLowerCase() === "pm") hour += 12;
      out.push({
        kind: "add_arrival",
        guest: arrival[1],
        ...(dateFor(arrival[2]) ? { date: dateFor(arrival[2]) } : {}),
        time: `${String(hour).padStart(2, "0")}:${arrival[4] || "00"}`,
      });
    } else if (/^(call|send|book|pay|confirm|ask|buy|check)\b/i.test(s)) {
      out.push({ kind: "add_task", title: cap(s) });
    }
  }
  return { actions: out.slice(0, 5) };
}

// 3. Meeting notes → minutes. "Name will do a thing by Friday." is a task; "agreed" or "decided" is a decision.
function minutesFor(notes) {
  const summary = [];
  const decisions = [];
  const tasks = [];
  for (const raw of notes.split(/(?<=[.!?])\s+/)) {
    const s = raw.trim().replace(/[.!?]$/, "");
    if (!s) continue;
    const t = s.match(/^(\w+)\s+will\s+(.+?)(?:\s+by\s+(\w+(?:\s+week)?))?$/i);
    if (t) tasks.push({ title: cap(t[2]), owner: t[1], ...(dateFor(t[3]) ? { due: dateFor(t[3]) } : {}) });
    else if (/\b(agreed|decided)\b/i.test(s)) decisions.push(s);
    else summary.push(s);
  }
  return { summary: summary.slice(0, 8), decisions: decisions.slice(0, 8), tasks: tasks.slice(0, 15) };
}

function answer(body) {
  const name = body?.response_format?.json_schema?.name;
  const user = [...(body?.messages || [])].reverse().find((m) => m.role === "user")?.content || "";
  const content = name === "pick" ? pick(user) : name === "note" ? actionsFor(user) : name === "minutes" ? minutesFor(user) : { id: "none" };
  return { choices: [{ message: { content: JSON.stringify(content) } }] };
}

export function startStandIn(port = STAND_IN_PORT) {
  const server = http.createServer((req, res) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      const send = (obj, code = 200) => {
        res.writeHead(code, { "content-type": "application/json" });
        res.end(JSON.stringify(obj));
      };
      try {
        if (req.method === "POST" && req.url === "/_say") {
          const { text, texts } = JSON.parse(data || "{}");
          if (texts) queue.splice(0, queue.length, ...texts);
          else if (text) queue.push(text);
          return send({ queued: queue.length });
        }
        if (req.method === "POST" && req.url.endsWith("/chat/completions")) return send(answer(JSON.parse(data || "{}")));
        if (req.method === "POST" && req.url.startsWith("/run/")) return send({ result: { text: queue.shift() ?? "" } });
        if (req.method === "GET" && req.url === "/_health") return send({ ok: true });
        send({ error: "not found" }, 404);
      } catch (e) {
        send({ error: String(e.message) }, 500);
      }
    });
  });
  server.listen(port, "127.0.0.1");
  return server;
}

// Run directly: node _stand-in-ai.mjs
if (import.meta.url === new URL(process.argv[1], "file://").href || process.argv[1]?.endsWith("_stand-in-ai.mjs")) {
  startStandIn();
  console.log(`Stand-in AI on http://127.0.0.1:${STAND_IN_PORT}`);
}
