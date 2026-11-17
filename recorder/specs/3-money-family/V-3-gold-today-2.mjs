// V-3-gold-today-2 · How to switch the gold price off · guides\3-money-family\gold-today.md
import { openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-gold-today-2",
  note: "gold-today",
  role: "host",
  start: (seed) => `${seed.weddingPath}/money`,

  // Off camera: the Budget page waits on the live gold price, which can be slow. Wait for it here,
  // so it is ready (and cached) when recording starts.
  async setup({ page, seed }) {
    await page.goto(`${seed.weddingPath}/money/budget`, { waitUntil: "domcontentloaded", timeout: 120_000 });
    await page.getByText(/Gold today: 24K/).waitFor({ timeout: 120_000 });
    await page.goto(`${seed.weddingPath}/money/budget`, { waitUntil: "domcontentloaded", timeout: 120_000 });
    await page.getByText(/Gold today: 24K/).waitFor({ timeout: 120_000 });
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-gold-today-2", phone);
    const ctx = { page, tap, phone };
    await step({ ...r(0), do: () => show(page.getByText(/Gold today: 24K/)) });
    await step({ ...r(1), do: () => openSection(ctx, "Settings") });
    await step({ ...r(2), do: () => tap(page.getByRole("link", { name: /^Smart helpers/ })) });
    await step({ ...r(3), do: () => tap(page.getByLabel("Gold price on the jewellery budget line")) });
    await step({ ...r(4), do: () => tap(page.getByRole("button", { name: "Save", exact: true })) });
    await step({
      ...r("end"),
      do: async () => {
        await page.waitForTimeout(800);
        await page.goto(page.url().replace(/\/settings.*$/, "/money/budget"));
        await show(page.getByRole("textbox", { name: "Planned for Attire and jewellery" }));
      },
    });
  },
};
