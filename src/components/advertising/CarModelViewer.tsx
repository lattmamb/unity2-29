import { Vehicle3DViewer } from "@/components/rentals/Vehicle3DViewer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

export const CarModelViewer = () => {
  const [activeTab, setActiveTab] = useState("digital");

  const handleCustomizeDigitalAd = () => {
    toast.success("Opening digital ad customization");
  };

  const handleDesignWrap = () => {
    toast.success("Opening wrap designer");
  };

  return (
    <Card className="p-6 glass-card">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4">Interactive Preview</h3>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="digital" className="flex-1">Digital Display</TabsTrigger>
              <TabsTrigger value="wrap" className="flex-1">Vehicle Wrap</TabsTrigger>
            </TabsList>
            <TabsContent value="digital" className="mt-4">
              <div className="aspect-video bg-black/5 rounded-lg mb-4">
                <Vehicle3DViewer modelUrl="/models/tesla_model_3.glb" />
              </div>
              <Button 
                className="w-full" 
                variant="secondary"
                onClick={handleCustomizeDigitalAd}
              >
                Customize Digital Ad
              </Button>
            </TabsContent>
            <TabsContent value="wrap" className="mt-4">
              <div className="aspect-video bg-black/5 rounded-lg mb-4">
                <Vehicle3DViewer modelUrl="/models/tesla_model_y.glb" />
              </div>
              <Button 
                className="w-full" 
                variant="secondary"
                onClick={handleDesignWrap}
              >
                Design Wrap
              </Button>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full md:w-80 space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium">Preview Controls</h4>
            <p className="text-sm text-muted-foreground">
              {activeTab === "digital" 
                ? "Click and drag to rotate the vehicle. Use the scroll wheel to zoom in/out and preview digital display placement."
                : "Rotate the vehicle to see wrap coverage options and preview your design on different vehicle surfaces."}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Available Vehicles</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>Tesla Model 3</li>
              <li>Tesla Model Y</li>
              <li>Tesla Model S</li>
              <li>Tesla Model X</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};