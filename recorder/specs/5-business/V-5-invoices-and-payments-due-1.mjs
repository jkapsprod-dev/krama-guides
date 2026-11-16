// V-5-invoices-and-payments-due-1 · How to raise an invoice · guides\5-business\invoices-and-payments-due.md
import { billingDetailsOffCamera, choose, moneyTab, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-invoices-and-payments-due-1",
  note: "invoices-and-payments-due",
  role: "planner",
  start: (seed) => planner(seed),
  // Off camera: the business's GST and bank details are saved, so an invoice can be issued.
  async setup({ page, seed }) {
    await billingDetailsOffCamera(page, seed);
    await page.goto(planner(seed));
  },

  async run({ page, step, tap, type, show, phone }) {
    await step({ n: 0, what: "Show the Money page with an empty Invoices list", hold: 5 });
    await step({ n: 1, what: "Click Money in the sidebar", hold: 5, do: () => openPage(page, tap, phone, "Money") });
    await step({ n: 2, what: "Click the Invoices tab", hold: 4, do: () => tap(moneyTab(page, "Invoices")) });
    await step({ n: 3, what: "Click New invoice", hold: 4, do: () => tap(page.getByRole("button", { name: "New invoice" }).or(page.getByRole("link", { name: "New invoice" })).first()) });
    await step({
      n: 4,
      what: "Type Sharma family in Name. Pick 24 Gujarat in State (place of supply)",
      hold: 9,
      do: async () => {
        await type(page.getByLabel("Name", { exact: true }).first(), "Sharma family");
        await choose(show, page.getByLabel("State (place of supply)"), "24 Gujarat");
      },
    });
    await step({
      n: 5,
      what: "Type Planning fee, advance in Description. Type 125000 in Rate (₹)",
      hold: 10,
      do: async () => {
        await type(page.getByLabel("Description").first(), "Planning fee, advance");
        await type(page.getByLabel("Rate (₹)").first(), "125000");
      },
    });
    await step({ n: 6, what: "Click Issue invoice", hold: 5, do: () => tap(page.getByRole("button", { name: "Issue invoice" })) });
    await step({
      n: "end",
      what: "Show the issued invoice with its number",
      hold: 4,
      do: () => show(page.getByRole("main").getByRole("heading", { level: 1 })),
    });
  },
};
