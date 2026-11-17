// V-4-seating-2 · How to seat elders near the front, then let Krama suggest seats · guides\4-event-day-ai\seating.md
// Host Riya Sharma, lane 4. Off camera: 12 empty tables at the Reception (suggesting needs tables).
import { addTables, fn } from "./_lib.mjs";

export default {
  id: "V-4-seating-2",
  note: "seating",
  role: "host",
  start: (seed) => {
    addTables(seed, "Reception", 12, 10);
    return `${seed.weddingPath}/events/${fn(seed, "Reception")}/seating`;
  },

  async run({ page, step, tap, type, show }) {
    const find = page.getByRole("textbox", { name: "Find a family" });
    const front = page.getByRole("button", { name: "Near the front: Mehta family" });
    await step({ n: 0, what: "Show the families waiting on the Reception's Seating tab", hold: 5, do: () => show(page.getByRole("heading", { name: /families to seat/ })) });
    await step({ n: 1, what: "Type Mehta in Find a family", hold: 4, do: () => type(find, "Mehta") });
    await step({ n: 2, what: "Tap the arrow button Near the front: Mehta family", hold: 4, do: () => tap(front) });
    await step({ n: 3, what: "Show the arrow lit up", hold: 3, do: () => show(front) });
    await step({ n: 4, what: "Hold on the marked family", hold: 4, do: () => show(page.getByRole("button", { name: /^Mehta family/ })) });
    await step({ n: 5, what: "Tap Suggest seats", hold: 3, do: () => tap(page.getByRole("button", { name: "Suggest seats" })) });
    await step({ n: 6, what: "Show the Suggested plan", hold: 6, do: () => show(page.getByText("Suggested plan").first()) });
    await step({ n: 7, what: "Tap Use this plan", hold: 4, do: () => tap(page.getByRole("button", { name: "Use this plan" })) });
    await step({ n: "end", what: "Show the seated tables and Undo", hold: 4, do: () => show(page.getByRole("button", { name: "Undo" })) });
  },
};
