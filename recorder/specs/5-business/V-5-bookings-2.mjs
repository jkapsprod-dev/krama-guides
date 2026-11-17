// V-5-bookings-2 · How to set a payment schedule, then raise an invoice from the schedule · guides\5-business\bookings.md
import { acceptProposalOffCamera, billingDetailsOffCamera, choose, planner } from "./_lib.mjs";

export default {
  id: "V-5-bookings-2",
  note: "bookings",
  role: "planner",
  start: (seed) => planner(seed, "/proposals"),
  // Off camera: Meera Shah accepts the proposal (the booking), and billing details are saved so an invoice can be raised.
  async setup({ page, seed }) {
    await billingDetailsOffCamera(page, seed);
    await acceptProposalOffCamera(page, seed);
    await page.goto(planner(seed, "/proposals"));
    await page.getByRole("link", { name: "Bookings", exact: true }).or(page.getByRole("tab", { name: "Bookings", exact: true })).first().click();
  },

  async run({ page, step, tap, type, show }) {
    const due = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10);
    await step({ n: 0, what: "Show the Bookings tab", hold: 5 });
    await step({
      n: 1,
      what: "Click the booking's name",
      hold: 5,
      do: () => tap(page.getByRole("main").getByRole("link", { name: /Meera Shah|Proposal for/ }).first()),
    });
    await step({ n: 2, what: "Scroll to Payment schedule", hold: 5, do: () => show(page.getByRole("heading", { name: "Payment schedule" })) });
    await step({
      n: 3,
      what: "Pick Advance in Type. Type Advance in Name",
      hold: 9,
      do: async () => {
        await choose(show, page.getByLabel("Type", { exact: true }), "Advance");
        await type(page.getByLabel("Name", { exact: true }), "Advance");
      },
    });
    await step({
      n: 4,
      what: "Type 50000 in Amount (₹, incl. GST). Pick a Due date",
      hold: 8,
      do: async () => {
        await type(page.getByLabel("Amount (₹, incl. GST)"), "50000");
        const d = page.getByLabel("Due date", { exact: true });
        await show(d);
        await d.fill(due);
      },
    });
    await step({ n: 5, what: "Click Add to schedule", hold: 5, do: () => tap(page.getByRole("button", { name: "Add to schedule" })) });
    await step({ n: 6, what: "Point at the Not invoiced tag", hold: 5, do: () => show(page.getByText("Not invoiced").first()) });
    await step({ n: 7, what: "Click Raise invoice", hold: 5, do: () => tap(page.getByRole("button", { name: "Raise invoice" }).first()) });
    await step({ n: 8, what: "Show the draft invoice that opens", hold: 5, do: () => show(page.getByRole("main").getByRole("heading", { level: 1 })) });
    await step({ n: "end", what: "Show the draft invoice page", hold: 5 });
  },
};
