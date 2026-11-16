// V-5-getting-around-the-portal-1 · How to use the (+) · phone first
// A computer has no (+) button, so the desktop take uses search to reach the same Actions
// (voiceover\V-5-getting-around-the-portal-1.sizes.json holds the desktop voice and captions).
import { dialog, planner } from "./_lib.mjs";

export default {
  id: "V-5-getting-around-the-portal-1",
  note: "getting-around-the-portal",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, show, phone }) {
    await step({ n: 0, what: "Show business Home on a phone", hold: 5 });
    if (phone) {
      await step({
        n: 1,
        what: "Tap the (+) named Add",
        hold: 6,
        do: () => tap(page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Add", exact: true })),
      });
      await step({
        n: 2,
        what: "Highlight the rows in the sheet",
        hold: 6,
        do: () => show(dialog(page).getByRole("list")),
      });
    } else {
      await step({
        n: 1,
        what: "Click Search pages and actions",
        hold: 6,
        do: () => tap(page.getByRole("button", { name: /Search pages and actions/ })),
      });
      await step({
        n: 2,
        what: "Highlight the Actions in the list",
        hold: 6,
        do: () => show(dialog(page).getByRole("group", { name: "Actions" })),
      });
    }
    await step({
      n: 3,
      what: "Tap Add a lead",
      hold: 5,
      do: () => tap(dialog(page).getByRole(phone ? "link" : "option", { name: "Add a lead", exact: true })),
    });
    await step({ n: "end", what: "Show the new lead form", hold: 4, do: () => page.waitForURL(/\/leads/) });
  },
};
