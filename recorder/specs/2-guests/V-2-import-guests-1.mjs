// V-2-import-guests-1 · How to import guests from a CSV file · guides\2-guests\import-guests.md
// Off camera, a small made-up file sharma-list.csv (Name, Phone, City) is made for the robot.
import { fixture, guestsMore, moreItem, navLink } from "./_lib.mjs";

export const SHARMA_LIST = `Name,Phone,City
Prakash Joshi,98250 40001,Surat
Dinesh Rathod,98250 40002,Surat
Hetal Rathod,98250 40003,Surat
Alok Saxena,98250 40004,Indore
Ramila Trivedi,98250 40005,Vadodara
`;

export default {
  id: "V-2-import-guests-1",
  note: "import-guests",
  role: "host",
  start: (seed) => seed.weddingPath,
  setup: () => fixture("sharma-list.csv", SHARMA_LIST),

  async run({ page, step, tap, show }) {
    const csv = fixture("sharma-list.csv", SHARMA_LIST);
    await step({ n: 0, what: "Show Home", hold: 4 });
    await step({ n: 1, what: "Tap Guests in the bottom bar", hold: 5, do: () => tap(navLink(page, "Guests")) });
    await step({ n: 2, what: "Tap More", hold: 4, do: () => tap(guestsMore(page)) });
    await step({ n: 3, what: "Tap Import contacts", hold: 4, do: () => tap(moreItem(page, "Import contacts")) });
    await step({ n: 4, what: "Choose the file under CSV file", hold: 6,
      do: async () => {
        const chooser = page.waitForEvent("filechooser");
        await tap(page.getByLabel("CSV file", { exact: true }));
        await (await chooser).setFiles(csv);
      } });
    await step({ n: 5, what: "Show Match your columns", hold: 6, do: () => show(page.getByRole("heading", { name: "Match your columns" })) });
    await step({ n: 6, what: "Tap Review", hold: 5, do: () => tap(page.getByRole("button", { name: "Review", exact: true })) });
    await step({ n: "end", what: "Show the review list", hold: 4, do: () => show(page.getByRole("heading", { name: /^Review \d+ guests/ })) });
  },
};
