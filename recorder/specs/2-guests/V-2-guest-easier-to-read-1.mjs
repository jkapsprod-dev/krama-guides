// V-2-guest-easier-to-read-1 · How to turn on easier reading, then answer one question at a time · guides\2-guests\guest-easier-to-read.md
// Guest side: the demo guest link. Off camera, the host takes the Mehta family off every function
// except Haldi (Nisha and Rohan), so the easier page asks one question.
import { keepOneFunctionOffCamera } from "./_lib.mjs";

export default {
  id: "V-2-guest-easier-to-read-1",
  note: "guest-easier-to-read",
  start: (seed) => seed.guestLinkPath,
  async setup({ page, seed }) {
    await keepOneFunctionOffCamera(page, seed, "Haldi");
  },

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the normal RSVP page with small text", hold: 4 });
    await step({ n: 1, what: "Show the RSVP page", hold: 3, do: () => show(page.getByRole("heading", { name: "Your RSVP" })) });
    await step({ n: 2, what: "Scroll to the bottom of the RSVP tab", hold: 3, do: () => show(page.getByRole("link", { name: "Easier to read" })) });
    await step({ n: 3, what: "Tap Easier to read", hold: 4, do: () => tap(page.getByRole("link", { name: "Easier to read" })) });
    await step({ n: 4, what: "Tap Yes, we will come", hold: 4, do: () => tap(page.getByRole("radio", { name: "Yes, we will come" })) });
    await step({ n: 5, what: "Tap Next after setting how many", hold: 5, do: () => tap(page.getByRole("button", { name: "Next", exact: true })) });
    await step({ n: 6, what: "Tap one food choice", hold: 3, do: () => tap(page.getByRole("button", { name: /Veg|Jain/ }).first()) });
    await step({ n: 7, what: "Show Check your answers", hold: 4, do: () => show(page.getByRole("heading", { name: "Check your answers" })) });
    await step({ n: 8, what: "Tap Send my answer", hold: 4, do: () => tap(page.getByRole("button", { name: "Send my answer" })) });
    await step({ n: "end", what: "Show the thank-you screen", hold: 4, do: () => show(page.getByRole("heading", { name: /Thank you/ })) });
  },
};
