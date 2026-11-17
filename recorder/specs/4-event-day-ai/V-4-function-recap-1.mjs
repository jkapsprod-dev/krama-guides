// V-4-function-recap-1 · How to see how a function went · guides\4-event-day-ai\function-recap.md
// Host Riya Sharma, lane 4. Off camera: the Mehendi finished yesterday, with ticked run sheet items and
// 8 families checked in, so Home shows the card "That's Mehendi done."
import { finishedFunction } from "./_lib.mjs";

export default {
  id: "V-4-function-recap-1",
  note: "function-recap",
  role: "host",
  start: (seed) => {
    finishedFunction(seed, "Mehendi");
    return seed.weddingPath;
  },

  async run({ page, step, tap, show }) {
    const card = page.getByRole("status").filter({ hasText: "That's Mehendi done." });
    await step({ n: 0, what: "Show Home with the card That's Mehendi done.", hold: 6, do: () => show(card) });
    await step({ n: 1, what: "Tap See how it went", hold: 5, do: () => tap(card.getByRole("link", { name: "See how it went" })) });
    await step({ n: 2, what: "Show Came and the replies", hold: 6, do: async () => {
        const came = page.getByText("Came", { exact: true });
        await came.waitFor({ state: "visible", timeout: 120_000 });
        await show(came);
      },
    });
    await step({ n: 3, what: "Show the Run sheet line and the key moment line", hold: 6, do: () => show(page.getByText(/Bride’s mehndi|Bride's mehndi/)) });
    await step({ n: "end", what: "Show the next function link", hold: 4, do: () => show(page.getByRole("link", { name: /^Next: Haldi/ })) });
  },
};
