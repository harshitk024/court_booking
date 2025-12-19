import { generateSlots } from "../utils/slots.js";
import { getAvailabilityForSlot } from "../services/availability.service.js";

export async function getAvailability(req, res) {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "date is required (YYYY-MM-DD)" });
  }

  const slots = generateSlots(date);
  const result = [];

  for (const slot of slots) {
    const availability = await getAvailabilityForSlot(
      slot.start,
      slot.end
    );

    const startLocal = new Date(slot.start).toLocaleTimeString([],{
      hour: "2-digit",
      minute: "2-digit"
    })
    const endLocal = new Date(slot.end).toLocaleTimeString([],{
      hour: "2-digit",
      minute: "2-digit"

    })

    const localTime = `${startLocal}-${endLocal}`

    result.push({
      slot: localTime,
      start: slot.start,
      end: slot.end,
      availableCourts: availability.courts,
      availableCoaches: availability.coaches,
      equipmentLeft: availability.equipment
    });
  }

  res.json(result);
}
