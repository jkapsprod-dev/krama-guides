// V-3-notifications-4 · How to get the morning email, then stop the morning email
// guides\3-money-family\notifications.md
// The demo app sends no email, so the "stop link in the email" cannot be shown. The video stops the
// email the other way the note names: pick Off on the same Email card, then Save.
import { openNotifications, script } from "./_lib.mjs";

export default {
  id: "V-3-notifications-4",
  note: "notifications",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-notifications-4", phone);
    const ctx = { page, tap, phone };
    const emailCard = page.locator("section, form, div").filter({ has: page.getByRole("radio", { name: /Every morning at 8:00/ }) }).last();
    const save = () => emailCard.getByRole("button", { name: "Save", exact: true });
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({
      ...r(1),
      do: async () => {
        await openNotifications(ctx);
        await tap(page.getByRole("main").getByRole("link", { name: "Settings", exact: true }));
      },
    });
    await step({ ...r(2), do: () => show(page.getByRole("radio", { name: /Every morning at 8:00/ })) });
    await step({ ...r(3), do: () => tap(page.getByRole("radio", { name: /Every morning at 8:00/ })) });
    await step({ ...r(4), do: () => tap(save()) });
    await step({ ...r(5), do: () => show(page.getByText("Saved.").last()) });
    await step({ ...r(6), do: () => show(page.getByRole("radio", { name: "Off", exact: true })) });
    await step({ ...r(7), do: () => tap(page.getByRole("radio", { name: "Off", exact: true })) });
    await step({ ...r(8), do: () => tap(save()) });
    await step({ ...r("end"), do: () => show(page.getByText("Saved.").last()) });
  },
};
