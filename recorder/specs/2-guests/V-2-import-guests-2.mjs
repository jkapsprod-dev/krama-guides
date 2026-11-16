// V-2-import-guests-2 · How to check duplicates and finish the import · guides\2-guests\import-guests.md
// Off camera, the file from video 1 is chosen and reviewed, so the video starts on the review screen:
// one repeated guest (Alok Saxena) and two guests who share a surname and a city (the Rathods in Surat).
import { fixture } from "./_lib.mjs";
import { SHARMA_LIST } from "./V-2-import-guests-1.mjs";

export default {
  id: "V-2-import-guests-2",
  note: "import-guests",
  role: "host",
  start: (seed) => `${seed.weddingPath}/guests/import`,
  async setup({ page }) {
    const csv = fixture("sharma-list.csv", SHARMA_LIST);
    await page.locator('input[type="file"]').setInputFiles(csv);
    await page.getByRole("button", { name: "Review", exact: true }).click();
    await page.getByRole("heading", { name: /^Review \d+ guests/ }).waitFor({ timeout: 30_000 });
  },

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the review screen", hold: 4 });
    await step({ n: 1, what: "Show Possible duplicates", hold: 7, do: () => show(page.getByRole("group", { name: "Possible duplicates" })) });
    await step({ n: 2, what: "Tick the family in Put these together?", hold: 7,
      do: () => tap(page.getByRole("group", { name: "Put these together?" }).getByRole("checkbox")) });
    await step({ n: 3, what: "Pick Haldi under Invite everyone to", hold: 6,
      do: async () => {
        const fn = page.getByRole("combobox", { name: "Invite everyone to" });
        await tap(fn);
        await fn.selectOption({ label: "Haldi" });
      } });
    await step({ n: 4, what: "Tap the button Import 4 guests", hold: 5, do: () => tap(page.getByRole("button", { name: /^Import \d+ guests/ })) });
    await step({ n: 5, what: "Tap View guests", hold: 5, do: () => tap(page.getByRole("link", { name: "View guests" })) });
    await step({ n: "end", what: "Show the full list", hold: 4, do: () => show(page.getByRole("heading", { level: 1 }).first()) });
  },
};
