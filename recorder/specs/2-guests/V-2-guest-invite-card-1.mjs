// V-2-guest-invite-card-1 · How to save your invite card, then reply from the card · guides\2-guests\guest-invite-card.md
// Guest side: the card opens at the guest link's /card address. The picture is saved in the robot's downloads.
import { keepOneFunctionOffCamera } from "./_lib.mjs";

export default {
  id: "V-2-guest-invite-card-1",
  note: "guest-invite-card",
  start: (seed) => `${seed.guestLinkPath}/card`,
  async setup({ page, seed }) {
    await keepOneFunctionOffCamera(page, seed, "Haldi", `${seed.guestLinkPath}/card`);
  },

  async run({ page, step, tap, show }) {
    await step({ n: 0, what: "Show the invite card", hold: 4 });
    await step({ n: 1, what: "Show the card link page", hold: 3, do: () => show(page.getByText(/you are invited/i).first()) });
    await step({ n: 2, what: "Tap Save as image", hold: 4,
      do: async () => {
        const download = page.waitForEvent("download", { timeout: 20_000 }).catch(() => null);
        await tap(page.getByRole("button", { name: "Save as image" }));
        await download;
      } });
    await step({ n: 3, what: "Show Save as PDF beside it", hold: 4, do: () => show(page.getByRole("button", { name: "Save as PDF" })) });
    await step({ n: 4, what: "Show the card again", hold: 5, do: () => show(page.getByText(/you are invited/i).first()) });
    await step({ n: 5, what: "Tap Reply to this invitation", hold: 4, do: () => tap(page.getByRole("link", { name: "Reply to this invitation" }).or(page.getByRole("button", { name: "Reply to this invitation" })).first()) });
    await step({ n: 6, what: "Tap Going under the haldi", hold: 3, do: () => tap(page.getByRole("radiogroup", { name: "Haldi" }).getByText("Going", { exact: true })) });
    await step({ n: 7, what: "Tap Send our reply", hold: 4, do: () => tap(page.getByRole("button", { name: "Send our reply" })) });
    await step({ n: "end", what: "Show the card saying you are on the list", hold: 4, do: () => show(page.getByText(/on the list/i).first()) });
  },
};
