// V-2-pickups-2 · How to add a run by hand · guides\2-guests\pickups.md
import { selectContaining, stayTab } from "./_lib.mjs";

export default {
  id: "V-2-pickups-2",
  note: "pickups",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/pickups`,

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Show the Pickups tab with No runs yet.", hold: 5 });
    await step({ n: 1, what: "Open the Pickups tab", hold: 5, do: () => tap(stayTab(page, "Pickups")) });
    await step({ n: 2, what: "Tap Add a run", hold: 5, do: () => tap(page.getByRole("link", { name: "Add a run" })) });
    await step({ n: 3, what: "Fill Arrival place, Date and Leaves at", hold: 7,
      do: async () => {
        await type(page.getByLabel("Arrival place", { exact: true }), "Ahmedabad Station");
        const date = page.getByLabel("Date", { exact: true });
        await tap(date);
        await date.fill("2027-02-11");
        const time = page.getByLabel("Leaves at", { exact: true });
        await tap(time);
        await time.fill("05:30");
      } });
    await step({ n: 4, what: "Fill Vehicle and Seats for guests", hold: 5,
      do: async () => {
        await type(page.getByLabel("Vehicle", { exact: true }), "White Innova");
        const seats = page.getByLabel("Seats for guests", { exact: true });
        await tap(seats);
        await seats.fill("6");
      } });
    await step({ n: 5, what: "Choose the Driver", hold: 5,
      do: async () => {
        const driver = page.getByLabel("Driver", { exact: true });
        await tap(driver);
        await selectContaining(driver, "Kavya Sharma");
      } });
    await step({ n: 6, what: "Tap Save run", hold: 5, do: () => tap(page.getByRole("button", { name: "Save run" })) });
    await step({ n: "end", what: "Show the new run on its day", hold: 5, do: () => show(page.getByText("Ahmedabad Station").first()) });
  },
};
