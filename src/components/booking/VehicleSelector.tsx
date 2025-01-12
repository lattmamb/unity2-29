import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, Car } from "lucide-react";

type VehicleSelectorProps = {
  selected?: Tables<"vehicles">;
  onSelect: (vehicle: Tables<"vehicles">) => void;
};

export function VehicleSelector({ selected, onSelect }: VehicleSelectorProps) {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "available");
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-48 bg-muted rounded-md mb-4" />
            <div className="h-6 bg-muted rounded w-3/4 mb-2" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Select a Vehicle</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles?.map((vehicle) => (
          <Card
            key={vehicle.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selected?.id === vehicle.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelect(vehicle)}
          >
            <div className="aspect-video bg-muted rounded-md mb-4 relative overflow-hidden">
              {vehicle.image_url ? (
                <img
                  src={vehicle.image_url}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Car className="w-full h-full p-8 text-muted-foreground" />
              )}
              <Badge
                variant="secondary"
                className="absolute top-2 right-2"
              >
                {vehicle.type}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold mb-2">{vehicle.name}</h3>
            <div className="flex items-center text-muted-foreground">
              <Battery className="mr-2 h-4 w-4" />
              <span>{vehicle.battery_level}% battery</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}