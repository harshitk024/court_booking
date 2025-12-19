import { useBooking } from "../context/BookingContext";

export default function EquipmentSelector() {
  const {
    slot,
    equipment, 
    selectedEquipment,
    setSelectedEquipment,
  } = useBooking();

  if (!slot || !equipment) return null;

  const updateQty = (id, quantity) => {
    setSelectedEquipment((prev) => {
      const next = { ...prev };

      if (!quantity || quantity <= 0) {
        delete next[id]; 
      } else {
        next[id] = quantity;
      }

      return next;
    });
    console.log(selectedEquipment)
  };

  return (
    <div>
      <h3>Equipment (Optional)</h3>

      {equipment.map((eq) => (
        <div key={eq.id}>
          {eq.name}
          <input
            type="number"
            min="0"
            max={eq.available}
            value={selectedEquipment[eq.id] || 0}
            onChange={(e) =>
              updateQty(eq.id, Number(e.target.value))
            }
          />
        </div>
      ))}
    </div>
  );
}
