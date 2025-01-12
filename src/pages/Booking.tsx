import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { VehicleSelector } from "@/components/booking/VehicleSelector";
import { DateTimeSelector } from "@/components/booking/DateTimeSelector";
import { LocationSelector } from "@/components/booking/LocationSelector";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type BookingStep = "vehicle" | "datetime" | "location" | "summary";

export type BookingData = {
  vehicle?: Tables<"vehicles">;
  startTime?: Date;
  endTime?: Date;
  pickupLocation?: { lat: number; lng: number };
};

export default function Booking() {
  const [step, setStep] = useState<BookingStep>("vehicle");
  const [bookingData, setBookingData] = useState<BookingData>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNext = () => {
    const steps: BookingStep[] = ["vehicle", "datetime", "location", "summary"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: BookingStep[] = ["vehicle", "datetime", "location", "summary"];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleConfirmBooking = async () => {
    if (!bookingData.vehicle || !bookingData.startTime || !bookingData.endTime || !bookingData.pickupLocation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required booking information.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to make a booking.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("bookings").insert({
        vehicle_id: bookingData.vehicle.id,
        user_id: user.id,
        start_time: bookingData.startTime.toISOString(),
        end_time: bookingData.endTime.toISOString(),
        pickup_location: `(${bookingData.pickupLocation.lng},${bookingData.pickupLocation.lat})` as unknown,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Booking Confirmed!",
        description: "Your vehicle has been successfully booked.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Book a Vehicle</h1>
          
          <div className="space-y-8">
            {step === "vehicle" && (
              <VehicleSelector
                selected={bookingData.vehicle}
                onSelect={(vehicle) => setBookingData({ ...bookingData, vehicle })}
              />
            )}
            
            {step === "datetime" && (
              <DateTimeSelector
                startTime={bookingData.startTime}
                endTime={bookingData.endTime}
                onSelect={(startTime, endTime) => 
                  setBookingData({ ...bookingData, startTime, endTime })}
              />
            )}
            
            {step === "location" && (
              <LocationSelector
                location={bookingData.pickupLocation}
                onSelect={(location) => 
                  setBookingData({ ...bookingData, pickupLocation: location })}
              />
            )}
            
            {step === "summary" && (
              <BookingSummary
                bookingData={bookingData}
                onConfirm={handleConfirmBooking}
              />
            )}

            <div className="flex justify-between mt-8">
              {step !== "vehicle" && (
                <Button onClick={handleBack} variant="outline">
                  Back
                </Button>
              )}
              {step !== "summary" ? (
                <Button 
                  onClick={handleNext}
                  disabled={
                    (step === "vehicle" && !bookingData.vehicle) ||
                    (step === "datetime" && (!bookingData.startTime || !bookingData.endTime)) ||
                    (step === "location" && !bookingData.pickupLocation)
                  }
                  className="ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleConfirmBooking}
                  className="ml-auto"
                >
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}