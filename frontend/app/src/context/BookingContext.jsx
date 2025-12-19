import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [date, setDate] = useState(null);

  const [slot, setSlot] = useState(null);
  const [slots,setSlots] = useState(null);

  const [courts,setCourts] = useState(null)
  const [court, setCourt] = useState(null);

  const [equipment, setEquipment] = useState({});
  const [selectedEquipment,setSelectedEquipment] = useState([])

  const [coach, setCoach] = useState(null);
  const [coaches,setCoaches] = useState(null)
  const [price, setPrice] = useState(null);

  const [isLoading,setIsLoading] = useState(false)

  const resetBooking = () => {
    setDate(null);
    setSlot(null);
    setCourt(null);
    setCourts(null);
    setEquipment({});
    setSelectedEquipment({});
    setCoach(null);
    setCoaches(null)
    setSlots(null);
    setPrice(null);
  };

  return (
    <BookingContext.Provider
      value={{
        date,
        slot,
        court,
        courts,
        equipment,
        selectedEquipment,
        coach,
        coaches,
        price,
        slots,
        isLoading,
        setIsLoading,
        setDate,
        setSlot,
        setSlots,
        setCourt,
        setCourts,
        setEquipment,
        setCoach,
        setCoaches,
        setPrice,
        resetBooking,
        setSelectedEquipment,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
