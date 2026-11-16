// V-5-getting-around-the-portal-2 · How to search pages and actions
import { dialog, planner } from "./_lib.mjs";

export default {
  id: "V-5-getting-around-the-portal-2",
  note: "getting-around-the-portal",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Show business Home", hold: 5 });
    await step({
      n: 1,
      what: "Click Search pages and actions",
      hold: 5,
      do: () => tap(page.getByRole("button", { name: /Search pages and actions|^Search$/ }).first()),
    });
    await step({
      n: 2,
      what: "Type cal",
      hold: 4,
      do: () => type(dialog(page).getByRole("combobox", { name: "Search pages and actions" }), "cal"),
    });
    await step({
      n: 3,
      what: "Highlight Calendar under Jump to",
      hold: 4,
      do: () => show(dialog(page).getByRole("group", { name: "Jump to" }).getByRole("option", { name: "Calendar" })),
    });
    await step({
      n: 4,
      what: "Click Calendar",
      hold: 4,
      do: () => tap(dialog(page).getByRole("group", { name: "Jump to" }).getByRole("option", { name: "Calendar" })),
    });
    await step({ n: "end", what: "Show the Calendar page", hold: 4, do: () => page.waitForURL(/\/calendar/) });
  },
};
