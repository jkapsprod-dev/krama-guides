// V-4-wrap-up-1 · How to settle every vendor, then track deliverables · guides\4-event-day-ai\wrap-up.md
// Host Riya Sharma, lane 4. Off camera: every function is moved into the past (the last ended 2 days ago),
// so Wrap-up is open.
import { endWedding } from "./_lib.mjs";

export default {
  id: "V-4-wrap-up-1",
  note: "wrap-up",
  role: "host",
  start: (seed) => {
    endWedding(seed, 2);
    return seed.weddingPath;
  },

  async run({ page, step, tap, show }) {
    const vendor = page.getByRole("listitem").filter({ hasText: "Rangoli Decor" });
    await step({ n: 0, what: "Show Home with Open Wrap-up", hold: 5, do: () => show(page.getByRole("link", { name: "Open Wrap-up" })) });
    await step({
      n: 1,
      what: "Tap Open Wrap-up, then Settle vendors",
      hold: 4,
      do: async () => {
        await tap(page.getByRole("link", { name: "Open Wrap-up" }));
        await tap(page.getByRole("link", { name: "1. Settle vendors" }));
      },
    });
    await step({ n: 2, what: "Show Rangoli Decor: Quoted, Paid, Left", hold: 5, do: () => show(vendor) });
    await step({ n: 3, what: "Tap Mark settled", hold: 5, do: () => tap(vendor.getByRole("button", { name: /^Mark settled/ })) });
    await step({ n: 4, what: "Show Settled on the vendor", hold: 3, do: () => show(vendor.getByText(/^Settled/)) });
    await step({
      n: 5,
      what: "Open Deliverables, then tap Wedding album",
      hold: 4,
      do: async () => {
        await tap(page.getByRole("link", { name: "2. Deliverables" }));
        await tap(page.getByRole("button", { name: "Wedding album" }));
      },
    });
    await step({ n: 6, what: "Set a Due date (optional)", hold: 3, do: async () => {
        // A date box takes its whole value at once; the tap shows where it is.
        const due = page.getByRole("textbox", { name: "Due date (optional)" });
        await tap(due);
        await due.fill("2026-12-20");
      },
    });
    await step({ n: 7, what: "Tap Add as a task", hold: 3, do: () => tap(page.getByRole("button", { name: "Add as a task" })) });
    await step({ n: "end", what: "Show Added to your tasks.", hold: 4, do: () => show(page.getByText("Added to your tasks.")) });
  },
};
