import { useBooking } from "../context/BookingContext";
import { bookSlot } from "../services/service";
export default function PriceBreakdown() {
  const { court, selectedEquipment, coach,slot,setIsLoading,isLoading,resetBooking } = useBooking();

  if (!court) return null;


  const handleBooking = async () => {

    if(!slot || !court){
      alert("Please select slot and court")
      return;
    }

    setIsLoading(true)

    const data = {
      courtId: court.id,
      coachId: coach?.id || null,
      startTime: slot.start,
      endTime: slot.end,
      equipment: selectedEquipment
    }

    const result = await bookSlot(data)
    alert("Booked")
    resetBooking()


    setIsLoading(false)

  }

  return (
    <div>
      <h3>Price Breakdown</h3>
      <p>Court: ₹{court.price}</p>
      <p>Equipment: ₹{(selectedEquipment[1] || 0) * 100 + (selectedEquipment[2] || 0) * 150}</p>
      <p>Coach: ₹{coach ? 300 : 0}</p>
      <button disabled={!court || isLoading} onClick={handleBooking}>Book</button>
    </div>
  );
}
