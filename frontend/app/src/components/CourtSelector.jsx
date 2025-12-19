import { useBooking } from "../context/BookingContext";


export default function CourtSelector() {
  const { court, setCourt, slot,courts} = useBooking();

  if (!slot) return null;

  return (
    <div>
      <h3>Select Court</h3>
      {courts.map((c) => (
        <button
          key={c.id}
          onClick={() => setCourt({...c,price: c.type == "INDOOR" ? "500" : "400"})}
          style={{
            display: "block",
            margin: "5px 0",
            background: court?.id === c.id ? "#ccc" : "",
          }}
        >
          {c.name} – ₹{c.type == "INDOOR" ? "500" : "400"}
        </button>
      ))}
    </div>
  );
}
