// V-2-arrivals-and-departures-4 · How to see only your pickups · guides\2-guests\arrivals-and-departures.md
// Off camera, two trains are added: one is Riya Sharma's pickup, the other is Kavya Sharma's.
import { addTravelOffCamera, openStays, stayTab } from "./_lib.mjs";

const TRAINS = [
  { guest: "Aryan Tiwari", by: "Train", number: "12957", date: "2027-02-11", time: "05:00", from: "Delhi", to: "Ahmedabad", pickup: true, pickedUpBy: "Riya Sharma" },
  { guest: "Anil Mishra", by: "Train", number: "12009", date: "2027-02-11", time: "08:30", from: "Mumbai", to: "Ahmedabad", pickup: true, pickedUpBy: "Kavya Sharma" },
];

export default {
  id: "V-2-arrivals-and-departures-4",
  note: "arrivals-and-departures",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/travel`,
  async setup({ page, seed }) {
    await addTravelOffCamera(page, seed, TRAINS[0], `${seed.weddingPath}/stays/travel`);
    await addTravelOffCamera(page, seed, TRAINS[1], `${seed.weddingPath}/stays/travel`);
  },

  async run({ page, step, tap, show, phone }) {
    const filter = page.getByRole("radiogroup", { name: "Show" });
    await step({ n: 0, what: "Show the full Arrivals & departures list", hold: 5 });
    await step({ n: 1, what: "Open Stays & Travel from More", hold: 6, do: () => openStays({ page, tap, phone }) });
    await step({ n: 2, what: "Tap the Arrivals & departures tab", hold: 6, do: () => tap(stayTab(page, "Arrivals & departures")) });
    await step({ n: 3, what: "Find Show", hold: 6, do: () => show(filter) });
    await step({ n: 4, what: "Tap My pickups", hold: 6, do: () => tap(filter.getByRole("radio", { name: "My pickups" })) });
    await step({ n: "end", what: "Show only the lines given to you", hold: 5, do: () => show(filter) });
  },
};
