// V-3-heads-up-2 · How to read a festival or long-weekend warning · guides\3-money-family\heads-up.md
import { script } from "./_lib.mjs";

export default {
  id: "V-3-heads-up-2",
  note: "heads-up",
  role: "host",
  start: (seed) => seed.weddingPath,

  // Off camera: the demo functions are in 2027 and the holiday list covers 2026 only, so move the
  // Sangeet to Christmas Day 2026 through its Edit details form.
  async setup({ page, seed }) {
    await page.goto(`${seed.weddingPath}/events`);
    await page.getByRole("link", { name: "Open Sangeet" }).click();
    await page.waitForURL(/events\/[0-9a-f-]{36}$/);
    await page.getByRole("link", { name: "Edit details" }).click();
    await page.getByLabel("Date", { exact: true }).fill("2026-12-25");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await page.waitForURL(/events\/[0-9a-f-]{36}$/);
    await page.goto(seed.weddingPath);
  },

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-heads-up-2", phone);
    const card = page.getByText(/Christmas/).first();
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => show(page.getByRole("heading", { name: "Heads-up" }).or(card).first()) });
    await step({ ...r(2), do: () => show(card) });
    await step({ ...r(3), do: () => tap(page.getByRole("link", { name: /Open function/ }).first()) });
    await step({ ...r(4), do: () => show(page.getByText(/Christmas/).first()) });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Sangeet" }).first()) });
  },
};
