export function generateSlots(date) {
  const slots = [];
  const startHour = 3;
  const endHour = 19;

  const [year, month, day] = date.split("-").map(Number);

  for (let hour = startHour; hour < endHour; hour++) {
    const start = new Date(Date.UTC(year, month - 1, day, hour, 0, 0));
    const end = new Date(Date.UTC(year, month - 1, day, hour + 1, 0, 0));

    const now = new Date()
    if (end.getTime() <= now) continue;

    slots.push({
      label: `${String(hour).padStart(2, "0")}:00-${String(hour + 1).padStart(2, "0")}:00`,
      start: start.toISOString(),
      end: end.toISOString(),
    });
  }
  console.log(slots)

  return slots;
}
