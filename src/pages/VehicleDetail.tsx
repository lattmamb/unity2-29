import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Vehicle3DViewer } from "@/components/rentals/Vehicle3DViewer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Battery, Gauge, Zap, Timer, Car, Calendar } from "lucide-react";

export default function VehicleDetail() {
  const { id } = useParams();

  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const menuItems = [
    {
      title: "Book Now",
      icon: Calendar,
      description: "Reserve this vehicle",
    },
    {
      title: "Vehicle Specs",
      icon: Car,
      description: "View detailed specifications",
    },
  ];

  if (isLoading) {
    return (
      <PageLayout title="Loading..." menuItems={menuItems}>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-[400px] bg-accent/5 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-accent/5 rounded w-1/3" />
              <div className="h-4 bg-accent/5 rounded w-2/3" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!vehicle) return null;

  return (
    <PageLayout title={vehicle.name} menuItems={menuItems}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <Vehicle3DViewer modelUrl={vehicle.model_3d_url || ''} />
          </div>

          <div className="space-y-8">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-secondary" />
                    <span className="text-lg">{vehicle.horsepower} HP</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Horsepower</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-eco" />
                    <span className="text-lg">{vehicle.range_miles} mi</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Range</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-secondary" />
                    <span className="text-lg">{vehicle.acceleration_0_60}s</span>
                  </div>
                  <p className="text-sm text-muted-foreground">0-60 mph</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-secondary" />
                    <span className="text-lg">{vehicle.top_speed} mph</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Top Speed</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full glass-button">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}