// V-2-guest-easier-to-read-2 · How to hear it read aloud · guides\2-guests\guest-easier-to-read.md
// Guest side: the easier page opens at the guest link's /elder address. The phone's voice is not
// recorded, so the video shows the buttons only.
export default {
  id: "V-2-guest-easier-to-read-2",
  note: "guest-easier-to-read",
  start: (seed) => `${seed.guestLinkPath}/elder?set=1`,

  async run({ page, step, tap, show }) {
    const aloud = page.getByRole("button", { name: "Read aloud" });
    await step({ n: 0, what: "Show a big question screen", hold: 4 });
    await step({ n: 1, what: "Show the easier-to-read page", hold: 7, do: () => show(page.getByRole("heading").first()) });
    await step({ n: 2, what: "Tap Read aloud", hold: 8, do: () => tap(aloud) });
    await step({ n: 3, what: "Tap Stop reading", hold: 8, do: () => tap(page.getByRole("button", { name: "Stop reading" })) });
    await step({ n: "end", what: "Show the question again", hold: 5, do: () => show(aloud) });
  },
};
