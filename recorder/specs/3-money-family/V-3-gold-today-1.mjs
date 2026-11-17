// V-3-gold-today-1 · How to see today's gold price on your jewellery budget · guides\3-money-family\gold-today.md
import { script } from "./_lib.mjs";

export default {
  id: "V-3-gold-today-1",
  note: "gold-today",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money`,

  // Off camera: the Budget page waits on the live gold price, which can be slow. Wait for it here,
  // so it is ready (and cached) when recording starts.
  async setup({ page, seed }) {
    await page.goto(`${seed.weddingPath}/money/budget`, { waitUntil: "domcontentloaded", timeout: 120_000 });
    await page.getByText(/Gold today: 24K/).waitFor({ timeout: 120_000 });
    await page.goto(`${seed.weddingPath}/money`, { waitUntil: "domcontentloaded", timeout: 120_000 });
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-gold-today-1", phone);
    await step({ ...r(0), do: () => show(page.getByText("Upcoming payments", { exact: true })) });
    await step({ ...r(1), do: () => tap(page.getByRole("link", { name: "Budget", exact: true })) });
    await step({ ...r(2), do: () => show(page.getByRole("textbox", { name: "Planned for Attire and jewellery" })) });
    await step({ ...r(3), do: () => show(page.getByText(/Gold today: 24K/)) });
    await step({ ...r(4), do: () => show(page.getByText(/A jeweller charges more/)) });
    await step({ ...r("end"), do: () => show(page.getByRole("textbox", { name: "Planned for Attire and jewellery" })) });
  },
};
