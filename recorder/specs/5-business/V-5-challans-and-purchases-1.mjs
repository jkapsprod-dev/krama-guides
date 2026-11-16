// V-5-challans-and-purchases-1 · How to make a delivery challan (vendor) · guides\5-business\challans-and-purchases.md
import { choose, moneyTab, openPage, vendor } from "./_lib.mjs";

export default {
  id: "V-5-challans-and-purchases-1",
  note: "challans-and-purchases",
  role: "vendor",
  start: (seed) => vendor(seed),

  async run({ page, step, tap, type, show, phone }) {
    await step({ n: 0, what: "Show the Challans tab with an empty list", hold: 5 });
    await step({
      n: 1,
      what: "Click Money in the sidebar, then the Challans tab",
      hold: 7,
      do: async () => {
        await openPage(page, tap, phone, "Money");
        await tap(moneyTab(page, "Challans"));
      },
    });
    await step({
      n: 2,
      what: "Click New challan",
      hold: 4,
      do: () => tap(page.getByRole("button", { name: "New challan" }).or(page.getByRole("link", { name: "New challan" })).first()),
    });
    await step({
      n: 3,
      what: "Type Hotel Riverfront Residency in Going to. Pick 24 Gujarat in State",
      hold: 10,
      do: async () => {
        await type(page.getByLabel("Going to", { exact: true }), "Hotel Riverfront Residency");
        await choose(show, page.getByLabel("State", { exact: true }).first(), "24 Gujarat");
      },
    });
    await step({
      n: 4,
      what: "Type Mandap frames in Description. Type 6 in Qty",
      hold: 9,
      do: async () => {
        await type(page.getByLabel("Description").first(), "Mandap frames");
        await type(page.getByLabel("Qty").first(), "6");
      },
    });
    await step({
      n: 5,
      what: "Type GJ 01 AB 1234 in Vehicle number",
      hold: 6,
      do: () => type(page.getByLabel("Vehicle number"), "GJ 01 AB 1234"),
    });
    await step({ n: 6, what: "Click Issue challan", hold: 5, do: () => tap(page.getByRole("button", { name: "Issue challan" })) });
    await step({
      n: "end",
      what: "Show the issued challan with its number",
      hold: 4,
      do: () => show(page.getByRole("main").getByRole("heading", { level: 1 })),
    });
  },
};
