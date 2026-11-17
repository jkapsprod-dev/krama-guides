// V-4-counts-1 · How to see the counts, change the ratios, then print or download the counts · guides\4-event-day-ai\counts.md
// Host Riya Sharma, lane 4. The robot taps Print and Download CSV; its browser has no print dialog and
// the CSV lands in a temporary folder, so the video ends on the page with both buttons.
import { fn } from "./_lib.mjs";

export default {
  id: "V-4-counts-1",
  note: "counts",
  role: "host",
  start: (seed) => `${seed.weddingPath}/events/${fn(seed, "Reception")}`,

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the Reception function page", hold: 5, do: () => show(page.getByRole("heading", { name: "Reception", level: 1 })) });
    await step({ n: 1, what: "Scroll to On the day, tap See the counts", hold: 5, do: () => tap(page.getByRole("link", { name: "See the counts" })) });
    await step({
      n: 2,
      what: "Show the plates line and how it is worked out",
      hold: 4,
      do: () => show(page.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Plates" }) })),
    });
    await step({
      n: 3,
      what: "Go back and tap Counts for the whole wedding",
      hold: 5,
      do: async () => {
        await tap(page.getByRole("link", { name: /All functions/ }));
        await tap(page.getByRole("link", { name: "Counts for the whole wedding" }));
      },
    });
    await step({ n: 4, what: "Scroll to Ratios", hold: 3, do: () => show(page.getByRole("heading", { name: "Ratios", level: 2 })) });
    await step({
      n: 5,
      what: "Change Mithai a person (grams) to 150",
      hold: 3,
      do: async () => {
        await tap(page.getByRole("textbox", { name: "Mithai a person (grams)" }));
        await page.keyboard.press("Control+A");
        await page.keyboard.type("150", { delay: 85 });
      },
    });
    await step({ n: 6, what: "Tap Save ratios", hold: 3, do: () => tap(page.getByRole("button", { name: "Save ratios" })) });
    await step({ n: 7, what: "Tap Print", hold: 3, do: () => tap(page.getByRole("button", { name: "Print", exact: true })) });
    await step({ n: 8, what: "Tap Download CSV", hold: 3, do: () => tap(page.getByRole("link", { name: "Download CSV" })) });
    await step({ n: "end", what: "Show Print and Download CSV", hold: 4, do: () => show(page.getByRole("link", { name: "Download CSV" })) });
  },
};
