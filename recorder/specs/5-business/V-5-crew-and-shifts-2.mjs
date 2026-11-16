// V-5-crew-and-shifts-2 · How to give someone a shift · guides\5-business\crew-and-shifts.md
import { addCrewOffCamera, chooseLike, crewTab } from "./_lib.mjs";

export default {
  id: "V-5-crew-and-shifts-2",
  note: "crew-and-shifts",
  role: "planner",
  start: (seed) => seed.plannerPath,
  // Off camera: Mahesh Parmar is on the crew list (end of V-5-crew-and-shifts-1).
  async setup({ page, seed }) {
    await addCrewOffCamera(page, seed);
  },

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Show the Crew tab", hold: 5 });
    await step({
      n: 1,
      what: "Scroll to Assign to a function",
      hold: 5,
      do: () => show(page.getByRole("heading", { name: "Assign to a function" })),
    });
    await step({
      n: 2,
      what: "Pick Mahesh Parmar in Who and the Haldi function in Which function",
      hold: 9,
      do: async () => {
        await chooseLike(show, page.getByLabel("Who", { exact: true }), "Mahesh");
        await chooseLike(show, page.getByLabel("Which function"), "Haldi");
      },
    });
    await step({
      n: 3,
      what: "Type Tent lead in Role and Report at 6 am in Note for them",
      hold: 10,
      do: async () => {
        await type(page.getByLabel("Role", { exact: true }), "Tent lead");
        await type(page.getByLabel("Note for them"), "Report at 6 am");
      },
    });
    await step({ n: 4, what: "Click Assign", hold: 5, do: () => tap(page.getByRole("button", { name: "Assign" })) });
    await step({
      n: "end",
      what: "Show Assigned. and the shift under Coming up",
      hold: 5,
      do: () => show(page.getByText("Assigned.").first()),
    });
  },
};
