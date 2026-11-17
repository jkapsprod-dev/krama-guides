// V-3-family-feed-1 · How to post an update or photos, then react to a post · guides\3-money-family\family-feed.md
import { fixture, openSection, script } from "./_lib.mjs";

export default {
  id: "V-3-family-feed-1",
  note: "family-feed",
  role: "host", // lane 3, the couple (Appendix E)
  start: (seed) => seed.weddingPath,

  async run({ page, step, tap, type, show, phone }) {
    const r = script("V-3-family-feed-1", phone);
    const ctx = { page, tap, phone };
    const post = page.locator("article, li").filter({ hasText: "Haldi 10 baje, Sharma house" }).first();
    let chooser = null;
    await step({ ...r(0), do: () => show(page.getByRole("heading", { name: "Sharma–Patel wedding" }).first()) });
    await step({ ...r(1), do: () => openSection(ctx, "Family feed") });
    await step({ ...r(2), do: () => type(page.getByRole("textbox", { name: "Write a post" }), "Haldi 10 baje, Sharma house") });
    await step({
      ...r(3),
      do: async () => {
        const wait = page.waitForEvent("filechooser");
        await tap(page.getByRole("button", { name: "Add photos" }));
        chooser = await wait;
        await chooser.setFiles([fixture("mehndi-1.jpg"), fixture("mehndi-2.jpg")]);
      },
    });
    await step({ ...r(4), do: () => show(page.getByRole("button", { name: "Post", exact: true })) });
    await step({ ...r(5), do: () => tap(page.getByRole("button", { name: "Post", exact: true })) });
    await step({ ...r(6), do: () => tap(post.getByRole("button", { name: /^Heart/ })) });
    await step({ ...r(7), do: () => tap(post.getByRole("button", { name: /^Heart/ })) });
    await step({ ...r("end"), do: () => show(post.getByRole("button", { name: /^Heart/ })) });
  },
};
