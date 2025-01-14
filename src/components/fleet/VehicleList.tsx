import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Battery, Car } from "lucide-react";
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
              <h3 className="font-medium truncate">{vehicle.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Battery className="h-4 w-4" />
                <span>{vehicle.battery_level}%</span>
              </div>
            </div>
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              vehicle.status === 'available' && "bg-eco/20 text-eco",
              vehicle.status === 'maintenance' && "bg-yellow-500/20 text-yellow-500",
              vehicle.status === 'in_use' && "bg-secondary/20 text-secondary"
            )}>
              {vehicle.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}