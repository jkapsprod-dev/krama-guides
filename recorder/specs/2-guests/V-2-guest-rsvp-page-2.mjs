// V-2-guest-rsvp-page-2 · How to see the schedule and add it to your calendar · guides\2-guests\guest-rsvp-page.md
// Guest side: the demo guest link, no sign-in.
export default {
  id: "V-2-guest-rsvp-page-2",
  note: "guest-rsvp-page",
  start: (seed) => seed.guestLinkPath,

  async run({ page, step, tap, show }) {
    const tabs = page.getByRole("navigation", { name: "Wedding pages" });
    await step({ n: 0, what: "Show the RSVP tab with the schedule not yet open", hold: 4 });
    await step({ n: 1, what: "Show the page", hold: 5, do: () => show(tabs) });
    await step({ n: 2, what: "Tap Schedule", hold: 5, do: () => tap(tabs.getByRole("link", { name: "Schedule" })) });
    await step({ n: 3, what: "Tap Add all my functions", hold: 6,
      do: async () => {
        const download = page.waitForEvent("download", { timeout: 15_000 }).catch(() => null);
        await tap(page.getByRole("link", { name: "Add all my functions" }));
        await download;
      } });
    await step({ n: 4, what: "Point at Google Calendar on one function", hold: 6, do: () => show(page.getByRole("link", { name: "Add Haldi to Google Calendar" })) });
    await step({ n: "end", what: "Show the schedule", hold: 5, do: () => show(page.getByRole("heading", { name: "Schedule" })) });
  },
};
