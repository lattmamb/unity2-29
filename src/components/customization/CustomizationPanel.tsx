import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Car, Palette, Gauge, Wrench } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CustomizationPanelProps {
  vehicles: Tables<"vehicles">[];
  selectedVehicle: string | null;
  onVehicleSelect: (id: string) => void;
}

export function CustomizationPanel({ 
  vehicles, 
  selectedVehicle, 
  onVehicleSelect 
}: CustomizationPanelProps) {
  const [selectedColor, setSelectedColor] = useState("white");
  const [performance, setPerformance] = useState({
    power: 0,
    handling: 0,
    efficiency: 0
  });

  const colors = [
    { id: "white", name: "Pearl White", hex: "#FFFFFF" },
    { id: "black", name: "Solid Black", hex: "#000000" },
    { id: "blue", name: "Deep Blue", hex: "#1E40AF" },
    { id: "red", name: "Racing Red", hex: "#DC2626" },
    { id: "silver", name: "Metallic Silver", hex: "#94A3B8" }
  ];

  const handleSaveCustomization = () => {
    toast.success("Customization saved successfully!");
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Customize Your Vehicle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Select Vehicle</Label>
          <RadioGroup
            value={selectedVehicle || undefined}
            onValueChange={onVehicleSelect}
            className="grid grid-cols-2 gap-4"
          >
            {vehicles.map((vehicle) => (
              <div key={vehicle.id}>
                <RadioGroupItem
                  value={vehicle.id}
                  id={vehicle.id}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={vehicle.id}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-accent/5 p-4 hover:bg-accent/10 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Car className="mb-2 h-6 w-6" />
                  <span className="text-sm font-medium">{vehicle.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {selectedVehicle && (
          <Tabs defaultValue="exterior" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="exterior">
                <Palette className="h-4 w-4 mr-2" />
                Exterior
              </TabsTrigger>
              <TabsTrigger value="performance">
                <Gauge className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="upgrades">
                <Wrench className="h-4 w-4 mr-2" />
                Upgrades
              </TabsTrigger>
            </TabsList>

            <TabsContent value="exterior" className="space-y-4">
              <div className="space-y-2">
                <Label>Paint Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-full aspect-square rounded-full border-2 ${
                        selectedColor === color.id ? "border-primary" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Power Boost</Label>
                  <Slider
                    value={[performance.power]}
                    onValueChange={(value) => setPerformance(prev => ({ ...prev, power: value[0] }))}
                    max={100}
                    step={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Handling</Label>
                  <Slider
                    value={[performance.handling]}
                    onValueChange={(value) => setPerformance(prev => ({ ...prev, handling: value[0] }))}
                    max={100}
                    step={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Efficiency</Label>
                  <Slider
                    value={[performance.efficiency]}
                    onValueChange={(value) => setPerformance(prev => ({ ...prev, efficiency: value[0] }))}
                    max={100}
                    step={10}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upgrades" className="space-y-4">
              <div className="space-y-2">
                <Label>Available Upgrades</Label>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start">
                    <Wrench className="mr-2 h-4 w-4" />
                    Enhanced Autopilot
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Wrench className="mr-2 h-4 w-4" />
                    Performance Package
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Wrench className="mr-2 h-4 w-4" />
                    Premium Interior
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        <Button 
          className="w-full" 
          disabled={!selectedVehicle}
          onClick={handleSaveCustomization}
        >
          Save Customization
        </Button>
      </CardContent>
    </Card>
  );
}