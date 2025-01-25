import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Battery } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export const AvailableVehicles = () => {
  const navigate = useNavigate();
  
  const { data: vehicles } = useQuery({
    queryKey: ["available-vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "available")
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  const handleBookNow = (vehicleId: string) => {
    navigate(`/booking?vehicle=${vehicleId}`);
    toast({
      title: "Starting Booking Process",
      description: "Please complete your vehicle reservation.",
    });
  };

  return (
    <Card className="bg-rental-dark/50 backdrop-blur-sm border-rental-light/10 hover:border-rental-light/20 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-rental-light">
          <Car className="h-5 w-5" />
          Available Vehicles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {vehicles?.map((vehicle) => (
          <div 
            key={vehicle.id} 
            className="flex items-center justify-between p-6 bg-rental-light/5 backdrop-blur-sm 
              border border-rental-light/10 rounded-lg transition-all duration-300 
              hover:bg-rental-light/10 hover:border-rental-light/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rental-blue/10 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-rental-blue" />
              </div>
              <div>
                <p className="font-medium text-rental-light">{vehicle.name}</p>
                <div className="flex items-center gap-2 text-sm text-rental-light/60">
                  <Battery className="h-4 w-4" />
                  <span>{vehicle.battery_level}%</span>
                </div>
              </div>
            </div>
            <Button 
              className="glass-button"
              onClick={() => handleBookNow(vehicle.id)}
            >
              Book Now
            </Button>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          className="w-full border-rental-light/20 text-rental-light hover:bg-rental-light/10"
          asChild
        >
          <Link to="/fleet">View All Vehicles</Link>
        </Button>
      </CardContent>
    </Card>
  );
};