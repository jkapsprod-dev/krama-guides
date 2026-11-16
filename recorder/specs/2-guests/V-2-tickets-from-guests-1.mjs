// V-2-tickets-from-guests-1 · How to let guests send their tickets · guides\2-guests\tickets-from-guests.md
import { openStays, stayTab } from "./_lib.mjs";

export default {
  id: "V-2-tickets-from-guests-1",
  note: "tickets-from-guests",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/travel`,

  async run({ page, step, tap, show, phone }) {
    const toggle = page.getByRole("switch", { name: "Let guests send their tickets" }).or(page.getByRole("checkbox", { name: "Let guests send their tickets" })).first();
    await step({ n: 0, what: "Show the Arrivals & departures tab with no tickets", hold: 5 });
    await step({ n: 1, what: "Open Stays & Travel from More", hold: 6, do: () => openStays({ page, tap, phone }) });
    await step({ n: 2, what: "Tap the Arrivals & departures tab", hold: 6, do: () => tap(stayTab(page, "Arrivals & departures")) });
    await step({ n: 3, what: "Tap Let guests send their tickets", hold: 7, do: () => tap(page.getByRole("link", { name: "Let guests send their tickets" })) });
    await step({ n: 4, what: "Switch on Let guests send their tickets", hold: 6, do: () => tap(toggle) });
    await step({ n: "end", what: "Show the switch on", hold: 5, do: () => show(toggle) });
  },
};
