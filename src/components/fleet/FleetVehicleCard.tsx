import { Tables } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Battery, Gauge, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface FleetVehicleCardProps {
  vehicle: Tables<"vehicles">;
}

export function FleetVehicleCard({ vehicle }: FleetVehicleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[16/9] relative overflow-hidden bg-muted">
        {vehicle.image_url ? (
          <img
            src={vehicle.image_url}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
        ) : null}
        <Badge
          variant="secondary"
          className="absolute top-4 right-4"
        >
          {vehicle.type}
        </Badge>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-4">{vehicle.name}</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Battery className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-sm font-medium">{vehicle.battery_level}%</div>
            <div className="text-xs text-muted-foreground">Battery</div>
          </div>
          <div className="text-center">
            <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-sm font-medium">{vehicle.range_miles}mi</div>
            <div className="text-xs text-muted-foreground">Range</div>
          </div>
          <div className="text-center">
            <Gauge className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-sm font-medium">{vehicle.horsepower}hp</div>
            <div className="text-xs text-muted-foreground">Power</div>
          </div>
        </div>
        
        <Button asChild className="w-full">
          <Link to={`/rentals/${vehicle.id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
}