// V-5-bookings-1 · How to track a booking · guides\5-business\bookings.md
import { acceptProposalOffCamera, choose, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-bookings-1",
  note: "bookings",
  role: "planner",
  start: (seed) => planner(seed),
  // Off camera: Meera Shah accepts the proposal, so one booking exists.
  async setup({ page, seed }) {
    await acceptProposalOffCamera(page, seed);
    await page.goto(planner(seed));
  },

  async run({ page, step, tap, show, phone }) {
    const status = page.getByLabel("Booking status").first();
    await step({ n: 0, what: "Show the Bookings tab with one booking", hold: 5 });
    await step({
      n: 1,
      what: "Click Proposals & bookings, then click the Bookings tab",
      hold: 7,
      do: async () => {
        await openPage(page, tap, phone, "Proposals & bookings");
        await tap(page.getByRole("link", { name: "Bookings", exact: true }).or(page.getByRole("tab", { name: "Bookings", exact: true })).first());
      },
    });
    await step({ n: 2, what: "Point at the booking and its Confirmed status", hold: 5, do: () => show(status) });
    await step({ n: 3, what: "Open the Booking status list", hold: 5, do: () => show(status) });
    await step({ n: 4, what: "Pick In production", hold: 5, do: () => choose(show, status, "In production") });
    await step({ n: "end", what: "Show the booking with its new status", hold: 5, do: () => show(status) });
  },
};
