import { Tables } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Battery, Gauge, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface FleetVehicleCardProps {
  vehicle: Tables<"vehicles">;
}

export function FleetVehicleCard({ vehicle }: FleetVehicleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 bg-background/50 backdrop-blur-sm border-accent/20 group">
      <div className="aspect-[16/9] relative overflow-hidden bg-accent/5">
        {vehicle.image_url ? (
          <img
            src={vehicle.image_url}
            alt={vehicle.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <Badge
          variant="secondary"
          className="absolute top-4 right-4 bg-secondary/80 backdrop-blur-sm"
        >
          {vehicle.type}
        </Badge>
      </div>
      
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          {vehicle.name}
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center group/stat">
            <div className="p-3 rounded-lg bg-accent/5 group-hover/stat:bg-accent/10 transition-colors">
              <Battery className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <div className="text-sm font-medium">{vehicle.battery_level}%</div>
              <div className="text-xs text-muted-foreground">Battery</div>
            </div>
          </div>
          <div className="text-center group/stat">
            <div className="p-3 rounded-lg bg-accent/5 group-hover/stat:bg-accent/10 transition-colors">
              <Zap className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <div className="text-sm font-medium">{vehicle.range_miles}mi</div>
              <div className="text-xs text-muted-foreground">Range</div>
            </div>
          </div>
          <div className="text-center group/stat">
            <div className="p-3 rounded-lg bg-accent/5 group-hover/stat:bg-accent/10 transition-colors">
              <Gauge className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <div className="text-sm font-medium">{vehicle.horsepower}hp</div>
              <div className="text-xs text-muted-foreground">Power</div>
            </div>
          </div>
        </div>
        
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-secondary to-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Link to={`/rentals/${vehicle.id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
}