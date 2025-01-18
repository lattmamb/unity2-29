import { PageLayout } from "@/components/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Vehicle3DViewer } from "@/components/rentals/Vehicle3DViewer";
import { CustomizationPanel } from "@/components/customization/CustomizationPanel";
import { useState } from "react";
import { Brush, Car, Palette, Zap } from "lucide-react";

export default function VehicleCustomization() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const { data: vehicles } = useQuery({
    queryKey: ["vehicles-customization"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const menuItems = [
    {
      title: "Paint Options",
      icon: Palette,
      description: "Choose from premium paint colors",
    },
    {
      title: "Exterior Features",
      icon: Car,
      description: "Customize wheels and body kit",
    },
    {
      title: "Performance",
      icon: Zap,
      description: "Enhance vehicle performance",
    },
    {
      title: "Wraps & Graphics",
      icon: Brush,
      description: "Add custom wraps and decals",
    },
  ];

  return (
    <PageLayout title="Vehicle Customization" menuItems={menuItems}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-2xl font-bold">Interactive Preview</h2>
            <div className="aspect-video bg-black/5 rounded-lg">
              {selectedVehicle && vehicles?.find(v => v.id === selectedVehicle)?.model_3d_url ? (
                <Vehicle3DViewer 
                  modelUrl={vehicles.find(v => v.id === selectedVehicle)?.model_3d_url || ''} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Select a vehicle to customize
                </div>
              )}
            </div>
          </div>

          <CustomizationPanel 
            vehicles={vehicles || []}
            selectedVehicle={selectedVehicle}
            onVehicleSelect={setSelectedVehicle}
          />
        </div>
      </div>
    </PageLayout>
  );
}