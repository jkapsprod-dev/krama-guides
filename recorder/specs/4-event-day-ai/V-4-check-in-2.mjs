// V-4-check-in-2 · How to check a family in, then fix a mistake · guides\4-event-day-ai\check-in.md
// Host Riya Sharma, lane 4. The robot uses Find family: it shows Scan pass but never uses the camera.
import { fn } from "./_lib.mjs";

export default {
  id: "V-4-check-in-2",
  note: "check-in",
  role: "host",
  start: (seed) => `${seed.weddingPath}/events/${fn(seed, "Reception")}`,

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Show the Reception function page", hold: 4, do: () => show(page.getByRole("heading", { name: "Reception", level: 1 })) });
    await step({ n: 1, what: "Tap Open check-in", hold: 3, do: () => tap(page.getByRole("link", { name: "Open check-in" })) });
    await step({
      n: 2,
      what: "Point at Scan pass, then tap Find family",
      hold: 5,
      do: async () => {
        await show(page.getByRole("tab", { name: "Scan pass" }));
        await tap(page.getByRole("tab", { name: "Find family" }));
      },
    });
    await step({ n: 3, what: "Type Mehta under Family name", hold: 3, do: () => type(page.getByRole("textbox", { name: "Family name" }), "Mehta") });
    await step({ n: 4, what: "Tap the Mehta family", hold: 3, do: () => tap(page.getByRole("button", { name: /^Mehta family/ })) });
    await step({ n: 5, what: "Tap One more once", hold: 4, do: () => tap(page.getByRole("button", { name: "One more" })) });
    await step({ n: 6, what: "Tap Check in 3", hold: 3, do: () => tap(page.getByRole("button", { name: /^Check in \d+/ })) });
    await step({ n: 7, what: "Show 3 of 74 arrived", hold: 4, do: () => show(page.getByText(/of 74 arrived/)) });
    await step({ n: 8, what: "Tap Undo next to the Mehta family", hold: 4, do: () => tap(page.getByRole("button", { name: /^Undo/ }).first()) });
    await step({ n: "end", what: "Show the count go down", hold: 4, do: () => show(page.getByText(/of 74 arrived/)) });
  },
};
