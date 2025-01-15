import { Tables } from "@/integrations/supabase/types";

interface VehiclePopupProps {
  vehicle: Tables<"vehicles">;
}

export function VehiclePopup({ vehicle }: VehiclePopupProps) {
  return (
    <div className="p-4 bg-background rounded-lg shadow-lg border border-accent/20">
      <h3 className="font-semibold text-lg">{vehicle.name}</h3>
      <div className="mt-2 space-y-2">
        <div className="flex items-center text-sm">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 12h-6m-6 0H5m0 0l3.5-3.5M5 12l3.5 3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {vehicle.battery_level}% battery
        </div>
        <div className="flex items-center text-sm">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {vehicle.range_miles} miles range
        </div>
      </div>
    </div>
  );
}