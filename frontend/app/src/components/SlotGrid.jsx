import { useBooking } from "../context/BookingContext";


export default function SlotGrid() {
  const { slot, setSlot,slots,setCourts,setCoaches, setEquipment} = useBooking();

  const handleClick = (s) => {

    setSlot(s)
    setCourts(s.availableCourts)
    setCoaches(s.availableCoaches)
    setEquipment(s.equipmentLeft)
    
  }

  return (
    <div>
      <h3>Select Slot</h3>
      {slots !== null && slots.map((s) => (
        <button
          key={s.slot}
          disabled={s.availableCourts.length === 0}
          onClick={() => handleClick(s)}
          style={{
            margin: "5px",
            background: slot?.start === s.start ? "#ccc" : "",
          }}
        >
          {s.slot} ({s.availableCourts.length} courts left)
        </button>
      ))}
    </div>
  );
}
