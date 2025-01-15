import { PageLayout } from "@/components/PageLayout";
import { FleetVehicleCard } from "@/components/fleet/FleetVehicleCard";
import { FleetMap } from "@/components/fleet/FleetMap";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <PageLayout title="Our Fleet" menuItems={menuItems}>
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-background to-accent/5">
        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-accent/10 backdrop-blur-sm p-1 rounded-full">
            <TabsTrigger 
              value="vehicles" 
              className="text-lg rounded-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all duration-300"
            >
              <Car className="mr-2 h-5 w-5" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              className="text-lg rounded-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all duration-300"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Map View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vehicles" className="mt-0">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-64 bg-accent/20 rounded-lg mb-4" />
                    <div className="h-4 bg-accent/20 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-accent/20 rounded w-1/2" />
                  </div>
                ))
              ) : (
                vehicles?.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <FleetVehicleCard vehicle={vehicle} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FleetMap vehicles={vehicles || []} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}