// V-4-live-run-sheet-2 · How to tell everyone you are running late · guides\4-event-day-ai\live-run-sheet.md
// Host Riya Sharma, lane 4. Off camera: the Mehendi is moved to today and given a short run sheet.
import { fn, runSheet, todayFunction } from "./_lib.mjs";

export default {
  id: "V-4-live-run-sheet-2",
  note: "live-run-sheet",
  role: "host",
  start: (seed) => {
    todayFunction(seed, "Mehendi");
    runSheet(seed, "Mehendi", [
      { title: "Mehndi artists arrive", at: 0, dur: 30 },
      { title: "Bride's mehndi", at: 30, dur: 60 },
      { title: "Guests' mehndi", at: 90, dur: 90 },
      { title: "Lunch", at: 180, dur: 60 },
    ]);
    return `${seed.weddingPath}/event-day/${fn(seed, "Mehendi")}`;
  },

  async run({ page, step, tap, show }) {
    const sheet = page.getByRole("tabpanel", { name: "Run sheet" });
    await step({ n: 0, what: "Show the Run sheet", hold: 4, do: () => show(page.getByRole("tabpanel", { name: "Run sheet" })) });
    await step({ n: 1, what: "Tap Running late…", hold: 3, do: () => tap(page.getByRole("button", { name: "Running late…" })) });
    await step({ n: 2, what: "Choose 30 minutes", hold: 4, do: () => tap(sheet.getByRole("button", { name: "30 min", exact: true })) });
    await step({ n: 3, what: "Show the Tell members, linked vendors and door staff box ticked", hold: 5, do: () => show(sheet.getByLabel("Tell members, linked vendors and door staff")) });
    await step({
      n: 4,
      what: "Show the preview line, then tap Move 30 min later",
      hold: 5,
      do: async () => {
        await show(sheet.getByText(/will move/).first());
        await tap(sheet.getByRole("button", { name: /^Move \d+ min later/ }));
      },
    });
    await step({ n: 5, what: "Show the new times and the Undo button", hold: 5, do: () => show(page.getByRole("button", { name: "Undo", exact: true })) });
    await step({ n: "end", what: "Show the new times on the list", hold: 3, do: () => show(page.getByRole("listitem").filter({ hasText: "Mehndi artists arrive" })) });
  },
};
