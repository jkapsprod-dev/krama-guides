// V-2-arrivals-and-departures-2 · How to give someone a pickup · guides\2-guests\arrivals-and-departures.md
// Off camera, Chacha's train (Aryan Tiwari) is added without a pickup.
import { addTravelOffCamera, selectContaining, stayTab } from "./_lib.mjs";

const TRAIN = { guest: "Aryan Tiwari", by: "Train", number: "12957", date: "2027-02-11", time: "05:00", from: "Delhi", to: "Ahmedabad" };

export default {
  id: "V-2-arrivals-and-departures-2",
  note: "arrivals-and-departures",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/travel`,
  setup: ({ page, seed }) => addTravelOffCamera(page, seed, TRAIN, `${seed.weddingPath}/stays/travel`),

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show a line with Pickup not assigned", hold: 5 });
    await step({ n: 1, what: "Open the Arrivals & departures tab", hold: 6, do: () => tap(stayTab(page, "Arrivals & departures")) });
    await step({ n: 2, what: "Tap Edit on the guest's line", hold: 6, do: () => tap(page.getByRole("link", { name: "Edit", exact: true }).first()) });
    await step({ n: 3, what: "Switch on Needs a pickup", hold: 6, do: () => tap(page.getByRole("checkbox", { name: "Needs a pickup" })) });
    await step({ n: 4, what: "Choose a name in Picked up by", hold: 6,
      do: async () => {
        const who = page.getByLabel("Picked up by", { exact: true });
        await tap(who);
        await selectContaining(who, "Kavya Sharma");
      } });
    await step({ n: 5, what: "Tap Save", hold: 6, do: () => tap(page.getByRole("button", { name: "Save", exact: true })) });
    await step({ n: "end", what: "Show the line with Pickup: Kavya Sharma", hold: 5, do: () => show(page.getByText(/Kavya Sharma/).first()) });
  },
};
