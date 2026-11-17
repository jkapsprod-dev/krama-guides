// V-4-assistant-1 · How to ask a quick question, then type your own question · guides\4-event-day-ai\assistant.md
// Host Riya Sharma, lane 4. Opens the app copy that has AI (port 3410, see _lib.mjs and _ai-on.mjs).
import { AI_APP } from "./_lib.mjs";

export default {
  id: "V-4-assistant-1",
  note: "assistant",
  role: "host",
  start: (seed) => `${AI_APP}${seed.weddingPath}`,

  async run({ page, step, tap, type, show }) {
    const chat = page.getByRole("dialog", { name: "Assistant" });
    await step({ n: 0, what: "Show Home on a phone", hold: 5, do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding", level: 1 })) });
    await step({ n: 1, what: "Tap the round Ask the assistant button", hold: 3, do: () => tap(page.getByRole("button", { name: "Ask the assistant" })) });
    await step({ n: 2, what: "Show the cards under Tap to ask", hold: 4, do: () => show(chat.getByRole("group", { name: "Tap to ask" })) });
    await step({ n: 3, what: "Tap Next function", hold: 3, do: () => tap(chat.getByRole("button", { name: "Next function", exact: true })) });
    await step({ n: 4, what: "Show the answer", hold: 3, do: () => show(chat.getByRole("log", { name: "Assistant" })) });
    await step({ n: 5, what: "Tap the box Ask about your wedding…", hold: 3, do: () => tap(chat.getByRole("textbox", { name: "Ask about your wedding…" })) });
    await step({ n: 6, what: "Type How many guests said yes?", hold: 4, do: () => type(chat.getByRole("textbox", { name: "Ask about your wedding…" }), "How many guests said yes?") });
    await step({ n: 7, what: "Tap Send", hold: 3, do: () => tap(chat.getByRole("button", { name: "Send", exact: true })) });
    await step({ n: 8, what: "Show the answer and the count of questions left", hold: 5, do: () => show(chat.getByText(/typed questions left today/)) });
    await step({ n: "end", what: "Show the full chat", hold: 3, do: () => show(chat.getByRole("log", { name: "Assistant" })) });
  },
};
