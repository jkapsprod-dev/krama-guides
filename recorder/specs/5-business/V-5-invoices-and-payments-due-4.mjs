// V-5-invoices-and-payments-due-4 · How to add your GST and bank details · guides\5-business\invoices-and-payments-due.md
import { choose, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-invoices-and-payments-due-4",
  note: "invoices-and-payments-due",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, type, show, phone }) {
    const box = page.getByRole("region", { name: "Billing details" });
    await step({ n: 0, what: "Show business Home", hold: 5 });
    await step({ n: 1, what: "Click Settings in the sidebar", hold: 5, do: () => openPage(page, tap, phone, "Settings") });
    await step({ n: 2, what: "Scroll to Billing details", hold: 5, do: () => show(box) });
    await step({
      n: 3,
      what: "Type 24ABCDE1234F1Z6 in GSTIN. Pick 24 Gujarat in State",
      hold: 10,
      do: async () => {
        await type(box.getByLabel("GSTIN", { exact: true }), "24ABCDE1234F1Z6");
        await choose(show, box.getByLabel("State", { exact: true }), "24 Gujarat");
      },
    });
    await step({
      n: 4,
      what: "Type utsavplanners@okbank in UPI ID",
      hold: 7,
      do: () => type(box.getByLabel("UPI ID"), "utsavplanners@okbank"),
    });
    await step({
      n: 5,
      what: "Click Save billing details",
      hold: 5,
      do: () => tap(box.getByRole("button", { name: "Save billing details" })),
    });
    await step({ n: "end", what: "Show Saved.", hold: 5, do: () => show(box.getByText("Saved.").first()) });
  },
};
