// V-3-notifications-2 · How to set a reminder for yourself · guides\3-money-family\notifications.md
// A computer has no (+) button, so the computer take goes by the bell, then See all notifications,
// then the Reminders tab (lines in voiceover\V-3-notifications-2.sizes.json).
import { isoDay, script } from "./_lib.mjs";

export default {
  id: "V-3-notifications-2",
  note: "notifications",
  role: "host",
  start: (seed) => `${seed.weddingPath}/tasks`,

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-notifications-2", phone);
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Tasks" }).first()) });
    await step({
      ...r(1),
      do: async () => {
        if (phone) {
          await tap(page.getByRole("navigation").getByRole("button", { name: "Add", exact: true }));
          await tap(page.getByRole("dialog").getByRole("link", { name: "Remind me", exact: true }));
        } else {
          await tap(page.getByRole("button", { name: /^Notifications/ }));
          await tap(page.getByRole("dialog").getByRole("link", { name: "See all notifications" }));
          await tap(page.getByRole("link", { name: "Reminders", exact: true }));
        }
      },
    });
    await step({ ...r(2), do: () => type(page.getByLabel("What should we remind you about?"), "Call the caterer about the menu") });
    await step({
      ...r(3),
      do: async () => {
        const date = page.getByLabel("Date", { exact: true });
        await tap(date);
        await date.fill(isoDay(1));
      },
    });
    await step({
      ...r(4),
      do: async () => {
        const time = page.getByLabel("Time", { exact: true });
        await tap(time);
        await time.fill("10:00");
      },
    });
    await step({ ...r(5), do: () => tap(page.getByRole("button", { name: "Add reminder" })) });
    await step({ ...r("end"), do: () => show(page.getByText("Call the caterer about the menu")) });
  },
};
