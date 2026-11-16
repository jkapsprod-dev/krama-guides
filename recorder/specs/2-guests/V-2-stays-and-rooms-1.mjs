// V-2-stays-and-rooms-1 · How to add a hotel or a home · guides\2-guests\stays-and-rooms.md
// The demo wedding already has Hotel Riverfront Residency, so this video adds a new made-up stay.
import { openStays } from "./_lib.mjs";

export default {
  id: "V-2-stays-and-rooms-1",
  note: "stays-and-rooms",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays`,

  async run({ page, step, tap, type, show, phone }) {
    await step({ n: 0, what: "Show the Stays & rooms page", hold: 5 });
    await step({ n: 1, what: "Open Stays & Travel from More", hold: 6, do: () => openStays({ page, tap, phone }) });
    await step({ n: 2, what: "Tap Add a stay", hold: 6, do: () => tap(page.getByRole("link", { name: "Add a stay" })) });
    await step({ n: 3, what: "Tap Name and type Haveli Heritage Stay", hold: 6, do: () => type(page.getByLabel("Name", { exact: true }), "Haveli Heritage Stay") });
    await step({ n: 4, what: "Fill Address, Check-in and Check-out", hold: 6,
      do: async () => {
        await type(page.getByLabel("Address", { exact: true }), "Ashram Road, Ahmedabad");
        const checkIn = page.getByLabel("Check-in", { exact: true });
        await tap(checkIn);
        await checkIn.fill("2027-02-10");
        const checkOut = page.getByLabel("Check-out", { exact: true });
        await tap(checkOut);
        await checkOut.fill("2027-02-15");
      } });
    await step({ n: 5, what: "Tap Save stay", hold: 6, do: () => tap(page.getByRole("button", { name: "Save stay" })) });
    await step({ n: "end", what: "Show the Stays & rooms page with the new stay", hold: 5, do: () => show(page.getByRole("heading", { name: "Stays & rooms" })) });
  },
};
