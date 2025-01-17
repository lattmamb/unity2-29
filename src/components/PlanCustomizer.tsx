import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type AddOn = {
  name: string;
  price: number;
  value: number;
  max: number;
  step: number;
  unit: string;
};

export const PlanCustomizer = ({
  basePlan,
  basePrice,
}: {
  basePlan: string;
  basePrice: number;
}) => {
  const [addOns, setAddOns] = useState<AddOn[]>([
    { 
      name: "Additional Miles", 
      price: 100, 
      value: 0, 
      max: 1000,
      step: 100,
      unit: "miles"
    },
    { 
      name: "Priority Support", 
      price: 50, 
      value: 0,
      max: 3,
      step: 1,
      unit: "level"
    },
    {
      name: "Additional Vehicles",
      price: 200,
      value: 0,
      max: 2,
      step: 1,
      unit: "vehicles"
    }
  ]);

  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // Calculate bulk discount savings
    const totalAddOns = addOns.reduce((acc, addon) => acc + addon.price * addon.value, 0);
    const bulkDiscount = totalAddOns > 500 ? totalAddOns * 0.1 : 0;
    setSavings(bulkDiscount);
  }, [addOns]);

  const totalPrice = basePrice + 
    addOns.reduce((acc, addon) => acc + addon.price * addon.value, 0) - 
    savings;

  const handleAddonChange = (index: number, value: number[]) => {
    setAddOns((prev) =>
      prev.map((addon, i) => 
        i === index 
          ? { ...addon, value: Math.max(0, value[0]) }
          : addon
      )
    );
  };

  return (
    <Card className="glass-card">
      <CardHeader className="p-4 md:p-6 bg-gradient-to-r from-blue-500/10 to-violet-500/10 backdrop-blur-sm">
        <CardTitle className="text-xl md:text-2xl break-words flex items-center justify-between text-primary-foreground">
          Customize Your {basePlan}
          {savings > 0 && (
            <Badge variant="secondary" className="ml-2 bg-green-500/20 text-green-400 border border-green-500/30">
              Save ${savings.toFixed(0)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-6">
        <div className="space-y-6">
          {addOns.map((addon, index) => (
            <div key={addon.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-base break-words text-primary-foreground">
                  {addon.name}
                </Label>
                <div className="text-sm text-primary">
                  +${addon.price * addon.value}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    value={[addon.value]}
                    max={addon.max}
                    step={addon.step}
                    onValueChange={(value) => handleAddonChange(index, value)}
                    className="w-full"
                  />
                </div>
                <div className="w-16 text-right text-sm text-muted-foreground">
                  {addon.value} {addon.unit}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Base Price</span>
              <span>${basePrice}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm text-green-400">
                <span>Bulk Discount</span>
                <span>-${savings.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg text-primary-foreground">
              <span>Total Price</span>
              <span>${totalPrice.toFixed(0)}</span>
            </div>
          </div>

          <Progress 
            value={(totalPrice / 2000) * 100} 
            className="h-2 bg-primary/20"
          />
          
          <p className="text-sm text-muted-foreground text-center">
            {totalPrice > 1500 
              ? "Maximum plan value reached" 
              : "Adjust add-ons to customize your plan"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};