// V-2-guest-remove-my-details-1 · How to remove your details · guides\2-guests\guest-remove-my-details.md
// Guest side: the demo guest link. The robot stops after Yes, remove, so only Rohan Mehta (a made-up guest) goes.
export default {
  id: "V-2-guest-remove-my-details-1",
  note: "guest-remove-my-details",
  start: (seed) => seed.guestLinkPath,

  async run({ page, step, tap, show }) {
    const remove = page.getByRole("button", { name: "Remove Rohan Mehta" });
    await step({ n: 0, what: "Show the RSVP page", hold: 5 });
    await step({ n: 1, what: "Scroll down to Remove my details", hold: 6, do: () => show(page.getByRole("heading", { name: "Remove my details" })) });
    await step({ n: 2, what: "Tap the button with the guest's name", hold: 5, do: () => tap(remove) });
    await step({ n: 3, what: "Tap Yes, remove", hold: 5, do: () => tap(page.getByRole("button", { name: "Yes, remove" })) });
    await step({ n: "end", what: "Show the Removed message", hold: 6, do: () => show(page.getByText(/Removed/).first()) });
  },
};
