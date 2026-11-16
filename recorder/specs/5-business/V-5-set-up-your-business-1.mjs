// V-5-set-up-your-business-1 · How to set up a planner or vendor business · guides\5-business\set-up-your-business.md
// Riya (host) has a wedding and no business yet, so she sees "Run a wedding business?" and the form.
// (A planner who already has a business is sent straight to it, so Neha can't show this form.)
export default {
  id: "V-5-set-up-your-business-1",
  note: "set-up-your-business",
  role: "host",
  start: () => "/w?all=1",

  async run({ page, step, tap, type, show }) {
    await step({
      n: 0,
      what: "Show Your weddings, scrolled to the bottom",
      hold: 5,
      do: () => show(page.getByText("Run a wedding business?")),
    });
    await step({
      n: 1,
      what: "Click Set up your business",
      hold: 4,
      do: () => tap(page.getByRole("link", { name: "Set up your business" })),
    });
    await step({
      n: 2,
      what: "Choose Wedding planner under What kind of business?",
      hold: 4,
      do: () =>
        tap(page.getByRole("group", { name: "What kind of business?" }).getByText("Wedding planner", { exact: true }).filter({ visible: true }).first()),
    });
    await step({
      n: 3,
      what: "Type Desai Weddings in Business name",
      hold: 4,
      do: () => type(page.getByLabel("Business name", { exact: true }), "Desai Weddings"),
    });
    await step({
      n: 4,
      what: "Type Ahmedabad in City (optional)",
      hold: 4,
      do: () => type(page.getByLabel("City (optional)", { exact: true }), "Ahmedabad"),
    });
    await step({
      n: 5,
      what: "Click Set up business",
      hold: 4,
      do: () => tap(page.getByRole("button", { name: "Set up business", exact: true })),
    });
    await step({
      n: "end",
      what: "Show the new business Home",
      hold: 4,
      do: () => show(page.getByText(/^Good (morning|afternoon|evening)/).filter({ visible: true }).first()),
    });
  },
};
