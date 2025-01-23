import { Tables } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { VehicleStats } from "./VehicleStats";

interface FleetVehicleCardProps {
  vehicle: Tables<"vehicles">;
}

export function FleetVehicleCard({ vehicle }: FleetVehicleCardProps) {
  const formatVehicleName = (name: string) => {
    // Convert names to proper model format
    const modelMap: Record<string, string> = {
      'model y': 'Model Y',
      'model x': 'Model X',
      'model s': 'Model S',
      'model 3': 'Model 3',
      'bmw i4': 'Tesla Model 3', // Replace BMW i4 with Tesla Model 3
    };
    
    const lowercaseName = name.toLowerCase();
    return modelMap[lowercaseName] || name;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 bg-background/50 backdrop-blur-sm border-accent/20 group">
      <motion.div 
        className="aspect-[16/9] relative overflow-hidden bg-accent/5"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {vehicle.image_url ? (
          <img
            src={vehicle.image_url}
            alt={formatVehicleName(vehicle.name)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <Badge
          variant="secondary"
          className="absolute top-4 right-4 bg-secondary/80 backdrop-blur-sm"
        >
          {vehicle.type}
        </Badge>
      </motion.div>
      
      <div className="p-6 space-y-6">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          {formatVehicleName(vehicle.name)}
        </h3>
        
        <VehicleStats 
          batteryLevel={vehicle.battery_level || 0}
          rangeMiles={vehicle.range_miles || 0}
          horsepower={vehicle.horsepower || 0}
        />
        
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