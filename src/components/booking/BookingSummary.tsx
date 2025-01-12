import { format } from "date-fns";
import { BookingData } from "@/pages/Booking";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type BookingSummaryProps = {
  bookingData: BookingData;
  onConfirm: () => void;
};

export function BookingSummary({ bookingData, onConfirm }: BookingSummaryProps) {
  if (!bookingData.vehicle || !bookingData.startTime || !bookingData.endTime || !bookingData.pickupLocation) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Booking Summary</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Details</CardTitle>
          <CardDescription>
            Review your selected vehicle and booking details
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Selected Vehicle</h3>
              <p>{bookingData.vehicle.name}</p>
              <p className="text-sm text-muted-foreground">
                Type: {bookingData.vehicle.type}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Battery Level</h3>
              <p>{bookingData.vehicle.battery_level}%</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Pick-up Time</h3>
              <p>{format(bookingData.startTime, "PPP")}</p>
              <p className="text-sm text-muted-foreground">
                {format(bookingData.startTime, "p")}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Drop-off Time</h3>
              <p>{format(bookingData.endTime, "PPP")}</p>
              <p className="text-sm text-muted-foreground">
                {format(bookingData.endTime, "p")}
              </p>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="font-medium mb-2">Pick-up Location</h3>
              <p className="text-sm text-muted-foreground">
                Coordinates: {bookingData.pickupLocation.lat.toFixed(6)},{" "}
                {bookingData.pickupLocation.lng.toFixed(6)}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t">
            <Button onClick={onConfirm} className="w-full">
              Confirm Booking
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}