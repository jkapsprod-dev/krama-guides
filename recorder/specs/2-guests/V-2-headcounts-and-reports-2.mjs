// V-2-headcounts-and-reports-2 · How to send the caterer a sheet · guides\2-guests\headcounts-and-reports.md
// The file lands in the robot's downloads. The robot never sends it anywhere.
import { guestsMore, moreItem, navLink } from "./_lib.mjs";

export default {
  id: "V-2-headcounts-and-reports-2",
  note: "headcounts-and-reports",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const caterer = page.locator("li, article, section").filter({ has: page.getByRole("heading", { name: "Caterer sheet" }) }).last();
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 4, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap More, then Reports", hold: 5,
      do: async () => {
        await tap(guestsMore(page));
        await tap(moreItem(page, "Reports"));
      } });
    await step({ n: 3, what: "Find Caterer sheet", hold: 4, do: () => show(page.getByRole("heading", { name: "Caterer sheet" })) });
    await step({ n: 4, what: "Tap Excel", hold: 5,
      do: async () => {
        const download = page.waitForEvent("download", { timeout: 20_000 }).catch(() => null);
        await tap(caterer.getByRole("link", { name: "Excel" }));
        await download;
      } });
    await step({ n: 5, what: "Point at the Excel button again", hold: 5, do: () => show(caterer.getByRole("link", { name: "Excel" })) });
    await step({ n: "end", what: "Show the Caterer sheet buttons", hold: 4, do: () => show(caterer) });
  },
};
