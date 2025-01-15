import { Progress } from "@/components/ui/progress";

interface PricingSummaryProps {
  basePrice: number;
  savings: number;
  totalPrice: number;
}

export const PricingSummary = ({ basePrice, savings, totalPrice }: PricingSummaryProps) => {
  return (
    <div className="pt-4 border-t space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Base Price</span>
          <span>${basePrice}</span>
        </div>
        {savings > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Bulk Discount</span>
            <span>-${savings.toFixed(0)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg">
          <span>Total Price</span>
          <span>${totalPrice.toFixed(0)}</span>
        </div>
      </div>

      <Progress 
        value={(totalPrice / 2000) * 100} 
        className="h-2"
      />
      
      <p className="text-sm text-muted-foreground text-center">
        {totalPrice > 1500 
          ? "Maximum plan value reached" 
          : "Adjust add-ons to customize your plan"}
      </p>
    </div>
  );
};