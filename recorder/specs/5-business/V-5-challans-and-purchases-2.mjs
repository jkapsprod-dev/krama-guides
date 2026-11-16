// V-5-challans-and-purchases-2 · How to add a purchase bill · guides\5-business\challans-and-purchases.md
import { choose, moneyTab, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-challans-and-purchases-2",
  note: "challans-and-purchases",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, type, show, phone }) {
    const form = page.locator("form").filter({ has: page.getByRole("button", { name: "Save bill" }) });
    await step({ n: 0, what: "Show the Purchases tab with no bills", hold: 5 });
    await step({
      n: 1,
      what: "Click Money in the sidebar, then the Purchases tab",
      hold: 7,
      do: async () => {
        await openPage(page, tap, phone, "Money");
        await tap(moneyTab(page, "Purchases"));
      },
    });
    await step({
      n: 2,
      what: "Type Gulab Flower Mart in Supplier",
      hold: 5,
      do: () => type(form.getByLabel("Supplier", { exact: true }), "Gulab Flower Mart"),
    });
    await step({
      n: 3,
      what: "Type GF-2217 in Bill number",
      hold: 5,
      do: () => type(form.getByLabel("Bill number", { exact: true }), "GF-2217"),
    });
    await step({
      n: 4,
      what: "Type 48500 in Total on the bill (₹). Type 2310 in GST on the bill (₹, optional)",
      hold: 10,
      do: async () => {
        await type(form.getByLabel("Total on the bill (₹)", { exact: true }), "48500");
        await type(form.getByLabel("GST on the bill (₹, optional)"), "2310");
      },
    });
    await step({
      n: 5,
      what: "Pick Materials in What for",
      hold: 5,
      do: () => choose(show, form.getByLabel("What for"), "Materials"),
    });
    await step({ n: 6, what: "Click Save bill", hold: 5, do: () => tap(form.getByRole("button", { name: "Save bill" })) });
    await step({
      n: "end",
      what: "Show the bill in Purchase bills",
      hold: 4,
      do: () => show(page.getByText("Gulab Flower Mart").first()),
    });
  },
};
