import { PageLayout } from "@/components/PageLayout";
import { FleetVehicleCard } from "@/components/fleet/FleetVehicleCard";
import { FleetMap } from "@/components/fleet/FleetMap";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, MapPin } from "lucide-react";

export default function Fleet() {
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

  const menuItems = [
    {
      title: "Book a Vehicle",
      icon: Car,
      description: "Reserve your next electric vehicle",
      action: () => window.location.href = "/booking"
    },
    {
      title: "Find Nearest Location",
      icon: MapPin,
      description: "Locate vehicles near you",
    },
  ];

  return (
    <PageLayout title="Our Fleet" menuItems={menuItems}>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="vehicles" className="text-lg">
              <Car className="mr-2 h-5 w-5" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg">
              <MapPin className="mr-2 h-5 w-5" />
              Map View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vehicles" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-64 bg-muted rounded-lg mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))
              ) : (
                vehicles?.map((vehicle) => (
                  <FleetVehicleCard key={vehicle.id} vehicle={vehicle} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-0">
            <FleetMap vehicles={vehicles || []} />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}