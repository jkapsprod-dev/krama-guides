// V-5-crew-and-shifts-1 · How to add crew · guides\5-business\crew-and-shifts.md
import { choose, crewTab, dialog, openPage, planner } from "./_lib.mjs";

export default {
  id: "V-5-crew-and-shifts-1",
  note: "crew-and-shifts",
  role: "planner",
  start: (seed) => planner(seed),

  async run({ page, step, tap, type, show, phone }) {
    const form = dialog(page);
    await step({ n: 0, what: "Show Crew with no crew yet", hold: 5 });
    await step({
      n: 1,
      what: "Click Calendar, then the Crew tab",
      hold: 7,
      do: async () => {
        await openPage(page, tap, phone, "Calendar");
        await tap(crewTab(page));
      },
    });
    await step({ n: 2, what: "Click Add crew", hold: 4, do: () => tap(page.getByRole("button", { name: "Add crew" })) });
    await step({
      n: 3,
      what: "Type Mahesh Parmar in Name and a made-up number in Phone",
      hold: 9,
      do: async () => {
        await type(form.getByLabel("Name", { exact: true }), "Mahesh Parmar");
        await type(form.getByLabel("Phone", { exact: true }), "98250 20011");
      },
    });
    await step({
      n: 4,
      what: "Pick Freelancer in Type and type Tent and lights in Skills",
      hold: 9,
      do: async () => {
        await choose(show, form.getByLabel("Type", { exact: true }), "Freelancer");
        await type(form.getByLabel("Skills"), "Tent and lights");
      },
    });
    await step({ n: 5, what: "Click Save", hold: 4, do: () => tap(form.getByRole("button", { name: "Save", exact: true })) });
    await step({
      n: "end",
      what: "Show Mahesh Parmar on the crew list",
      hold: 4,
      do: () => show(page.getByText("Mahesh Parmar").first()),
    });
  },
};
