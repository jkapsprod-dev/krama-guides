// V-4-wrap-up-2 · How to see the thank-yous still to send, rate your planner, then share the wedding in numbers · guides\4-event-day-ai\wrap-up.md
// Host Riya Sharma, lane 4. Off camera: every function is moved into the past, so Wrap-up is open.
// Utsav Planners is linked to the demo wedding, so the planner feedback step shows.
// The robot never sends a thank-you message: it points at Draft a message and does not tap it.
import { endWedding } from "./_lib.mjs";

export default {
  id: "V-4-wrap-up-2",
  note: "wrap-up",
  role: "host",
  start: (seed) => {
    endWedding(seed, 2);
    return `${seed.weddingPath}/wrap-up?step=thanks`;
  },

  async run({ page, step, tap, type, show }) {
    const bua = page.getByRole("listitem").filter({ hasText: "From Bua ji" });
    await step({ n: 0, what: "Show the Thank-yous step", hold: 5, do: () => show(page.getByRole("heading", { name: "Thank-yous", level: 2 })) });
    await step({ n: 1, what: "Show the thank-you count", hold: 4, do: () => show(page.getByText(/thank-yous? to send$/)) });
    await step({ n: 2, what: "Point at Draft a message on Bua ji's entry", hold: 4, do: () => show(bua.getByRole("button", { name: "Draft a message" })) });
    await step({
      n: 3,
      what: "Open Feedback for your planner, pick 5 out of 5",
      hold: 4,
      do: async () => {
        await tap(page.getByRole("link", { name: "4. Feedback for your planner" }));
        await tap(page.locator("label").filter({ has: page.getByText("5 out of 5", { exact: true }) }));
      },
    });
    await step({ n: 4, what: "Type a short note", hold: 4, do: () => type(page.getByRole("textbox", { name: /^Anything you would like them to know/ }), "Thank you for a calm wedding") });
    await step({ n: 5, what: "Tap Send feedback", hold: 3, do: () => tap(page.getByRole("button", { name: "Send feedback" })) });
    await step({
      n: 6,
      what: "Open Finish, show Your wedding in numbers",
      hold: 5,
      do: async () => {
        await tap(page.getByRole("link", { name: "Finish", exact: true }));
        await show(page.getByRole("region", { name: "Your wedding in numbers" }));
      },
    });
    await step({ n: 7, what: "Tap Share to the family feed", hold: 4, do: () => tap(page.getByRole("button", { name: "Share to the family feed" })) });
    await step({ n: 8, what: "Show the card, tap Post it", hold: 4, do: () => tap(page.getByRole("button", { name: "Post it" })) });
    await step({ n: "end", what: "Show Posted. The family can see it.", hold: 4, do: () => show(page.getByText("Posted. The family can see it.")) });
  },
};
