import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Battery, Car, Navigation, User, Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const VehicleList = () => {
  const { data: vehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const getStatusColor = (status: string) => {
    const colors = {
      available: "bg-eco/20 text-eco",
      maintenance: "bg-yellow-500/20 text-yellow-500",
      autonomous: "bg-blue-500/20 text-blue-500",
      driver_on_demand: "bg-purple-500/20 text-purple-500",
      charging: "bg-orange-500/20 text-orange-500",
      idle: "bg-gray-500/20 text-gray-500"
    };
    return colors[status as keyof typeof colors] || "bg-secondary/20 text-secondary";
  };

  return (
    <div className="space-y-4">
      {vehicles?.map((vehicle) => (
        <div
          key={vehicle.id}
          className="bg-background/5 hover:bg-background/10 transition-colors rounded-lg p-4 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            {vehicle.image_url ? (
              <img
                src={vehicle.image_url}
                alt={vehicle.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{vehicle.name}</h3>
                <div className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  getStatusColor(vehicle.status)
                )}>
                  {vehicle.status.replace('_', ' ')}
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4" />
                  <span>{vehicle.battery_level}%</span>
                </div>
                
                {vehicle.route_from && vehicle.route_to && (
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4" />
                    <span>{vehicle.route_from} → {vehicle.route_to}</span>
                  </div>
                )}
                
                {vehicle.driver_name && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{vehicle.driver_name}</span>
                  </div>
                )}
                
                {vehicle.safety_monitor && (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>{vehicle.safety_monitor}</span>
                  </div>
                )}
                
                {vehicle.eta && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>ETA: {vehicle.eta}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}