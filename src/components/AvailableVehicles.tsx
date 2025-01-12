import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export const AvailableVehicles = () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Available Vehicles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {vehicles?.map((vehicle) => (
          <div key={vehicle.id} className="flex items-center justify-between p-2 bg-accent rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{vehicle.name}</p>
                <p className="text-sm text-muted-foreground">
                  Battery: {vehicle.battery_level}%
                </p>
              </div>
            </div>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>
        ))}
        <Button className="w-full" variant="outline" asChild>
          <Link to="/fleet">View All Vehicles</Link>
        </Button>
      </CardContent>
    </Card>
  );
};