import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type AddOn = {
  name: string;
  price: number;
  value: number;
};

export const PlanCustomizer = ({
  basePlan,
  basePrice,
}: {
  basePlan: string;
  basePrice: number;
}) => {
  const [addOns, setAddOns] = useState<AddOn[]>([
    { name: "Additional Miles", price: 100, value: 0 },
    { name: "Priority Support", price: 50, value: 0 },
  ]);

  const totalPrice = basePrice + addOns.reduce((acc, addon) => acc + addon.price * addon.value, 0);

  const handleAddonChange = (index: number, value: number) => {
    setAddOns((prev) =>
      prev.map((addon, i) => (i === index ? { ...addon, value: Math.max(0, value) } : addon))
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl break-words">Customize Your {basePlan}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="space-y-4 md:space-y-6">
          {addOns.map((addon, index) => (
            <div key={addon.name} className="space-y-2">
              <Label className="block break-words">
                {addon.name} (+${addon.price}/unit)
              </Label>
              <Input
                type="number"
                min="0"
                value={addon.value}
                onChange={(e) => handleAddonChange(index, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          ))}

          <div className="space-y-2">
            <div className="flex justify-between text-sm md:text-base">
              <span>Base Price</span>
              <span>${basePrice}</span>
            </div>
            <div className="flex justify-between font-bold text-sm md:text-base">
              <span>Total Price</span>
              <span>${totalPrice}</span>
            </div>
          </div>

          <Progress value={(totalPrice / 2000) * 100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};