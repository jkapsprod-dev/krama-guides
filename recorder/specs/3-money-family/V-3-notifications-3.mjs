// V-3-notifications-3 · How to choose what you're told about · guides\3-money-family\notifications.md
import { openNotifications, script } from "./_lib.mjs";

export default {
  id: "V-3-notifications-3",
  note: "notifications",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-notifications-3", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openNotifications(ctx) });
    await step({ ...r(2), do: () => tap(page.getByRole("main").getByRole("link", { name: "Settings", exact: true })) });
    await step({ ...r(3), do: () => tap(page.getByLabel("Replies to functions I'm in charge of")) });
    await step({ ...r(4), do: () => tap(page.getByRole("button", { name: "Save", exact: true }).first()) });
    await step({ ...r("end"), do: () => show(page.getByText("Saved.").first()) });
  },
};
