// V-3-shagun-2 · How to see shagun by function or family · guides\3-money-family\shagun.md
import { openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-shagun-2",
  note: "shagun",
  role: "host",
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-shagun-2", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Shagun") });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: "By function", exact: true })) });
    await step({ ...r(3), do: () => tap(page.getByRole("link", { name: "By family", exact: true })) });
    await step({ ...r(4), do: () => tap(page.getByRole("link", { name: "Received", exact: true })) });
    await step({ ...r("end"), do: () => show(page.getByText(/received/).first()) });
  },
};
