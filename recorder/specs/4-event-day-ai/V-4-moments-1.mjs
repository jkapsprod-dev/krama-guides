// V-4-moments-1 · What the moment cards mean · guides\4-event-day-ai\moments.md
// Host Riya Sharma, lane 4. Off camera: the Mehendi finished yesterday, so Home greets Riya with the card
// "That's Mehendi done." (one card a day, and this one comes first).
import { finishedFunction } from "./_lib.mjs";

export default {
  id: "V-4-moments-1",
  note: "moments",
  role: "host",
  start: (seed) => {
    finishedFunction(seed, "Mehendi");
    return seed.weddingPath;
  },

  async run({ page, step, tap, show }) {
    const card = page.getByRole("status").filter({ hasText: "That's Mehendi done." });
    await step({ n: 0, what: "Show Home", hold: 6, do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding", level: 1 })) });
    await step({ n: 1, what: "Show the card That's Mehendi done.", hold: 7, do: () => show(card) });
    await step({ n: 2, what: "Point at See how it went", hold: 5, do: () => show(card.getByRole("link", { name: "See how it went" })) });
    await step({ n: 3, what: "Tap Got it", hold: 5, do: () => tap(card.getByRole("button", { name: "Got it" })) });
    await step({ n: "end", what: "Show Home without the card", hold: 4, do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding", level: 1 })) });
  },
};
