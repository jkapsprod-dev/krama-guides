// V-2-pickups-1 · How to plan pickup runs · guides\2-guests\pickups.md
// Off camera, three flights are added to land at Ahmedabad airport between 6 and 7 am, each needing a pickup.
import { addTravelOffCamera, openStays, stayTab } from "./_lib.mjs";

const FLIGHTS = [
  { guest: "Aryan Tiwari", by: "Flight", number: "6E 201", date: "2027-02-11", time: "06:10", from: "Delhi", to: "Ahmedabad Airport", pickup: true },
  { guest: "Anil Mishra", by: "Flight", number: "AI 441", date: "2027-02-11", time: "06:35", from: "Mumbai", to: "Ahmedabad Airport", pickup: true },
  { guest: "Nisha Desai", by: "Flight", number: "SG 718", date: "2027-02-11", time: "06:50", from: "Pune", to: "Ahmedabad Airport", pickup: true },
];

export default {
  id: "V-2-pickups-1",
  note: "pickups",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/pickups`,
  async setup({ page, seed }) {
    for (const f of FLIGHTS) await addTravelOffCamera(page, seed, f, `${seed.weddingPath}/stays/pickups`);
  },

  async run({ page, step, tap, type, show, phone }) {
    const window = page.getByLabel("Time window (minutes)", { exact: false });
    await step({ n: 0, what: "Show the Pickups tab with the text 3 arrivals aren't in a run yet.", hold: 5 });
    await step({ n: 1, what: "Open Stays & Travel from More", hold: 5, do: () => openStays({ page, tap, phone }) });
    await step({ n: 2, what: "Tap the Pickups tab", hold: 5, do: () => tap(stayTab(page, "Pickups")) });
    await step({ n: 3, what: "Set Time window (minutes)", hold: 5,
      do: async () => {
        await tap(window);
        await window.fill("60");
      } });
    await step({ n: 4, what: "Tap Suggest runs", hold: 5, do: () => tap(page.getByRole("button", { name: "Suggest runs" })) });
    await step({ n: 5, what: "Show the Suggested runs", hold: 6, do: () => show(page.getByText("Suggested runs").first()) });
    await step({ n: 6, what: "Tap Make these runs", hold: 5, do: () => tap(page.getByRole("button", { name: "Make these runs" })) });
    await step({ n: "end", what: "Show the new run with its guests", hold: 5, do: () => show(page.getByText("Ahmedabad Airport").first()) });
  },
};
