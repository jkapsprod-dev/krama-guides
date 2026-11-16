// V-5-clients-2 · How to add the people who decide and pay · guides\5-business\clients.md
import { choose, dialog, planner } from "./_lib.mjs";

export default {
  id: "V-5-clients-2",
  note: "clients",
  role: "planner",
  start: (seed) => planner(seed, "/clients"),
  // Off camera: add the Shah family (end of V-5-clients-1) and open its page.
  async setup({ page }) {
    await page.getByRole("main").getByRole("button", { name: "Add client" }).click();
    const form = dialog(page);
    await form.getByLabel("Family or company name", { exact: true }).fill("Shah family");
    await choose(async () => {}, form.getByLabel("Type", { exact: true }), "Family");
    await form.getByRole("button", { name: "Add client", exact: true }).click();
    await page.getByRole("heading", { name: "Shah family", level: 1 }).waitFor();
  },

  async run({ page, step, tap, type, show }) {
    const people = page.getByRole("heading", { name: "People" });
    await step({ n: 0, what: "Show the Shah family's page with an empty People section", hold: 5, do: () => show(people) });
    await step({
      n: 1,
      what: "Type Meera Shah in Name and 98250 30003 in Phone",
      hold: 8,
      do: async () => {
        await type(page.getByLabel("Name", { exact: true }), "Meera Shah");
        await type(page.getByLabel("Phone", { exact: true }), "98250 30003");
      },
    });
    await step({ n: 2, what: "Tick Decides", hold: 4, do: () => tap(page.getByLabel("Decides", { exact: true })) });
    await step({ n: 3, what: "Tick Day-of contact", hold: 4, do: () => tap(page.getByLabel("Day-of contact", { exact: true })) });
    await step({ n: 4, what: "Click Add person", hold: 4, do: () => tap(page.getByRole("button", { name: "Add person" })) });
    await step({
      n: 5,
      what: "Type Hitesh Shah in Name, tick Pays, click Add person",
      hold: 9,
      do: async () => {
        await type(page.getByLabel("Name", { exact: true }), "Hitesh Shah");
        await tap(page.getByLabel("Pays", { exact: true }));
        await tap(page.getByRole("button", { name: "Add person" }));
      },
    });
    await step({
      n: "end",
      what: "Show both people with their tags",
      hold: 4,
      do: () => show(page.getByText("Hitesh Shah").first()),
    });
  },
};
