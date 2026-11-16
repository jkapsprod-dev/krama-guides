// V-2-personal-messages-3 · How to turn on the easier RSVP page for some families · guides\2-guests\personal-messages.md
import { guestsMore, moreItem, navLink } from "./_lib.mjs";

export default {
  id: "V-2-personal-messages-3",
  note: "personal-messages",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const box = page.getByText("Easier-to-read RSVP page", { exact: true }).first();
    const first = page.getByRole("checkbox", { name: /^Easier-to-read RSVP page for / }).first();
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 4, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap More, then Personal messages", hold: 5,
      do: async () => {
        await tap(guestsMore(page));
        await tap(moreItem(page, "Personal messages"));
      } });
    await step({ n: 3, what: "Scroll to Easier-to-read RSVP page", hold: 4, do: () => show(box) });
    await step({ n: 4, what: "Tap Turn on for these families", hold: 5, do: () => tap(page.getByRole("button", { name: "Turn on for these families" })) });
    await step({ n: 5, what: "Scroll down to show the ticked boxes on the family rows", hold: 5, do: () => show(first) });
    await step({ n: "end", what: "Show one family row with its box ticked", hold: 5, do: () => show(first) });
  },
};
