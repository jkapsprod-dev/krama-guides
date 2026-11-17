// V-3-family-feed-2 · How to report or remove a post · guides\3-money-family\family-feed.md
import { script } from "./_lib.mjs";

export default {
  id: "V-3-family-feed-2",
  note: "family-feed",
  role: "host",
  start: (seed) => `${seed.weddingPath}/feed`,

  async run({ page, step, tap, show, phone }) {
    const r = script("V-3-family-feed-2", phone);
    const post = page.locator("article, li").filter({ hasText: "Nani's lehenga" }).first();
    const dialog = page.getByRole("alertdialog").or(page.getByRole("dialog"));
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Family feed" })) });
    await step({ ...r(1), do: () => show(post) });
    await step({ ...r(2), do: () => tap(post.getByRole("button", { name: "Report", exact: true })) });
    await step({ ...r(3), do: () => show(post.getByText(/report/i).first()) });
    await step({ ...r(4), do: () => tap(post.getByRole("button", { name: "Remove post" })) });
    await step({ ...r(5), do: () => tap(dialog.getByRole("button", { name: "Remove post" })) });
    await step({ ...r("end"), do: () => show(page.getByRole("heading", { name: "Family feed" })) });
  },
};
