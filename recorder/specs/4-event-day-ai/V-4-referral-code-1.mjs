// V-4-referral-code-1 · How to share your referral code, then use a friend's code · guides\4-event-day-ai\referral-code.md
// Host Riya Sharma, lane 4. A made-up friend's code is set up off camera (_lib.mjs). The robot taps
// Copy code but never sends the code to anyone.
import { friendReferralCode } from "./_lib.mjs";

export default {
  id: "V-4-referral-code-1",
  note: "referral-code",
  role: "host",
  start: (seed) => (friendReferralCode(), `${seed.weddingPath}/more`),
  // Lets the page copy the code, so the button says Copied (nothing is sent anywhere).
  setup: ({ page }) => page.context().grantPermissions(["clipboard-read", "clipboard-write"]),

  async run({ page, step, tap, type, show, phone }) {
    const referral = page.getByRole("region", { name: "Referral code" });
    await step({
      n: 0,
      what: "Show the More screen",
      hold: 5,
      do: () => show(page.getByRole("heading", { name: "More", level: 1 })),
    });
    await step({
      n: 1,
      what: "Tap Codes & planner",
      hold: 3,
      do: () => tap(page.getByRole("main").getByRole("link", { name: /^Codes & planner/ })),
    });
    await step({
      n: 2,
      what: "Scroll to Referral code",
      hold: 3,
      do: () => show(referral.getByRole("heading", { name: "Referral code", level: 2 })),
    });
    await step({
      n: 3,
      what: "Tap Copy code",
      hold: 3,
      do: () => tap(referral.getByRole("button", { name: "Copy code" })),
    });
    await step({
      n: 4,
      what: "Show the weddings-used line",
      hold: 5,
      do: () => show(referral.getByText(/Nobody has used your code yet/)),
    });
    await step({
      n: 5,
      what: "Show Copied on the button",
      hold: 3,
      do: () => show(referral.getByRole("button", { name: "Copied", exact: true })),
    });
    await step({
      n: 6,
      what: "Scroll to Did a friend give you their code?",
      hold: 3,
      do: () => show(referral.getByLabel("Did a friend give you their code?")),
    });
    await step({
      n: 7,
      what: "Type a made-up code, ANJALI-DHRUV27",
      hold: 3,
      do: () => type(referral.getByLabel("Did a friend give you their code?"), "ANJALI-DHRUV27"),
    });
    await step({
      n: 8,
      what: "Tap Use code",
      hold: 3,
      do: () => tap(referral.getByRole("button", { name: "Use code" })),
    });
    await step({
      n: "end",
      what: "Show You used a friend's code.",
      hold: 4,
      do: () => show(referral.getByText("You used a friend’s code.")),
    });
  },
};
