// V-5-crew-and-shifts-4 · How to give crew a private shift link · guides\5-business\crew-and-shifts.md
import { addCrewOffCamera } from "./_lib.mjs";

export default {
  id: "V-5-crew-and-shifts-4",
  note: "crew-and-shifts",
  role: "planner",
  start: (seed) => seed.plannerPath,
  // Off camera: Mahesh Parmar is on the crew list.
  async setup({ page, seed }) {
    await addCrewOffCamera(page, seed);
  },

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the Crew tab", hold: 5 });
    await step({
      n: 1,
      what: "Click Phone access next to Mahesh Parmar",
      hold: 5,
      do: () => tap(page.getByRole("button", { name: "Phone access" }).first()),
    });
    await step({
      n: 2,
      what: "Point to Private shift link and click Make link",
      hold: 6,
      do: async () => {
        await show(page.getByText("Private shift link").first());
        await tap(page.getByRole("button", { name: "Make link" }));
      },
    });
    await step({ n: 3, what: "Click Copy link", hold: 5, do: () => tap(page.getByRole("button", { name: "Copy link" })) });
    await step({
      n: 4,
      what: "Point to New link and Turn off",
      hold: 5,
      do: () => show(page.getByRole("button", { name: "New link" })),
    });
    await step({
      n: "end",
      what: "Show the link in the box",
      hold: 5,
      do: () => show(page.getByRole("button", { name: "Copy link" })),
    });
  },
};
