import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Battery, Gauge, Zap, Timer, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { Tables } from "@/integrations/supabase/types";

interface VehicleCardProps {
  vehicle: Tables<"vehicles">;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Card className="glass-card animate-fade-up card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5 text-secondary" />
          {vehicle.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          {vehicle.image_url ? (
            <img
              src={vehicle.image_url}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-accent/5">
              <Car className="h-20 w-20 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-secondary" />
            <span className="text-sm">{vehicle.horsepower} HP</span>
          </div>
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4 text-eco" />
            <span className="text-sm">{vehicle.range_miles} mi range</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-secondary" />
            <span className="text-sm">{vehicle.acceleration_0_60}s 0-60</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-secondary" />
            <span className="text-sm">{vehicle.top_speed} mph</span>
          </div>
        </div>

        <Button className="w-full glass-button" asChild>
          <Link to={`/rentals/${vehicle.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};