// V-2-invite-qr-2 · How to add the people who scanned it · guides\2-guests\invite-qr.md
// Off camera, the QR is switched on and two made-up relatives send their details through its page.
import { guestsMore, makeQrLink, moreItem, navLink, sendDetailsOffCamera } from "./_lib.mjs";

export default {
  id: "V-2-invite-qr-2",
  note: "invite-qr",
  role: "host",
  start: (seed) => seed.weddingPath,
  async setup({ page, seed }) {
    const url = await makeQrLink(page, seed);
    const browser = page.context().browser();
    await sendDetailsOffCamera(browser, url, { name: "Rekha Bua", phone: "98250 70001", side: "Bride's side", city: "Pune" });
    await sendDetailsOffCamera(browser, url, { name: "Gopal Kaka", phone: "98250 70002", side: "Groom's side", city: "Rajkot" });
    await page.goto(seed.weddingPath);
  },

  async run({ page, step, tap, show }) {
    const first = page.getByRole("button", { name: "Add to guest list" }).first();
    const reject = page.getByRole("button", { name: "Reject" }).last();
    await step({ n: 0, what: "Show Home", hold: 5 });
    await step({ n: 1, what: "Open Guests", hold: 4, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap More, then Invite QR", hold: 5,
      do: async () => {
        await tap(guestsMore(page));
        await tap(moreItem(page, "Invite QR"));
      } });
    await step({ n: 3, what: "Scroll to the first request and read it", hold: 5, do: () => show(page.getByText("Rekha Bua").first()) });
    await step({ n: 4, what: "Tap Add to guest list", hold: 5, do: () => tap(first) });
    await step({ n: 5, what: "Show the next request and point at Reject", hold: 5, do: () => show(reject) });
    await step({ n: "end", what: "Show the guest list with the new guest", hold: 5, do: () => show(page.getByRole("heading", { name: /request.* waiting/ })) });
  },
};
