// V-4-seating-3 · How to print seating · guides\4-event-day-ai\seating.md
// Host Riya Sharma, lane 4. Off camera: 12 tables at the Reception with 24 families seated. The page
// itself is the print layout; the robot's browser has no print dialog, so the video stops on the page.
import { addTables, fn, seatFamilies } from "./_lib.mjs";

export default {
  id: "V-4-seating-3",
  note: "seating",
  role: "host",
  start: (seed) => {
    addTables(seed, "Reception", 12, 10);
    seatFamilies(seed, "Reception", 24);
    return `${seed.weddingPath}/events/${fn(seed, "Reception")}/seating`;
  },

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the finished seating", hold: 5, do: () => show(page.getByRole("heading", { name: "Seating · Reception" })) });
    await step({ n: 1, what: "Tap Print seating", hold: 4, do: () => tap(page.getByRole("link", { name: "Print seating" })) });
    await step({
      n: 2,
      what: "Scroll past Table by table and Find your table",
      hold: 6,
      do: async () => {
        await show(page.getByRole("heading", { name: "Table by table" }));
        await show(page.getByRole("heading", { name: "Find your table" }));
      },
    });
    await step({ n: 3, what: "Show Table cards", hold: 5, do: () => show(page.getByRole("heading", { name: "Table cards" })) });
    await step({ n: 4, what: "Tap Print", hold: 4, do: () => tap(page.getByRole("button", { name: "Print", exact: true })) });
    await step({ n: "end", what: "Show the print page", hold: 3, do: () => show(page.getByRole("heading", { name: "Table cards" })) });
  },
};
