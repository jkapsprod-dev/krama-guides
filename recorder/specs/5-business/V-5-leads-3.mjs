// V-5-leads-3 · How to note a call or a meeting, then turn a lead into a client · guides\5-business\leads.md
import { choose, planner } from "./_lib.mjs";

export default {
  id: "V-5-leads-3",
  note: "leads",
  role: "planner",
  // Off camera: open Vivek Joshi's lead page.
  start: (seed) => planner(seed, "/leads"),
  async setup({ page }) {
    await page.getByRole("link", { name: /Vivek Joshi/ }).click();
    await page.waitForURL(/\/leads\/[0-9a-f-]{36}/);
  },

  async run({ page, step, tap, type, show }) {
    const notes = page.getByRole("heading", { name: "Notes and calls" });
    await step({ n: 0, what: "Show Vivek Joshi's lead page", hold: 5 });
    await step({ n: 1, what: "Scroll to Notes and calls", hold: 4, do: () => show(notes) });
    await step({
      n: 2,
      what: "Type Wants haldi in a garden, 150 guests in Add a note",
      hold: 5,
      do: () => type(page.getByLabel("Add a note", { exact: true }), "Wants haldi in a garden, 150 guests"),
    });
    await step({
      n: 3,
      what: "Pick Call in Type",
      hold: 4,
      do: () => choose(show, page.getByRole("combobox", { name: "Type" }), "Call"),
    });
    await step({
      n: 4,
      what: "Click Add note",
      hold: 4,
      do: () => tap(page.getByRole("button", { name: "Add note" })),
    });
    await step({
      n: 5,
      what: "Show the note at the top of the list with the date",
      hold: 5,
      do: () => show(page.getByText("Wants haldi in a garden, 150 guests").first()),
    });
    await step({
      n: 6,
      what: "Click Make a client",
      hold: 5,
      do: () => tap(page.getByRole("button", { name: "Make a client" })),
    });
    await step({
      n: 7,
      what: "Show the client page with the People section",
      hold: 5,
      do: () => show(page.getByRole("heading", { name: "People" })),
    });
    await step({
      n: 8,
      what: "Point at the Decides tag",
      hold: 4,
      do: () => show(page.getByText("Decides", { exact: true }).first()),
    });
    await step({ n: "end", what: "Show the client page", hold: 4 });
  },
};
