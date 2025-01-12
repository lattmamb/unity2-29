import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addHours, setHours, setMinutes, format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const generateTimeSlots = () => {
    const slots = [];
    // Generate time slots from 6 AM to 10 PM
    for (let hour = 6; hour <= 22; hour++) {
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
    
    // Set default start time to 9 AM
    const newStartTime = setHours(
      setMinutes(date, 0),
      9
    );
    
    // Set default duration to 4 hours
    const newEndTime = addHours(newStartTime, 4);
    
    // Validate if the selected date is not in the past
    if (newStartTime < new Date()) {
      toast({
        title: "Invalid Date Selection",
        description: "Please select a future date for your booking.",
        variant: "destructive",
      });
      return;
    }
    
    onSelect(newStartTime, newEndTime);
  };

  const handleStartTimeSelect = (time: string) => {
    if (!startTime) {
      toast({
        title: "Select Date First",
        description: "Please select a date before choosing a time.",
        variant: "destructive",
      });
      return;
    }
    
    const [hours, minutes] = time.split(":").map(Number);
    const newStartTime = setHours(setMinutes(startTime, minutes), hours);
    
    // Ensure start time is not in the past
    if (newStartTime < new Date()) {
      toast({
        title: "Invalid Time Selection",
        description: "Please select a future time for your booking.",
        variant: "destructive",
      });
      return;
    }
    
    const newEndTime = addHours(newStartTime, 4);
    onSelect(newStartTime, newEndTime);
  };

  const handleEndTimeSelect = (time: string) => {
    if (!startTime || !endTime) {
      toast({
        title: "Select Start Time First",
        description: "Please select a start time before choosing an end time.",
        variant: "destructive",
      });
      return;
    }
    
    const [hours, minutes] = time.split(":").map(Number);
    const newEndTime = setHours(setMinutes(endTime, minutes), hours);
    
    // Ensure end time is after start time
    if (newEndTime <= startTime) {
      toast({
        title: "Invalid Time Selection",
        description: "End time must be after start time.",
        variant: "destructive",
      });
      return;
    }
    
    // Ensure minimum booking duration of 1 hour
    const hoursDiff = (newEndTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    if (hoursDiff < 1) {
      toast({
        title: "Invalid Duration",
        description: "Minimum booking duration is 1 hour.",
        variant: "destructive",
      });
      return;
    }
    
    onSelect(startTime, newEndTime);
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