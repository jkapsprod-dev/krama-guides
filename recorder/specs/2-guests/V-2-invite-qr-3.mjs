// V-2-invite-qr-3 · How to send your details · guides\2-guests\invite-qr.md
// Guest side, no sign-in. Off camera, the host's invite QR is switched on and its address is opened.
import { hostContext, makeQrLink } from "./_lib.mjs";

export default {
  id: "V-2-invite-qr-3",
  note: "invite-qr",
  start: (seed) => seed.guestLinkPath, // replaced by the sign-up page in setup
  async setup({ page, seed }) {
    const ctx = await hostContext(page);
    try {
      const host = await ctx.newPage();
      const url = await makeQrLink(host, seed);
      await page.goto(url);
    } finally {
      await ctx.close();
    }
  },

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Show the sign-up page the QR opens", hold: 5 });
    await step({ n: 1, what: "Show the page the QR link opens", hold: 4, do: () => show(page.getByLabel("Your name", { exact: true })) });
    await step({ n: 2, what: "Type a made-up name in Your name", hold: 5, do: () => type(page.getByLabel("Your name", { exact: true }), "Rekha Bua") });
    await step({ n: 3, what: "Type a made-up number in Phone number", hold: 5, do: () => type(page.getByLabel("Phone number", { exact: true }), "98250 70001") });
    await step({ n: 4, what: "Pick Which side are you from?", hold: 4,
      do: async () => {
        const side = page.getByLabel("Which side are you from?");
        await tap(side);
        await side.selectOption({ label: "Bride's side" });
      } });
    await step({ n: 5, what: "Tap Send my details", hold: 5, do: () => tap(page.getByRole("button", { name: "Send my details" })) });
    await step({ n: "end", what: "Show Thank you", hold: 5, do: () => show(page.getByText("Thank you").first()) });
  },
};
