// V-5-leads-2 · How to move a lead through the stages · guides\5-business\leads.md
import { openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-leads-2",
  note: "leads",
  role: "planner",
  start: (seed) => planner(seed, "/leads"),

  async run({ page, step, tap, show }) {
    await step({
      n: 0,
      what: "Show the Leads list with Vivek Joshi tagged Contacted",
      hold: 5,
      do: () => show(page.getByRole("link", { name: /Vivek Joshi/ })),
    });
    await step({
      n: 1,
      what: "Click Vivek Joshi",
      hold: 5,
      do: () => tap(page.getByRole("link", { name: /Vivek Joshi/ })),
    });
    await step({
      n: 2,
      what: "Point at the Stage row",
      hold: 4,
      do: () => show(page.getByRole("group", { name: "Stage" })),
    });
    await step({
      n: 3,
      what: "Click Meeting / visit",
      hold: 4,
      do: () => tap(page.getByRole("group", { name: "Stage" }).getByRole("button", { name: "Meeting / visit" })),
    });
    await step({
      n: 4,
      what: "Scroll to Lead history on the right",
      hold: 4,
      do: () => show(page.getByRole("region", { name: "Lead history" })),
    });
    await step({
      n: "end",
      what: "Click All leads and show Vivek's new stage",
      hold: 5,
      do: async () => {
        await tap(page.getByRole("link", { name: "← All leads" }));
        await show(page.getByRole("link", { name: /Vivek Joshi/ }));
      },
    });
  },
};
