// V-3-notifications-1 · How to read and clear your notices · guides\3-money-family\notifications.md
import { script } from "./_lib.mjs";

export default {
  id: "V-3-notifications-1",
  note: "notifications",
  role: "host", // lane 3 has no separate family login; the host sees the same notices
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-notifications-1", phone);
    const bell = page.getByRole("button", { name: /^Notifications/ });
    const sheet = page.getByRole("dialog");
    let home = null;
    await step({ ...r(0), do: () => { home = page.url(); return show(bell); } });
    await step({ ...r(1), do: () => tap(bell) });
    await step({
      ...r(2),
      do: async () => {
        const first = sheet.getByRole("button", { name: /^Unread/ }).first();
        await first.waitFor();
        await tap(first);
      },
    });
    await step({
      ...r(3),
      do: async () => {
        await page.goBack();
        if (!(await bell.isVisible({ timeout: 4000 }).catch(() => false))) await page.goto(home); // back can land on a blank page
        await tap(page.getByRole("button", { name: /^Notifications/ }));
        await tap(page.getByRole("dialog").getByRole("button", { name: "Mark all read" }));
      },
    });
    await step({ ...r(4), do: () => tap(page.getByRole("dialog").getByRole("link", { name: "See all notifications" })) });
    await step({
      ...r(5),
      do: async () => {
        await tap(page.getByRole("button", { name: "Clear read" }));
        await tap(page.getByRole("alertdialog").or(page.getByRole("dialog")).getByRole("button", { name: "Clear", exact: true }));
      },
    });
    await step({ ...r("end"), do: () => show(page.getByText(/all caught up/i)) });
  },
};
