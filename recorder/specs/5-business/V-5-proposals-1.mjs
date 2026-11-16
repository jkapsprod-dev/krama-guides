// V-5-proposals-1 · How to build a proposal · guides\5-business\proposals.md
import { openPage, planner, showAny } from "./_lib.mjs";

export default {
  id: "V-5-proposals-1",
  note: "proposals",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, type, show, phone }) {
    await step({ n: 0, what: "Show business Home", hold: 5 });
    await step({
      n: 1,
      what: "Click Proposals & bookings, then click New proposal",
      hold: 7,
      do: async () => {
        await openPage(page, tap, phone, "Proposals & bookings");
        await tap(page.getByRole("button", { name: "New proposal" }).or(page.getByRole("link", { name: "New proposal" })).first());
      },
    });
    await step({
      n: 2,
      what: "Type Haldi and mehndi planning in Proposal title. Type Shah family in Client (family or company). Type hitesh.shah@example.test in Client's email",
      hold: 14,
      do: async () => {
        await type(page.getByLabel("Proposal title", { exact: true }), "Haldi and mehndi planning");
        await type(page.getByLabel("Client (family or company)", { exact: true }), "Shah family");
        await type(page.getByLabel("Client's email", { exact: true }), "hitesh.shah@example.test");
      },
    });
    await step({
      n: 3,
      what: "Type Haldi decor in Section",
      hold: 5,
      do: () => type(page.getByLabel("Section", { exact: true }).first(), "Haldi decor"),
    });
    await step({
      n: 4,
      what: "Type Stage and flower decor in What's included. Type 85000 in Price each (₹)",
      hold: 11,
      do: async () => {
        await type(page.getByLabel("What's included").first(), "Stage and flower decor");
        await type(page.getByLabel("Price each (₹)").first(), "85000");
      },
    });
    await step({ n: 5, what: "Click Add line", hold: 5, do: () => tap(page.getByRole("button", { name: "Add line" })) });
    await step({
      n: 6,
      what: "Point at the box What the family will see",
      hold: 5,
      do: () => show(page.getByText("What the family will see").first()),
    });
    await step({ n: 7, what: "Click Save draft", hold: 5, do: () => tap(page.getByRole("button", { name: "Save draft" })) });
    await step({ n: "end", what: "Show the message Saved.", hold: 5, do: () => showAny(show, page.getByText("Saved."), page.getByRole("button", { name: "Save draft" })) });
  },
};
