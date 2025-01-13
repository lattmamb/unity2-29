import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Car, Battery } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export const ActiveRentals = () => {
  const { user } = useAuth();

  const { data: activeBookings } = useQuery({
    queryKey: ["active-bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          vehicles (*)
        `)
        .eq("user_id", user?.id)
        .eq("status", "active")
        .limit(1);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!activeBookings?.length) {
    return (
      <Card className="glass-card animate-fade-up [animation-delay:400ms]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary">
            <Clock className="h-5 w-5" />
            Active Rentals
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-pulse-soft" />
          <p className="text-muted-foreground">No active rentals</p>
          <Button className="mt-4 glass-button">
            Book a Vehicle
          </Button>
        </CardContent>
      </Card>
    );
  }

  const booking = activeBookings[0];
  const vehicle = booking.vehicles;

  return (
    <Card className="glass-card animate-fade-up [animation-delay:400ms]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Clock className="h-5 w-5" />
          Active Rental
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Vehicle</p>
          <div className="flex items-center gap-2 text-secondary">
            <Car className="h-4 w-4" />
            <p className="font-medium">{vehicle.name}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Battery Level</p>
          <div className="flex items-center gap-2 text-secondary">
            <Battery className="h-4 w-4" />
            <p>{vehicle.battery_level}%</p>
          </div>
        </div>
        <Button className="w-full glass-button">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};