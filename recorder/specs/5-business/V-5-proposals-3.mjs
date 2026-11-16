// V-5-proposals-3 · How your client accepts or declines · guides\5-business\proposals.md
// Meera Shah (made up) signs up and confirms by email off camera, then opens the proposal link.
import { clientSignUpOffCamera, freshClientEmail, sendProposalOffCamera } from "./_lib.mjs";

export default {
  id: "V-5-proposals-3",
  note: "proposals",
  start: () => "/login",
  async setup({ page, seed }) {
    const email = freshClientEmail();
    const link = await sendProposalOffCamera(page, seed, email);
    await clientSignUpOffCamera(page, { email });
    await page.goto(link);
  },

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Open the proposal link and show the page", hold: 5, do: () => show(page.getByRole("heading", { level: 1 }).first()) });
    await step({
      n: 1,
      what: "Scroll to show the sections and the total",
      hold: 5,
      do: () => show(page.getByText("Your total").first()),
    });
    await step({
      n: 2,
      what: "Untick the optional part Extras under Optional parts to include",
      hold: 5,
      do: () => tap(page.getByRole("checkbox").first()),
    });
    await step({ n: 3, what: "Point at Your total", hold: 5, do: () => show(page.getByText("Your total").first()) });
    await step({
      n: 4,
      what: "Type Meera Shah in Type your full name to accept",
      hold: 6,
      do: () => type(page.getByLabel("Type your full name to accept"), "Meera Shah"),
    });
    await step({ n: 5, what: "Click Accept proposal", hold: 5, do: () => tap(page.getByRole("button", { name: "Accept proposal" })) });
    await step({
      n: "end",
      what: "Show Thank you and the button Open your wedding",
      hold: 5,
      do: () => show(page.getByText(/Thank you/).first()),
    });
  },
};
