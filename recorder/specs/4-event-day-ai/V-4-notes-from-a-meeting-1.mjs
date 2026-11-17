// V-4-notes-from-a-meeting-1 · How to turn meeting notes into minutes and tasks · guides\4-event-day-ai\notes-from-a-meeting.md
// Host Riya Sharma, lane 4. Opens the app copy that has AI (port 3410, see _lib.mjs and _ai-on.mjs).
// The robot pastes a short made-up note (all of it at once, as a paste is).
import { AI_APP } from "./_lib.mjs";

const NOTES =
  "Met the caterer today about the sangeet menu. We agreed on 300 plates for the sangeet. " +
  "The live chaat counter will be near the stage. Kavya will confirm the tent by Friday. " +
  "Riya will send the final guest count by Monday. Neha will share the decor plan by next week.";

export default {
  id: "V-4-notes-from-a-meeting-1",
  note: "notes-from-a-meeting",
  role: "host",
  start: (seed) => `${AI_APP}${seed.weddingPath}/tasks`,

  async run({ page, step, tap, type, show }) {
    await step({ n: 0, what: "Show the Tasks screen", hold: 4, do: () => show(page.getByRole("heading", { name: "Tasks", level: 1 })) });
    await step({ n: 1, what: "Tap From a meeting", hold: 3, do: () => tap(page.getByRole("link", { name: /^From a meeting/ })) });
    await step({ n: 2, what: "Type Caterer call under Meeting", hold: 4, do: () => type(page.getByRole("textbox", { name: "Meeting", exact: true }), "Caterer call") });
    await step({
      n: 3,
      what: "Paste the notes under Notes",
      hold: 5,
      do: async () => {
        const notes = page.getByRole("textbox", { name: "Notes", exact: true });
        await tap(notes);
        await notes.fill(NOTES);
      },
    });
    await step({ n: 4, what: "Tap Make minutes and tasks", hold: 4, do: () => tap(page.getByRole("button", { name: /^Make minutes and tasks/ })) });
    await step({ n: 5, what: "Show Minutes and Tasks", hold: 6, do: () => show(page.getByRole("group", { name: "Tasks" })) });
    await step({ n: 6, what: "Untick one task", hold: 4, do: () => tap(page.getByRole("checkbox", { name: "Add this task Share the decor plan" })) });
    await step({ n: 7, what: "Tap Save minutes and tasks", hold: 4, do: () => tap(page.getByRole("button", { name: /^Save minutes and tasks/ })) });
    await step({ n: "end", what: "Show Minutes saved with 2 tasks.", hold: 3, do: () => show(page.getByText(/^Minutes saved with/)) });
  },
};
