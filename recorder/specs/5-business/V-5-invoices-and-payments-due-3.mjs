// V-5-invoices-and-payments-due-3 · How to remind a client who owes you · guides\5-business\invoices-and-payments-due.md
// The robot never opens WhatsApp: the video ends on the Open in WhatsApp button (Jay, 3A).
import { issueInvoiceOffCamera, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-invoices-and-payments-due-3",
  note: "invoices-and-payments-due",
  role: "planner",
  start: (seed) => planner(seed, "/money"),
  // Off camera: one issued invoice to the Sharma family for ₹1,25,000, due 10 days ago.
  async setup({ page, seed }) {
    await issueInvoiceOffCamera(page, seed, { dueDaysAgo: 10 });
    await page.goto(planner(seed));
  },

  async run({ page, step, tap, show, phone }) {
    const overdue = page.getByRole("region", { name: "Overdue" }).or(page.getByText("Overdue").first());
    await step({ n: 0, what: "Show the Due tab with one row under Overdue", hold: 5 });
    await step({ n: 1, what: "Click Money in the sidebar. Due opens", hold: 5, do: () => openPage(page, tap, phone, "Money") });
    await step({ n: 2, what: "Point at the row under Overdue", hold: 5, do: () => show(overdue.first()) });
    await step({
      n: 3,
      what: "Click Prepare a reminder",
      hold: 5,
      do: () => tap(page.getByText("Prepare a reminder").first()),
    });
    await step({
      n: 4,
      what: "Show the message",
      hold: 5,
      do: () => show(page.getByRole("button", { name: "Copy message" })),
    });
    await step({
      n: 5,
      what: "Point to Open in WhatsApp",
      hold: 5,
      do: () => show(page.getByRole("link", { name: "Open in WhatsApp" }).or(page.getByRole("button", { name: "Open in WhatsApp" })).first()),
    });
    await step({ n: "end", what: "Hold on the message", hold: 5 });
  },
};
