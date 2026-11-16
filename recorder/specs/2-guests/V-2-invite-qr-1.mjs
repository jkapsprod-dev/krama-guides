// V-2-invite-qr-1 · How to make an invite QR · guides\2-guests\invite-qr.md
import { guestsMore, moreItem, navLink } from "./_lib.mjs";

export default {
  id: "V-2-invite-qr-1",
  note: "invite-qr",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show }) {
    const qr = page.getByRole("img", { name: /QR/ });
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 4, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap More, then Invite QR", hold: 5,
      do: async () => {
        await tap(guestsMore(page));
        await tap(moreItem(page, "Invite QR"));
      } });
    await step({ n: 3, what: "Tap Create the QR", hold: 5, do: () => tap(page.getByRole("button", { name: "Create the QR" })) });
    await step({ n: 4, what: "Show the QR, then tap Print", hold: 5,
      do: async () => {
        await show(qr);
        await tap(page.getByRole("button", { name: "Print", exact: true }));
      } });
    await step({ n: 5, what: "Point at Copy link", hold: 5, do: () => show(page.getByRole("button", { name: "Copy link" })) });
    await step({ n: "end", what: "Show the QR", hold: 5, do: () => show(qr) });
  },
};
