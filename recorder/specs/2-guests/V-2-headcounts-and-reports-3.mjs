// V-2-headcounts-and-reports-3 · How to download the transport manifest or RSVP by side · guides\2-guests\headcounts-and-reports.md
// The file lands in the robot's downloads. The robot never sends it anywhere.
import { guestsMore, moreItem, navLink } from "./_lib.mjs";

export default {
  id: "V-2-headcounts-and-reports-3",
  note: "headcounts-and-reports",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const section = (name) => page.locator("li, article, section").filter({ has: page.getByRole("heading", { name }) }).last();
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 4, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap More, then Reports", hold: 5,
      do: async () => {
        await tap(guestsMore(page));
        await tap(moreItem(page, "Reports"));
      } });
    await step({ n: 3, what: "Find Transport manifest", hold: 4, do: () => show(page.getByRole("heading", { name: "Transport manifest" })) });
    await step({ n: 4, what: "Tap Excel", hold: 5,
      do: async () => {
        const download = page.waitForEvent("download", { timeout: 20_000 }).catch(() => null);
        await tap(section("Transport manifest").getByRole("link", { name: "Excel" }));
        await download;
      } });
    await step({ n: 5, what: "Scroll to RSVP by side and point at CSV", hold: 5, do: () => show(section("RSVP by side").getByRole("link", { name: "CSV" })) });
    await step({ n: "end", what: "Show the RSVP by side buttons", hold: 4, do: () => show(section("RSVP by side")) });
  },
};
