// V-4-event-day-2 · How to move between the tabs · guides\4-event-day-ai\event-day.md
// Host Riya Sharma, lane 4. Off camera: the Sangeet is moved to today, with a run sheet, tables and seated families.
import { addTables, fn, runSheet, seatFamilies, todayFunction } from "./_lib.mjs";

export default {
  id: "V-4-event-day-2",
  note: "event-day",
  role: "host",
  start: (seed) => {
    todayFunction(seed, "Sangeet");
    runSheet(seed, "Sangeet", [
      { title: "Welcome drinks", at: 0, dur: 30 },
      { title: "Family performances", at: 30, dur: 60, contact: "Rangoli Decor" },
      { title: "Dinner", at: 90, dur: 60, contact: "Annapurna Caterers" },
      { title: "DJ and dance floor", at: 150, dur: 90 },
    ]);
    addTables(seed, "Sangeet", 10, 10);
    seatFamilies(seed, "Sangeet", 24);
    return `${seed.weddingPath}/event-day/${fn(seed, "Sangeet")}`;
  },

  async run({ page, step, tap, type, show }) {
    const tab = (name) => page.getByRole("tab", { name, exact: true });
    await step({ n: 0, what: "Show the Run sheet tab", hold: 5, do: () => show(tab("Run sheet")) });
    await step({ n: 1, what: "Tap Emergency", hold: 4, do: () => tap(tab("Emergency")) });
    await step({
      n: 2,
      what: "Tap Seating, type Mehta in Find a family",
      hold: 6,
      do: async () => {
        await tap(tab("Seating"));
        await type(page.getByRole("textbox", { name: "Find a family" }), "Mehta");
      },
    });
    await step({ n: 3, what: "Tap Contacts", hold: 4, do: () => tap(tab("Contacts")) });
    await step({ n: 4, what: "Tap Food", hold: 4, do: () => tap(tab("Food")) });
    await step({ n: "end", what: "Back to Run sheet", hold: 4, do: () => tap(tab("Run sheet")) });
  },
};
