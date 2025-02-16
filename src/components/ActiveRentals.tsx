import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Car, Battery, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Link } from "react-router-dom";

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
      <Card className="bg-background/50 backdrop-blur-sm border-accent/10 hover:border-accent/20 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary">
            <Clock className="h-5 w-5" />
            Active Rentals
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No active rentals</p>
          <Button 
            asChild
            className="bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <Link to="/booking">Book a Vehicle</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const booking = activeBookings[0];
  const vehicle = booking.vehicles;

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-accent/10 hover:border-accent/20 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Clock className="h-5 w-5" />
          Active Rental
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
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

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Location</p>
            <div className="flex items-center gap-2 text-secondary">
              <MapPin className="h-4 w-4" />
              <p className="text-sm">Current Location</p>
            </div>
          </div>
        </div>

        <Button 
          asChild
          className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          <Link to={`/rentals/${vehicle.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};