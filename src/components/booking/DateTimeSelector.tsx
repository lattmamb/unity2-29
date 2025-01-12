import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addHours, setHours, setMinutes, format } from "date-fns";

type DateTimeSelectorProps = {
  startTime?: Date;
  endTime?: Date;
  onSelect: (startTime: Date, endTime: Date) => void;
};

export function DateTimeSelector({
  startTime,
  endTime,
  onSelect,
}: DateTimeSelectorProps) {
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour, minute, 0, 0);
        slots.push(format(time, "HH:mm"));
      }
    }
    return slots;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const newStartTime = setHours(
      setMinutes(date, 0),
      9
    );
    const newEndTime = addHours(newStartTime, 4);
    
    onSelect(newStartTime, newEndTime);
  };

  const handleStartTimeSelect = (time: string) => {
    if (!startTime) return;
    
    const [hours, minutes] = time.split(":").map(Number);
    const newStartTime = setHours(setMinutes(startTime, minutes), hours);
    const newEndTime = addHours(newStartTime, 4);
    
    onSelect(newStartTime, newEndTime);
  };

  const handleEndTimeSelect = (time: string) => {
    if (!startTime || !endTime) return;
    
    const [hours, minutes] = time.split(":").map(Number);
    const newEndTime = setHours(setMinutes(endTime, minutes), hours);
    
    if (newEndTime > startTime) {
      onSelect(startTime, newEndTime);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Select Date & Time</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Pick a Date</h3>
          <Calendar
            mode="single"
            selected={startTime}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Pick-up Time</h3>
            <Select
              value={startTime ? format(startTime, "HH:mm") : undefined}
              onValueChange={handleStartTimeSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {generateTimeSlots().map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Drop-off Time</h3>
            <Select
              value={endTime ? format(endTime, "HH:mm") : undefined}
              onValueChange={handleEndTimeSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {generateTimeSlots().map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}