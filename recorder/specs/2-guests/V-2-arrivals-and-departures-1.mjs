// V-2-arrivals-and-departures-1 · How to add a train or a flight · guides\2-guests\arrivals-and-departures.md
import { openStays, stayTab } from "./_lib.mjs";

export default {
  id: "V-2-arrivals-and-departures-1",
  note: "arrivals-and-departures",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/travel`,

  async run({ page, step, tap, type, show, phone }) {
    await step({ n: 0, what: "Show the Arrivals & departures tab with No travel details yet.", hold: 5 });
    await step({ n: 1, what: "Open Stays & Travel from More", hold: 5, do: () => openStays({ page, tap, phone }) });
    await step({ n: 2, what: "Tap the Arrivals & departures tab", hold: 5, do: () => tap(stayTab(page, "Arrivals & departures")) });
    await step({ n: 3, what: "Tap Add travel", hold: 5, do: () => tap(page.getByRole("link", { name: "Add travel" })) });
    await step({ n: 4, what: "Choose the Guest", hold: 5,
      do: async () => {
        const guest = page.getByLabel("Guest", { exact: true });
        await tap(guest);
        await guest.selectOption({ label: "Aryan Tiwari" });
      } });
    await step({ n: 5, what: "Fill Arriving or leaving, By, Flight / train number, Date and Time", hold: 7,
      do: async () => {
        const by = page.getByLabel("By", { exact: true });
        await tap(by);
        await by.selectOption({ label: "Train" });
        await type(page.getByLabel("Flight / train number", { exact: true }), "12957");
        const date = page.getByLabel("Date", { exact: true });
        await tap(date);
        await date.fill("2027-02-11");
        const time = page.getByLabel("Time", { exact: true });
        await tap(time);
        await time.fill("05:00");
      } });
    await step({ n: 6, what: "Tap Save", hold: 5, do: () => tap(page.getByRole("button", { name: "Save", exact: true })) });
    await step({ n: "end", what: "Show the new line under its day", hold: 5, do: () => show(page.getByText("Aryan Tiwari").first()) });
  },
};
