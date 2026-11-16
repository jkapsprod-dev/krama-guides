// V-2-stays-and-rooms-2 · How to add rooms · guides\2-guests\stays-and-rooms.md
// Off camera, a new made-up stay with no rooms is added and picked in the Stay box.
import { addStayOffCamera, openStays } from "./_lib.mjs";

export default {
  id: "V-2-stays-and-rooms-2",
  note: "stays-and-rooms",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays`,
  async setup({ page, seed }) {
    await addStayOffCamera(page, seed, { name: "Haveli Heritage Stay" }, `${seed.weddingPath}/stays`);
  },

  async run({ page, step, tap, type, show, phone }) {
    const addRooms = page.locator("summary").filter({ hasText: "Add rooms" });
    await step({ n: 0, what: "Show the Room map with no rooms", hold: 5 });
    await step({ n: 1, what: "Open Stays & Travel", hold: 5, do: () => openStays({ page, tap, phone }) });
    await step({ n: 2, what: "Tap Add rooms under the Room map", hold: 6, do: async () => {
        // With no rooms yet the Add rooms form is already open; only tap it when it is closed.
        const open = await page.locator("details").filter({ has: addRooms }).first().evaluate((e) => e.open);
        if (open) await show(addRooms);
        else await tap(addRooms);
      } });
    await step({ n: 3, what: "Type 101 in From and 110 in To", hold: 5,
      do: async () => {
        await type(page.getByLabel("From", { exact: true }), "101");
        await type(page.getByLabel("To", { exact: true }), "110");
      } });
    await step({ n: 4, what: "Fill Floor, Type and Sleeps", hold: 6,
      do: async () => {
        await type(page.getByLabel("Floor", { exact: true }), "1");
        await type(page.getByLabel("Sleeps", { exact: true }), "3");
      } });
    await step({ n: 5, what: "Tap Add rooms", hold: 5, do: () => tap(page.getByRole("button", { name: "Add rooms", exact: true })) });
    await step({ n: "end", what: "Show the Room map with rooms 101 to 110 marked Free", hold: 5, do: () => show(page.getByRole("region", { name: "Room map" })) });
  },
};
