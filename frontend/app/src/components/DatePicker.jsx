import { useBooking } from "../context/BookingContext";
import {getAvailableSlots} from "../services/service"
export default function PickDate() {
  const {setDate,date,setSlots} = useBooking()
  const today = new Date().toISOString().split("T")[0]

  const handleClick = async () => {

    const slots = await getAvailableSlots(date)
    setSlots(slots)


  }

  return (
    <div>
      <label>Select Date: </label>
      <input
      type="date"
        onChange={(e) => setDate(e.target.value)}
        min={today}
      />
      <button onClick={handleClick}>Get Slots</button>
    </div>
  );

  
}
