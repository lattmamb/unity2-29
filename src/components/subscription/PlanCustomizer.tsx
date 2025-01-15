import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddOnSlider } from "./AddOnSlider";
import { PricingSummary } from "./PricingSummary";

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
    <Card className="overflow-hidden">
      <CardHeader className="p-4 md:p-6 bg-accent/50">
        <CardTitle className="text-xl md:text-2xl break-words flex items-center justify-between">
          Customize Your {basePlan}
          {savings > 0 && (
            <Badge variant="secondary" className="ml-2">
              Save ${savings.toFixed(0)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-6">
        <div className="space-y-6">
          {addOns.map((addon, index) => (
            <AddOnSlider
              key={addon.name}
              {...addon}
              onChange={(value) => handleAddonChange(index, value)}
            />
          ))}
        </div>

        <PricingSummary
          basePrice={basePrice}
          savings={savings}
          totalPrice={totalPrice}
        />
      </CardContent>
    </Card>
  );
};