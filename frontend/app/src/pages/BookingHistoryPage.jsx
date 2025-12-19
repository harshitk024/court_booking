import { useBooking } from "../context/BookingContext";

export default function PriceBreakdown() {
  const { court, equipment, coach } = useBooking();

  if (!court) return null;

  return (
    <div>
      <h3>Price Breakdown</h3>
      <p>Court: ₹{court.price}</p>
      <p>Equipment: ₹{(equipment.rackets || 0) * 100 + (equipment.shoes || 0) * 150}</p>
      <p>Coach: ₹{coach ? 300 : 0}</p>
    </div>
  );
}
