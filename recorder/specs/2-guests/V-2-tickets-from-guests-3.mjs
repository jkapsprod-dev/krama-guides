// V-2-tickets-from-guests-3 · How to send your ticket to the hosts · guides\2-guests\tickets-from-guests.md
// Guest side: the demo guest link. Off camera, the host switches tickets on. The ticket is a made-up PDF.
import { allowTicketsOffCamera, hostContext, makeTicketPdf } from "./_lib.mjs";

export default {
  id: "V-2-tickets-from-guests-3",
  note: "tickets-from-guests",
  start: (seed) => seed.guestLinkPath,
  async setup({ page, seed }) {
    const ctx = await hostContext(page);
    try {
      await allowTicketsOffCamera(await ctx.newPage(), seed);
    } finally {
      await ctx.close();
    }
    await page.goto(seed.guestLinkPath);
  },

  async run({ page, step, tap, show }) {
    const tabs = page.getByRole("navigation", { name: "Wedding pages" });
    await step({ n: 0, what: "Show the guest's RSVP page", hold: 5 });
    await step({ n: 1, what: "Tap the Stay and travel tab", hold: 5, do: () => tap(tabs.getByRole("link", { name: "Stay and travel" })) });
    await step({ n: 2, what: "Tap Choose ticket under Add your ticket and pick the sample ticket", hold: 6,
      do: async () => {
        const chooser = page.waitForEvent("filechooser");
        await tap(page.getByLabel("Choose ticket").or(page.getByText("Choose ticket")).first());
        await (await chooser).setFiles(makeTicketPdf());
      } });
    await step({ n: 3, what: "Show the details Krama read", hold: 6, do: () => show(page.getByLabel("Flight or train number")) });
    await step({ n: 4, what: "Tick who is travelling", hold: 7, do: () => tap(page.getByRole("checkbox").first()) });
    await step({ n: 5, what: "Tap Send to the hosts", hold: 5, do: () => tap(page.getByRole("button", { name: "Send to the hosts" })) });
    await step({ n: "end", what: "Show the message Sent. The hosts will confirm your arrival and pickup.", hold: 5, do: () => show(page.getByText(/^Sent\./)) });
  },
};
