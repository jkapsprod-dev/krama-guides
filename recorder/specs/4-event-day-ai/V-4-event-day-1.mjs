// V-4-event-day-1 · How to open event-day mode · guides\4-event-day-ai\event-day.md
// Host Riya Sharma, lane 4. Off camera: the Sangeet is moved to today, with a run sheet, tables and seated families.
// On a computer there is no More: Event day sits in the sidebar (desktop line in voiceover\V-4-event-day-1.sizes.json).
import { addTables, runSheet, seatFamilies, todayFunction } from "./_lib.mjs";

export default {
  id: "V-4-event-day-1",
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
    return seed.weddingPath;
  },

  async run({ page, step, tap, show, phone }) {
    await step({ n: 0, what: "Show the Home screen on a phone", hold: 5, do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding", level: 1 })) });
    await step({
      n: 1,
      what: phone ? "Tap More, then Event day" : "Tap Event day in the sidebar",
      hold: 5,
      do: async () => {
        if (phone) {
          await tap(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "More", exact: true }));
          await tap(page.getByRole("main").getByRole("link", { name: /^Event day/ }));
        } else {
          await tap(page.getByRole("complementary").getByRole("link", { name: "Event day", exact: true }));
        }
      },
    });
    await step({ n: 2, what: "Tap the Sangeet function", hold: 4, do: () => tap(page.getByRole("link", { name: /^Sangeet/ }).first()) });
    await step({ n: 3, what: "Zoom on the strip Saved on this phone. Works with no network.", hold: 6, do: async () => {
        const saved = page.getByRole("status").filter({ hasText: "Saved on this phone" });
        await saved.waitFor({ state: "visible", timeout: 120_000 }); // the phone saves its copy first
        await show(saved);
      },
    });
    await step({ n: 4, what: "Scroll through the tab row", hold: 4, do: () => show(page.getByRole("tablist", { name: "Parts of the day" })) });
    await step({ n: "end", what: "Show the Run sheet tab", hold: 3, do: () => show(page.getByRole("tab", { name: "Run sheet" })) });
  },
};
