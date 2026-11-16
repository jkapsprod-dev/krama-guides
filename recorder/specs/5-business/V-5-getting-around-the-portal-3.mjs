// V-5-getting-around-the-portal-3 · How to read your inbox (vendor)
import { vendor, writeBriefOffCamera } from "./_lib.mjs";

export default {
  id: "V-5-getting-around-the-portal-3",
  note: "getting-around-the-portal",
  role: "vendor",
  start: (seed) => vendor(seed),
  // Off camera: the planner writes Rangoli Decor's brief, then changes it, so the vendor has two new inbox notes.
  async setup({ page, seed }) {
    await writeBriefOffCamera(page, seed);
    await writeBriefOffCamera(page, seed, "Haldi setup ready by 7 am. Marigold, mango leaf and diyas.");
    await page.goto(vendor(seed));
  },

  async run({ page, step, tap, show }) {
    const bell = page.getByRole("link", { name: /^Inbox/ });
    await step({ n: 0, what: "Show business Home with a number on the bell", hold: 5, do: () => show(bell) });
    await step({ n: 1, what: "Click the bell named Inbox", hold: 5, do: () => tap(bell) });
    await step({
      n: 2,
      what: "Highlight the new note",
      hold: 4,
      do: () => show(page.getByRole("main").getByRole("listitem").first()),
    });
    await step({
      n: 3,
      what: "Click the note",
      hold: 4,
      do: () => tap(page.getByRole("main").getByRole("listitem").first().getByRole("link")),
    });
    await step({
      n: 4,
      what: "Go back, click Mark all read",
      hold: 5,
      do: async () => {
        await page.goBack();
        await tap(page.getByRole("button", { name: "Mark all read" }));
      },
    });
    await step({
      n: "end",
      what: "Show the inbox with no new marks",
      hold: 4,
      do: () => show(page.getByRole("main").getByRole("heading", { level: 1 })),
    });
  },
};
