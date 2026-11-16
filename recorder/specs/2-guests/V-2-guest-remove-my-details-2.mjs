// V-2-guest-remove-my-details-2 · How to stop emails · guides\2-guests\guest-remove-my-details.md
// Guest side: the demo guest link. Krama sends no email while recording, so the robot opens the
// stop page the email's last line points to, at the guest link's /unsubscribe address.
export default {
  id: "V-2-guest-remove-my-details-2",
  note: "guest-remove-my-details",
  start: (seed) => seed.guestLinkPath,

  async run({ page, step, tap, show, seed }) {
    await step({ n: 0, what: "Show the RSVP page", hold: 6 });
    await step({ n: 1, what: "Open the stop link from the email", hold: 7, do: () => page.goto(`${seed.guestLinkPath}/unsubscribe`) });
    await step({ n: 2, what: "Tap Stop emails", hold: 6, do: () => tap(page.getByRole("button", { name: "Stop emails" })) });
    await step({ n: "end", what: "Show Done", hold: 7, do: () => show(page.getByText("Done", { exact: true }).first()) });
  },
};
