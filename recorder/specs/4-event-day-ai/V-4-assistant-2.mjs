// V-4-assistant-2 · How to choose the answer language · guides\4-event-day-ai\assistant.md
// Host Riya Sharma, lane 4. Opens the app copy that has AI (port 3410, see _lib.mjs and _ai-on.mjs).
import { AI_APP } from "./_lib.mjs";

export default {
  id: "V-4-assistant-2",
  note: "assistant",
  role: "host",
  start: (seed) => `${AI_APP}${seed.weddingPath}`,

  async run({ page, step, tap, show }) {
    const chat = page.getByRole("dialog", { name: "Assistant" });
    const language = chat.getByRole("combobox", { name: "Answer language" });
    await step({ n: 0, what: "Open the assistant", hold: 6, do: () => tap(page.getByRole("button", { name: "Ask the assistant" })) });
    await step({ n: 1, what: "Tap Answer language", hold: 5, do: () => show(language) });
    await step({
      n: 2,
      what: "Pick Hindi and show the BETA badge",
      hold: 6,
      do: async () => {
        await language.selectOption({ label: "हिन्दी · BETA" });
        await show(language);
      },
    });
    // The cards are now written in Hindi too, so the robot taps the first one (the next function).
    await step({ n: 3, what: "Tap the first card, now in Hindi", hold: 5, do: () => tap(chat.getByRole("group").getByRole("button").first()) });
    await step({ n: "end", what: "Show the answer in Hindi", hold: 5, do: () => show(chat.getByRole("log", { name: "Assistant" })) });
  },
};
