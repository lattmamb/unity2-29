import { Tables } from "@/integrations/supabase/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Battery, Gauge, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FleetSidebarProps {
  vehicles: Tables<"vehicles">[];
  isLoading: boolean;
  selectedVehicleId: string | null;
  onVehicleSelect: (id: string) => void;
}

export function FleetSidebar({ vehicles, isLoading, selectedVehicleId, onVehicleSelect }: FleetSidebarProps) {
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
    <div className="bg-accent/5 backdrop-blur-sm rounded-lg border border-accent/20 overflow-hidden">
      <div className="p-4 border-b border-accent/20">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          Vehicle List
        </h2>
        <p className="text-sm text-muted-foreground">
          {vehicles.length} vehicles available
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-300px)]">
        <AnimatePresence>
          <div className="p-4 space-y-4">
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="animate-pulse"
                >
                  <div className="h-24 bg-accent/20 rounded-lg" />
                </motion.div>
              ))
            ) : (
              vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onVehicleSelect(vehicle.id)}
                  className={`
                    p-4 rounded-lg cursor-pointer transition-colors
                    ${selectedVehicleId === vehicle.id 
                      ? 'bg-secondary/20 border-secondary/50' 
                      : 'bg-background/50 hover:bg-accent/10'
                    }
                    border border-accent/20
                  `}
                >
                  <div className="flex items-center space-x-4">
                    {vehicle.image_url && (
                      <img 
                        src={vehicle.image_url} 
                        alt={formatVehicleName(vehicle.name)}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{formatVehicleName(vehicle.name)}</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Battery className="h-4 w-4 mr-1" />
                          {vehicle.battery_level}%
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Zap className="h-4 w-4 mr-1" />
                          {vehicle.range_miles}mi
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Gauge className="h-4 w-4 mr-1" />
                          {vehicle.horsepower}hp
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Gauge className="h-4 w-4 mr-1" />
                          OK
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}