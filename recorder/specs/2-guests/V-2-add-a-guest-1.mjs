// V-2-add-a-guest-1 · How to add one guest · guides\2-guests\add-a-guest.md
// Each step() is one row of the note's script table (# · Robot does · Hold).
// On a computer there is no (+) button: the note says to tap Add guest on Guests instead
// (steps 1 and 2), so the desktop take does that and keeps the same step numbers.

export default {
  id: "V-2-add-a-guest-1",
  note: "add-a-guest",
  role: "host", // lane 2, couple (Appendix E)
  start: (seed) => `${seed.weddingPath}/guests`,

  async run({ page, step, tap, type, show, phone }) {
    const form = page.locator("form").filter({ has: page.getByRole("button", { name: "Save guest" }) });

    await step({ n: 0, what: "Show the Guests list", hold: 4 });

    if (phone) {
      await step({
        n: 1,
        what: "Tap the (+) button in the bottom bar",
        hold: 5,
        do: () => tap(page.getByRole("navigation").getByRole("button", { name: "Add", exact: true })),
      });
      await step({
        n: 2,
        what: "Tap Add a guest",
        hold: 5,
        do: () => tap(page.getByRole("dialog").getByRole("link", { name: "Add a guest", exact: true })),
      });
    } else {
      await step({
        n: 1,
        what: "Tap Add guest",
        hold: 5,
        do: () => tap(page.getByRole("main").getByRole("link", { name: "Add guest", exact: true })),
      });
      await step({
        n: 2,
        what: "Show the Add a guest form",
        hold: 5,
        do: () => show(page.getByRole("heading", { name: "Add a guest" })),
      });
    }

    await step({
      n: 3,
      what: "Type Rekha Mausi in Full name",
      hold: 6,
      do: () => type(form.getByLabel("Full name", { exact: true }), "Rekha Mausi"),
    });
    await step({
      n: 4,
      what: "Type 98765 43210 in Phone",
      hold: 5,
      do: () => type(form.getByLabel("Phone", { exact: true }), "98765 43210"),
    });
    await step({
      n: 5,
      what: "Untick Reception under Invite to",
      hold: 5,
      do: () =>
        tap(form.locator("label").filter({ has: page.locator('input[name="eventIds"]'), hasText: /^\s*Reception/ })),
    });
    await step({
      n: 6,
      what: "Tap Save guest",
      hold: 4,
      do: () => tap(form.getByRole("button", { name: "Save guest" })),
    });
    await step({
      n: "end",
      what: "Show the card with Message on WhatsApp",
      hold: 4,
      do: () => show(page.getByRole("link", { name: "Message on WhatsApp" })),
    });
  },
};
