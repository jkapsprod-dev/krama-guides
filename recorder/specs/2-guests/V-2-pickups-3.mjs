// V-2-pickups-3 · How to move a run that's late · guides\2-guests\pickups.md
// Off camera, a run for the morning flight is added.
import { addRunOffCamera, stayTab } from "./_lib.mjs";

const RUN = { place: "Ahmedabad Airport", date: "2027-02-11", time: "06:30", vehicle: "White Innova", seats: 6, driver: "Kavya Sharma" };

export default {
  id: "V-2-pickups-3",
  note: "pickups",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/pickups`,
  setup: ({ page, seed }) => addRunOffCamera(page, seed, RUN, `${seed.weddingPath}/stays/pickups`),

  async run({ page, step, tap, show }) {
    const late = page.getByText("Running late?", { exact: true }).first();
    await step({ n: 0, what: "Show a run for a flight that is delayed", hold: 5 });
    await step({ n: 1, what: "Open the Pickups tab", hold: 6, do: () => tap(stayTab(page, "Pickups")) });
    await step({ n: 2, what: "Tap Running late? on the run", hold: 6, do: () => tap(late) });
    await step({ n: 3, what: "Type 40 min in How late", hold: 6,
      do: async () => {
        const how = page.getByLabel("How late", { exact: true });
        await tap(how);
        await page.keyboard.type("40 min", { delay: 85 });
      } });
    await step({ n: 4, what: "Tap Move the run", hold: 6, do: () => tap(page.getByRole("button", { name: "Move the run" })) });
    await step({ n: "end", what: "Show Moved. The driver's page shows the new time.", hold: 5, do: () => show(page.getByText(/^Moved\./)) });
  },
};
