// V-5-leads-1 · How to add a lead · guides\5-business\leads.md
import { choose, dialog, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-leads-1",
  note: "leads",
  role: "planner", // lane 5, Neha Desai, Utsav Planners (Appendix E)
  start: (seed) => planner(seed),

  async run({ page, step, tap, type, show, phone }) {
    await step({ n: 0, what: "Show business Home", hold: 5 });
    await step({ n: 1, what: "Click Leads in the sidebar", hold: 5, do: () => openPage(page, tap, phone, "Leads") });
    await step({
      n: 2,
      what: "Click Add lead",
      hold: 4,
      do: () => tap(page.getByRole("main").getByRole("button", { name: "Add lead" })),
    });
    const form = dialog(page);
    await step({
      n: 3,
      what: "Type Riddhi Trivedi in Name. Type 98250 40123 in Phone",
      hold: 8,
      do: async () => {
        await type(form.getByLabel("Name", { exact: true }), "Riddhi Trivedi");
        await type(form.getByLabel("Phone", { exact: true }), "98250 40123");
      },
    });
    await step({
      n: 4,
      what: "Pick Instagram in Where did they come from?",
      hold: 4,
      do: () => choose(show, form.getByLabel("Where did they come from?"), "Instagram"),
    });
    await step({
      n: 5,
      what: "Click Add lead",
      hold: 4,
      do: () => tap(form.getByRole("button", { name: "Add lead", exact: true })),
    });
    await step({
      n: "end",
      what: "Show the new lead in the list with the New tag",
      hold: 4,
      do: () => show(page.getByRole("link", { name: /Riddhi Trivedi/ })),
    });
  },
};
