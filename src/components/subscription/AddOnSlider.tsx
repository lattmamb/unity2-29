import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface AddOnSliderProps {
  name: string;
  value: number;
  price: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number[]) => void;
}

export const AddOnSlider = ({ 
  name, 
  value, 
  price, 
  max, 
  step, 
  unit, 
  onChange 
}: AddOnSliderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-base break-words">
          {name}
        </Label>
        <div className="text-sm text-muted-foreground">
          +${price * value}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Slider
            value={[value]}
            max={max}
            step={step}
            onValueChange={onChange}
            className="w-full"
          />
        </div>
        <div className="w-16 text-right text-sm">
          {value} {unit}
        </div>
      </div>
    </div>
  );
};