import { useBooking } from "../context/BookingContext";

export default function CoachSelector() {
  const { coach, setCoach, slot,coaches } = useBooking();

  if (!slot) return null;

  return (
    <div>
      <h3>Coach (Optional)</h3>
      {coaches.map((c) => (
        <button
          key={c.id}
          onClick={() => setCoach(c)}
          style={{
            margin: "5px",
            background: coach === c ? "#ccc" : "",
          }}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
