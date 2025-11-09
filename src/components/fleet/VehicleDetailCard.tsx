import { Card } from "@/components/ui/card";
import { StatusBadge, VehicleStatus } from "@/components/ui/status-badge";
import { Tables } from "@/integrations/supabase/types";
import { MapPin, Battery, Gauge, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleDetailCardProps {
  vehicle: Tables<"vehicles">;
  isSelected?: boolean;
  onClick?: () => void;
}

export function VehicleDetailCard({ vehicle, isSelected, onClick }: VehicleDetailCardProps) {
  const status = vehicle.status as VehicleStatus;

  return (
    <Card
      onClick={onClick}
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]",
        "border-border backdrop-blur-sm",
        isSelected
          ? "border-teal bg-teal/5 shadow-lg shadow-teal/20"
          : "hover:border-cyan/50 hover:shadow-lg hover:shadow-cyan/10"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-bold mb-1">{vehicle.name}</h4>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            ID: {vehicle.id.slice(0, 8)}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xl font-bold text-cyan">{vehicle.battery_level || 85}%</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide flex items-center justify-center gap-1 mt-1">
            <Battery className="w-3 h-3" />
            Battery
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-cyan">{vehicle.range_miles || 280}mi</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide flex items-center justify-center gap-1 mt-1">
            <Gauge className="w-3 h-3" />
            Range
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-cyan">{vehicle.horsepower || 450}hp</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide flex items-center justify-center gap-1 mt-1">
            <Zap className="w-3 h-3" />
            Power
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-teal animate-pulse-glow" />
        <MapPin className="w-4 h-4" />
        <span>San Francisco, CA</span>
      </div>
    </Card>
  );
}
