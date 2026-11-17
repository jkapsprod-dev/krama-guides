// V-4-check-in-1 · How to put a helper on the door · guides\4-event-day-ai\check-in.md
// Host Riya Sharma, lane 4. Kavya Sharma (helper) is a member, so Put on door shows beside her name.
import { fn } from "./_lib.mjs";

export default {
  id: "V-4-check-in-1",
  note: "check-in",
  role: "host",
  start: (seed) => `${seed.weddingPath}/events/${fn(seed, "Reception")}`,

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the Reception function page", hold: 6, do: () => show(page.getByRole("heading", { name: "Reception", level: 1 })) });
    await step({
      n: 1,
      what: "Open the Check-in tab",
      hold: 5,
      do: () => tap(page.getByRole("navigation", { name: "This function" }).getByRole("link", { name: "Check-in", exact: true })),
    });
    await step({ n: 2, what: "Scroll to Helpers on the door", hold: 5, do: () => show(page.getByRole("heading", { name: "Helpers on the door" })) });
    await step({ n: 3, what: "Tap Put on door next to a helper", hold: 6, do: () => tap(page.getByRole("button", { name: "Put Kavya Sharma on the door" })) });
    await step({ n: "end", what: "Show On the door", hold: 5, do: () => show(page.getByRole("button", { name: /Kavya Sharma/ })) });
  },
};
