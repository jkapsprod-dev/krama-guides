// V-4-emergency-card-1 · How to fill in the emergency card, then print the card · guides\4-event-day-ai\emergency-card.md
// Host Riya Sharma, lane 4. Made-up hospital. The robot taps Print; its browser has no print dialog.
import { fn } from "./_lib.mjs";

export default {
  id: "V-4-emergency-card-1",
  note: "emergency-card",
  role: "host",
  start: (seed) => `${seed.weddingPath}/events/${fn(seed, "Sangeet")}`,

  async run({ page, step, tap, type, show }) {
    const form = page.getByRole("form", { name: "Emergency card details" });
    await step({ n: 0, what: "Show the Sangeet function page", hold: 4, do: () => show(page.getByRole("heading", { name: "Sangeet", level: 1 })) });
    await step({ n: 1, what: "Under On the day, tap Open card", hold: 3, do: () => tap(page.getByRole("link", { name: "Open card" })) });
    await step({ n: 2, what: "Scroll to Fill in the card", hold: 3, do: () => show(page.getByRole("heading", { name: "Fill in the card", level: 2 })) });
    await step({
      n: 3,
      what: "Fill in the hospital name and phone",
      hold: 5,
      do: async () => {
        await type(form.getByRole("textbox", { name: "Hospital name" }), "Shalby Care Hospital");
        await type(form.getByRole("textbox", { name: /^Hospital phone/ }), "079 4040 1234");
      },
    });
    await step({
      n: 4,
      what: "Fill in Fire exits and First aid",
      hold: 5,
      do: async () => {
        await type(form.getByRole("textbox", { name: "Fire exits" }), "Two doors behind the stage");
        await type(form.getByRole("textbox", { name: "First aid" }), "Kit at the reception desk");
      },
    });
    await step({ n: 5, what: "Tap Save card", hold: 3, do: () => tap(form.getByRole("button", { name: "Save card" })) });
    await step({ n: 6, what: "Show the filled card", hold: 4, do: () => show(page.getByRole("region", { name: "Nearest hospital" })) });
    await step({ n: 7, what: "Tap Print (A5)", hold: 3, do: () => tap(page.getByRole("link", { name: "Print (A5)" })) });
    await step({ n: 8, what: "Tap Print", hold: 3, do: () => tap(page.getByRole("button", { name: "Print", exact: true })) });
    await step({ n: "end", what: "Show the print page", hold: 4, do: () => show(page.getByRole("button", { name: "Print", exact: true })) });
  },
};
