import { Card } from "@/components/ui/card";
import { VehicleList } from "./VehicleList";
import { FleetTracking } from "./FleetTracking";
import { Vehicle3DViewer } from "./Vehicle3DViewer";

export const FleetDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Vehicle Model</h2>
          <Vehicle3DViewer modelUrl="/models/tesla_model_3.glb" />
        </Card>
      </div>
      <FleetTracking />
      <VehicleList />
    </div>
  );
};