// V-3-shagun-3 · How to thank someone · guides\3-money-family\shagun.md
import { script } from "./_lib.mjs";

export default {
  id: "V-3-shagun-3",
  note: "shagun",
  role: "host",
  start: (seed) => `${seed.weddingPath}/shagun`,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-shagun-3", phone);
    const row = page.locator("li").filter({ hasText: "From Gupta uncle" });
    await step({ ...r(0), do: () => show(page.getByText("Thank-yous to send", { exact: true })) });
    await step({ ...r(1), do: () => tap(page.getByRole("link", { name: /^Thank-yous/ })) });
    await step({ ...r(2), do: () => tap(row.getByRole("button", { name: "Draft a message" })) });
    await step({ ...r(3), do: () => show(row.getByText(/^Dear /)) });
    await step({ ...r(4), do: () => tap(row.getByRole("button", { name: "Copy message" })) });
    await step({ ...r(5), do: () => show(row.getByRole("button", { name: "Mark thanked" })) });
    await step({ ...r(6), do: () => tap(row.getByRole("button", { name: "Mark thanked" })) });
    await step({ ...r("end"), do: () => show(page.getByText("Thank-yous to send", { exact: true })) });
  },
};
