// V-2-pickups-4 · How to send a driver their link · guides\2-guests\pickups.md
// Off camera, a run with Raju Travels (a vendor with a phone) as its driver is added. The robot never opens WhatsApp.
import { addRunOffCamera, addVendorOffCamera, blockMessaging, stayTab } from "./_lib.mjs";

const RUN = { place: "Ahmedabad Airport", date: "2027-02-11", time: "06:30", vehicle: "White Innova", seats: 6, driver: "Raju Travels" };

export default {
  id: "V-2-pickups-4",
  note: "pickups",
  role: "host",
  start: (seed) => `${seed.weddingPath}/stays/pickups`,
  async setup({ page, seed }) {
    await blockMessaging(page);
    await addVendorOffCamera(page, seed, { name: "Raju Travels" });
    await addRunOffCamera(page, seed, RUN, `${seed.weddingPath}/stays/pickups`);
  },

  async run({ page, step, tap, show }) {
    const drivers = page.getByRole("region", { name: "Drivers’ links" });
    await step({ n: 0, what: "Show a run whose driver has no link yet", hold: 5 });
    await step({ n: 1, what: "Open the Pickups tab", hold: 5, do: () => tap(stayTab(page, "Pickups")) });
    await step({ n: 2, what: "Scroll to Drivers' links", hold: 5, do: () => show(drivers) });
    await step({ n: 3, what: "Tap Make a link", hold: 5, do: () => tap(drivers.getByRole("button", { name: "Make a link" })) });
    await step({ n: 4, what: "Tap Send on WhatsApp", hold: 5, do: () => tap(drivers.getByRole("link", { name: "Send on WhatsApp" })) });
    await step({ n: 5, what: "Show the Send on WhatsApp button", hold: 6, do: () => show(drivers.getByRole("link", { name: "Send on WhatsApp" })) });
    await step({ n: "end", what: "Show the driver's link row with Copy link", hold: 5, do: () => show(drivers.getByRole("button", { name: "Copy link" })) });
  },
};
