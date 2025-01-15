import { PageLayout } from "@/components/PageLayout";
import { FleetVehicleCard } from "@/components/fleet/FleetVehicleCard";
import { FleetMap } from "@/components/fleet/FleetMap";
import { FleetSidebar } from "@/components/fleet/FleetSidebar";
import { FleetMetrics } from "@/components/fleet/FleetMetrics";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, MapPin, Settings, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function Fleet() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "available");
      
      if (error) {
        toast.error("Failed to load vehicles");
        throw error;
      }
      return data;
    },
  });

  const menuItems = [
    {
      title: "Vehicle Settings",
      icon: Settings,
      description: "Configure vehicle parameters and maintenance schedules",
      action: () => toast.info("Vehicle settings coming soon")
    },
    {
      title: "Maintenance Alerts",
      icon: AlertCircle,
      description: "View and manage vehicle maintenance alerts",
      action: () => toast.info("Maintenance alerts coming soon")
    },
  ];

  return (
    <PageLayout title="Fleet Management" menuItems={menuItems}>
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-background to-accent/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[350px,1fr] gap-6"
        >
          <FleetSidebar 
            vehicles={vehicles || []} 
            isLoading={isLoading}
            selectedVehicleId={selectedVehicleId}
            onVehicleSelect={setSelectedVehicleId}
          />
          
          <div className="space-y-6">
            <FleetMetrics vehicles={vehicles || []} />
            
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-accent/10 backdrop-blur-sm p-1 rounded-full">
                <TabsTrigger 
                  value="map" 
                  className="text-lg rounded-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all duration-300"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Map View
                </TabsTrigger>
                <TabsTrigger 
                  value="grid" 
                  className="text-lg rounded-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all duration-300"
                >
                  <Car className="mr-2 h-5 w-5" />
                  Grid View
                </TabsTrigger>
              </TabsList>
              
              <AnimatePresence mode="wait">
                <TabsContent value="map" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FleetMap 
                      vehicles={vehicles || []} 
                      selectedVehicleId={selectedVehicleId}
                      onVehicleSelect={setSelectedVehicleId}
                    />
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="grid" className="mt-0">
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {isLoading ? (
                      Array(6).fill(0).map((_, i) => (
                        <motion.div
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                          }}
                          className="animate-pulse"
                        >
                          <div className="h-64 bg-accent/20 rounded-lg mb-4" />
                          <div className="h-4 bg-accent/20 rounded w-3/4 mb-2" />
                          <div className="h-4 bg-accent/20 rounded w-1/2" />
                        </motion.div>
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
              </AnimatePresence>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}