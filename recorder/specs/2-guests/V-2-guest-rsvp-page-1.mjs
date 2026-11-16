// V-2-guest-rsvp-page-1 · How to reply for your family · guides\2-guests\guest-rsvp-page.md
// Guest side: the demo guest link (Mehta family), no sign-in.
import { keepOneFunctionOffCamera } from "./_lib.mjs";

export default {
  id: "V-2-guest-rsvp-page-1",
  note: "guest-rsvp-page",
  start: (seed) => seed.guestLinkPath,
  async setup({ page, seed }) {
    await keepOneFunctionOffCamera(page, seed, "Haldi");
  },

  async run({ page, step, tap, show }) {
    const haldi = page.getByRole("radiogroup", { name: "Haldi" });
    await step({ n: 0, what: "Show the RSVP page", hold: 4 });
    await step({ n: 1, what: "Show the RSVP tab", hold: 4, do: () => show(page.getByRole("navigation", { name: "Wedding pages" }).getByRole("link", { name: "RSVP" })) });
    await step({ n: 2, what: "Tap Going under the haldi", hold: 5, do: () => tap(haldi.getByText("Going", { exact: true })) });
    await step({ n: 3, what: "Tap + beside Guests coming", hold: 5, do: () => tap(page.getByRole("button", { name: /^(\+|Add one|More)/ }).first()) });
    await step({ n: 4, what: "Pick a Meal preference", hold: 5, do: () => tap(page.getByRole("button", { name: "Jain" })) });
    await step({ n: 5, what: "Tap Send our reply", hold: 5, do: () => tap(page.getByRole("button", { name: "Send our reply" })) });
    await step({ n: "end", what: "Show the card You're on the list", hold: 4, do: () => show(page.getByText(/on the list/i).first()) });
  },
};
