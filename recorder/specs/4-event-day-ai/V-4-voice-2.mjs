// V-4-voice-2 · How to turn a voice note into tasks or arrivals · guides\4-event-day-ai\voice.md
// Host Riya Sharma, lane 4. Opens the app copy that has AI (port 3410, see _lib.mjs and _ai-on.mjs).
// The robot types the note (the guide says typing works as well as speaking).
import { AI_APP } from "./_lib.mjs";

export default {
  id: "V-4-voice-2",
  note: "voice",
  role: "host",
  start: (seed) => `${AI_APP}${seed.weddingPath}`,

  async run({ page, step, tap, type, show }) {
    const chat = page.getByRole("dialog", { name: "Assistant" });
    await step({ n: 0, what: "Open the assistant", hold: 4, do: () => tap(page.getByRole("button", { name: "Ask the assistant" })) });
    await step({
      n: 1,
      what: "Type Anil Kapoor arrives Friday 6 pm. Call the caterer.",
      hold: 5,
      do: () => type(chat.getByRole("textbox", { name: "Ask about your wedding…" }), "Anil Kapoor arrives Friday 6 pm. Call the caterer."),
    });
    await step({ n: 2, what: "Tap Turn into actions", hold: 4, do: () => tap(chat.getByRole("button", { name: "Turn into actions" })) });
    await step({ n: 3, what: "Show New arrival and New task", hold: 5, do: () => show(chat.getByRole("log", { name: "Assistant" })) });
    await step({ n: 4, what: "Tap Review and save on the arrival", hold: 4, do: () => tap(chat.getByRole("link", { name: /Review and save/ }).first()) });
    await step({ n: 5, what: "Check the form and save", hold: 4, do: () => tap(page.getByRole("button", { name: "Save", exact: true })) });
    await step({ n: "end", what: "Show the saved arrival", hold: 3, do: async () => {
        // After Save the app opens the guest's page, where the arrival is listed.
        const arrival = page.getByRole("listitem").filter({ hasText: /^Arriving ·/ });
        await arrival.waitFor({ state: "visible", timeout: 120_000 });
        await show(arrival);
      },
    });
  },
};
