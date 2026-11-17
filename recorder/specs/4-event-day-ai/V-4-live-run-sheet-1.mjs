// V-4-live-run-sheet-1 · How to tick items as they happen, then mark the key moment · guides\4-event-day-ai\live-run-sheet.md
// Host Riya Sharma, lane 4. Off camera: the Mehendi is moved to today (ticks are on from 6 hours before)
// and given a short run sheet.
import { fn, runSheet, todayFunction } from "./_lib.mjs";

export default {
  id: "V-4-live-run-sheet-1",
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
    const item = (title) => page.getByRole("listitem").filter({ hasText: title });
    await step({ n: 0, what: "Show the Run sheet on Event day", hold: 5, do: () => show(page.getByRole("tabpanel", { name: "Run sheet" })) });
    await step({ n: 1, what: "Tap Start on Mehndi artists arrive", hold: 4, do: () => tap(item("Mehndi artists arrive").getByRole("button", { name: "Start" })) });
    await step({ n: 2, what: "Show the started time", hold: 4, do: () => show(item("Mehndi artists arrive")) });
    await step({ n: 3, what: "Tap Done", hold: 3, do: () => tap(item("Mehndi artists arrive").getByRole("button", { name: "Done" })) });
    await step({ n: 4, what: "Point at the gold Now line", hold: 5, do: () => show(page.getByText("Now", { exact: true }).first()) });
    await step({ n: 5, what: "Show the ticked list", hold: 3, do: () => show(item("Mehndi artists arrive")) });
    await step({ n: 6, what: "Scroll to Bride's mehndi", hold: 3, do: () => show(item("Bride's mehndi")) });
    await step({ n: 7, what: "Tap Key moment", hold: 3, do: () => tap(item("Bride's mehndi").getByRole("button", { name: "Key moment" })) });
    await step({ n: 8, what: "Zoom on the star", hold: 4, do: () => show(item("Bride's mehndi").getByRole("button", { name: "Not the key moment" })) });
    await step({ n: "end", what: "Show the star on the list", hold: 4, do: () => show(item("Bride's mehndi")) });
  },
};
