// V-2-arrivals-and-departures-3 · How to mark a guest arrived · guides\2-guests\arrivals-and-departures.md
// Off camera, Chacha's train (Aryan Tiwari) is added with a pickup by Kavya Sharma.
import { addTravelOffCamera, openStays, stayTab } from "./_lib.mjs";

const TRAIN = { guest: "Aryan Tiwari", by: "Train", number: "12957", date: "2027-02-11", time: "05:00", from: "Delhi", to: "Ahmedabad", pickup: true, pickedUpBy: "Kavya Sharma" };

export default {
  id: "V-2-arrivals-and-departures-3",
  note: "arrivals-and-departures",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/travel`,
  setup: ({ page, seed }) => addTravelOffCamera(page, seed, TRAIN, `${seed.weddingPath}/stays/travel`),

  async run({ page, step, tap, show, phone }) {
    const arrived = page.getByRole("button", { name: /^Mark .* arrived$/ }).first();
    await step({ n: 0, what: "Show an arrival line with the Expected button", hold: 5 });
    await step({ n: 1, what: "Open Stays & Travel from More", hold: 6, do: () => openStays({ page, tap, phone }) });
    await step({ n: 2, what: "Tap the Arrivals & departures tab", hold: 6, do: () => tap(stayTab(page, "Arrivals & departures")) });
    await step({ n: 3, what: "Scroll to the guest's line under the right day", hold: 7, do: () => show(arrived) });
    await step({ n: 4, what: "Tap Expected next to the name", hold: 6, do: () => tap(arrived) });
    await step({ n: "end", what: "Show the button now reading Arrived", hold: 5, do: () => show(page.getByRole("button", { name: /arrived/i }).first()) });
  },
};
