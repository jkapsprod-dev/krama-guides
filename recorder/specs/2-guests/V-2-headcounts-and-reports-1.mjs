// V-2-headcounts-and-reports-1 · How to see who's coming to each function · guides\2-guests\headcounts-and-reports.md
import { guestsMore, moreItem, navLink } from "./_lib.mjs";

export default {
  id: "V-2-headcounts-and-reports-1",
  note: "headcounts-and-reports",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const card = page.locator("li, article, section").filter({ has: page.getByRole("heading", { name: "Sangeet" }) }).last();
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 4, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap More, then Headcounts", hold: 5,
      do: async () => {
        await tap(guestsMore(page));
        await tap(moreItem(page, "Headcounts"));
      } });
    await step({ n: 3, what: "Point at the Headcount number on the sangeet card", hold: 5, do: () => show(card.getByText("Headcount", { exact: false }).first()) });
    await step({ n: 4, what: "Point at Guests attending, Declined and Awaiting", hold: 5, do: () => show(card.getByText("Guests attending")) });
    await step({ n: 5, what: "Point at Meals", hold: 5, do: () => show(card.getByText("Meals", { exact: true })) });
    await step({ n: "end", what: "Show the whole function card", hold: 4, do: () => show(card) });
  },
};
