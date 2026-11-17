// V-4-event-day-3 · How to keep working without signal, then end event-day mode · guides\4-event-day-ai\event-day.md
// Host Riya Sharma, lane 4. Off camera: the Sangeet is moved to today with a run sheet. The robot turns
// the browser's network off and on (page.context().setOffline); nothing is sent anywhere.
import { fn, runSheet, todayFunction } from "./_lib.mjs";

export default {
  id: "V-4-event-day-3",
  note: "event-day",
  role: "host",
  start: (seed) => {
    todayFunction(seed, "Sangeet");
    runSheet(seed, "Sangeet", [
      { title: "Welcome drinks", at: 0, dur: 30 },
      { title: "Family performances", at: 30, dur: 60 },
      { title: "Dinner", at: 90, dur: 60 },
    ]);
    return `${seed.weddingPath}/event-day/${fn(seed, "Sangeet")}`;
  },

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the saved strip on Event day", hold: 5, do: () => show(page.getByRole("status").filter({ hasText: "Saved on this phone" })) });
    await step({ n: 1, what: "Turn the network off", hold: 4, do: () => page.context().setOffline(true) });
    await step({ n: 2, what: "Show the Offline strip", hold: 5, do: () => show(page.getByRole("status").filter({ hasText: "Offline" }).first()) });
    await step({
      n: 3,
      what: "Tap Start on a run sheet item",
      hold: 5,
      do: () => tap(page.getByRole("listitem").filter({ hasText: "Welcome drinks" }).getByRole("button", { name: "Start" })),
    });
    await step({ n: 4, what: "Turn the network on", hold: 3, do: () => page.context().setOffline(false) });
    await step({ n: 5, what: "Show the strip say it is saved again", hold: 4, do: () => show(page.getByRole("status").filter({ hasText: "Saved on this phone" })) });
    await step({ n: 6, what: "Scroll to the bottom", hold: 3, do: () => show(page.getByText(/This copy leaves the phone/)) });
    await step({ n: 7, what: "Zoom on the line about when the copy leaves", hold: 4, do: () => show(page.getByText(/This copy leaves the phone/)) });
    await step({
      n: 8,
      what: "Tap End event-day mode on this phone",
      hold: 4,
      do: async () => {
        page.once("dialog", (d) => d.accept()); // only asks if something was not sent yet
        await tap(page.getByRole("button", { name: "End event-day mode on this phone" }));
      },
    });
    await step({ n: "end", what: "Show the message that event-day mode has ended", hold: 4, do: () => show(page.getByRole("heading", { level: 1 })) });
  },
};
