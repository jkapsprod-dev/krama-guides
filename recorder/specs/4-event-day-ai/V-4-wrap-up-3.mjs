// V-4-wrap-up-3 · How to download, then delete · guides\4-event-day-ai\wrap-up.md
// Host Riya Sharma, lane 4. Off camera: every function is moved into the past, so Wrap-up is open.
// The robot NEVER taps Delete permanently: the video stops once the Delete sooner box shows.
// The export is made by the app's background job, which does not run in this local setup, so the video
// shows the app's own "Preparing your export" message and not the Download link.
import { endWedding } from "./_lib.mjs";

export default {
  id: "V-4-wrap-up-3",
  note: "wrap-up",
  role: "host",
  start: (seed) => {
    endWedding(seed, 2);
    return `${seed.weddingPath}/wrap-up?step=download`;
  },

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the Download, then delete step", hold: 5, do: () => show(page.getByRole("heading", { name: "Download, then delete", level: 2 })) });
    await step({ n: 1, what: "Zoom on the Kept until line", hold: 5, do: () => show(page.getByText(/^Kept until/)) });
    await step({ n: 2, what: "Tap Prepare export", hold: 4, do: () => tap(page.getByRole("button", { name: "Prepare export" })) });
    await step({ n: 3, what: "Show the Preparing your export message", hold: 5, do: () => show(page.getByText(/Preparing your export/)) });
    await step({ n: 4, what: "Show the Delete sooner box", hold: 5, do: () => show(page.getByRole("region", { name: "Delete sooner" })) });
    await step({ n: "end", what: "Show the Wrap-up list", hold: 3, do: () => show(page.getByRole("group", { name: "Wrap-up steps" })) });
  },
};
