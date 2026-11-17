// V-4-voice-1 · How to speak instead of typing, then say a command to the assistant · guides\4-event-day-ai\voice.md
// Host Riya Sharma, lane 4. Opens the app copy that has AI (port 3410, see _lib.mjs and _ai-on.mjs).
// The robot's browser has no microphone: a pretend one gives a quiet clip (FAKE_MIC), and the stand-in AI
// "hears" the sentences queued here. Off camera the page is loaded again so the pretend microphone is in place.
import { AI_APP, FAKE_MIC, saySoon } from "./_lib.mjs";

export default {
  id: "V-4-voice-1",
  note: "voice",
  role: "host",
  start: (seed) => `${AI_APP}${seed.weddingPath}`,
  setup: async ({ page }) => {
    await saySoon("How many guests are coming?", "Open Money");
    await page.context().addInitScript(FAKE_MIC);
    await page.reload();
  },

  async run({ page, step, tap, show }) {
    const chat = page.getByRole("dialog", { name: "Assistant" });
    const mic = chat.getByRole("button", { name: /^Speak instead of typing/ });
    await step({ n: 0, what: "Open the assistant", hold: 5, do: () => tap(page.getByRole("button", { name: "Ask the assistant" })) });
    await step({ n: 1, what: "Tap the microphone", hold: 3, do: () => tap(mic) });
    await step({ n: 2, what: "Show Listening… tap again to stop", hold: 4, do: () => show(chat.getByText(/Listening/)) });
    await step({
      n: 3,
      what: "Show Writing down what you said…",
      hold: 4,
      do: async () => {
        await tap(chat.getByRole("button", { name: "Stop recording" }));
        await show(chat.getByText(/Writing down what you said/));
      },
    });
    await step({
      n: 4,
      what: "Show the text in the box, tap Send",
      hold: 3,
      do: async () => {
        await show(chat.getByRole("textbox", { name: "Ask about your wedding…" }));
        await tap(chat.getByRole("button", { name: "Send", exact: true }));
      },
    });
    await step({ n: 5, what: "Show the answer", hold: 3, do: () => show(chat.getByRole("log", { name: "Assistant" })) });
    await step({
      n: 6,
      what: "Speak Open Money through the clip",
      hold: 3,
      do: async () => {
        await tap(mic);
        await tap(chat.getByRole("button", { name: "Stop recording" }));
        await show(chat.getByRole("textbox", { name: "Ask about your wedding…" }));
      },
    });
    await step({ n: 7, what: "Tap Send", hold: 3, do: () => tap(chat.getByRole("button", { name: "Send", exact: true })) });
    await step({ n: 8, what: "Tap the link in the answer", hold: 3, do: () => tap(chat.getByRole("link", { name: "Open Money" })) });
    await step({ n: "end", what: "Show the Money screen", hold: 4, do: () => show(page.getByRole("heading", { level: 1 })) });
  },
};
