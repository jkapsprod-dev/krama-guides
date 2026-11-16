// V-5-clients-1 · How to add a client · guides\5-business\clients.md
import { choose, dialog, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-clients-1",
  note: "clients",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, type, show, phone }) {
    await step({ n: 0, what: "Show business Home", hold: 5 });
    await step({ n: 1, what: "Click Clients in the sidebar", hold: 5, do: () => openPage(page, tap, phone, "Clients") });
    await step({
      n: 2,
      what: "Click Add client",
      hold: 4,
      do: () => tap(page.getByRole("main").getByRole("button", { name: "Add client" })),
    });
    const form = dialog(page);
    await step({
      n: 3,
      what: "Type Shah family in Family or company name",
      hold: 5,
      do: () => type(form.getByLabel("Family or company name", { exact: true }), "Shah family"),
    });
    await step({
      n: 4,
      what: "Pick Family in Type",
      hold: 4,
      do: () => choose(show, form.getByLabel("Type", { exact: true }), "Family"),
    });
    await step({
      n: 5,
      what: "Click Add client",
      hold: 4,
      do: () => tap(form.getByRole("button", { name: "Add client", exact: true })),
    });
    await step({
      n: "end",
      what: "Show the Shah family's page",
      hold: 4,
      do: () => show(page.getByRole("heading", { name: "Shah family", level: 1 })),
    });
  },
};
