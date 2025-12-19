import DatePicker from "../components/DatePicker";
import SlotGrid from "../components/SlotGrid";
import CourtSelector from "../components/CourtSelector";
import EquipmentSelector from "../components/EquipmentSelector";
import CoachSelector from "../components/CoachSelector";
import PriceBreakdown from "../components/PriceBreakdown";

export default function BookingPage() {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Book a Court</h1>

      <DatePicker />
      <SlotGrid />
      <CourtSelector />
      <EquipmentSelector />
      <CoachSelector />
      <PriceBreakdown />
    </div>
  );
}
