import { Card } from "@/components/ui/card";
import { VehicleList } from "./VehicleList";
import { FleetTracking } from "./FleetTracking";

export const FleetDashboard = () => {
  return (
    <div className="space-y-8">
      <FleetTracking />
      <VehicleList />
    </div>
  );
};