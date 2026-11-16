// V-2-tickets-from-guests-2 · How to check a ticket and add it to travel · guides\2-guests\tickets-from-guests.md
// Off camera, the host switches tickets on and the demo guest sends a made-up train ticket (a PDF).
import { allowTicketsOffCamera, hostContext, selectContaining, sendTicketOffCamera, stayTab } from "./_lib.mjs";

export default {
  id: "V-2-tickets-from-guests-2",
  note: "tickets-from-guests",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/travel`,
  async setup({ page, seed }) {
    await allowTicketsOffCamera(page, seed);
    const guestCtx = await page.context().browser().newContext({ viewport: { width: 390, height: 844 }, bypassCSP: true, baseURL: "http://127.0.0.1:3400" });
    try {
      await sendTicketOffCamera(await guestCtx.newPage(), seed.guestLinkPath);
    } finally {
      await guestCtx.close();
    }
    await page.goto(`${seed.weddingPath}/stays/travel`);
  },

  async run({ page, step, tap, show }) {
    const line = page.getByRole("link", { name: /ticket.* from guests? to check/i }).first();
    await step({ n: 0, what: "Show the line 1 ticket from guests to check", hold: 5, do: () => show(line) });
    await step({ n: 1, what: "Open the Arrivals & departures tab", hold: 5, do: () => tap(stayTab(page, "Arrivals & departures")) });
    await step({ n: 2, what: "Tap the line 1 ticket from guests to check", hold: 5, do: () => tap(line) });
    await step({ n: 3, what: "Show Flight or train number, Arriving at and Arrival time", hold: 6, do: () => show(page.getByLabel("Flight or train number")) });
    await step({ n: 4, what: "Keep Needs a pickup on and choose Picked up by", hold: 6,
      do: async () => {
        const who = page.getByLabel("Picked up by", { exact: true });
        await tap(who);
        await selectContaining(who, "Kavya Sharma");
      } });
    await step({ n: 5, what: "Tap Confirm into Travel", hold: 5, do: () => tap(page.getByRole("button", { name: "Confirm into Travel" })) });
    await step({ n: "end", what: "Show the message Confirmed. The arrival and pickup are now in Travel.", hold: 5, do: () => show(page.getByText(/^Confirmed\./)) });
  },
};
