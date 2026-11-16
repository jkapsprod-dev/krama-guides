// V-5-invoices-and-payments-due-2 · How to log a payment · guides\5-business\invoices-and-payments-due.md
import { issueInvoiceOffCamera, moneyTab, planner } from "./_lib.mjs";

export default {
  id: "V-5-invoices-and-payments-due-2",
  note: "invoices-and-payments-due",
  role: "planner",
  start: (seed) => planner(seed, "/money"),
  // Off camera: one issued invoice to the Sharma family for ₹1,25,000.
  async setup({ page, seed }) {
    await issueInvoiceOffCamera(page, seed);
    await page.goto(planner(seed, "/money"));
  },

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Show the Invoices list with one issued invoice", hold: 5 });
    await step({ n: 1, what: "Click the Invoices tab under Money", hold: 5, do: () => tap(moneyTab(page, "Invoices")) });
    await step({
      n: 2,
      what: "Click the invoice for Sharma family",
      hold: 5,
      do: () => tap(page.getByRole("main").getByRole("link", { name: /Sharma family/ }).first()),
    });
    await step({
      n: 3,
      what: "Scroll to Payments",
      hold: 5,
      do: () => show(page.getByRole("heading", { name: "Payments" })),
    });
    await step({
      n: 4,
      what: "Type 50000 in Amount received (₹)",
      hold: 5,
      do: () => type(page.getByLabel("Amount received (₹)"), "50000"),
    });
    await step({ n: 5, what: "Click Log payment", hold: 5, do: () => tap(page.getByRole("button", { name: "Log payment" })) });
    await step({
      n: "end",
      what: "Show Still to pay at ₹75,000",
      hold: 5,
      do: () => show(page.getByText(/Still to pay/).first()),
    });
  },
};
