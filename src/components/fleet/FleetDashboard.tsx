import { Card } from "@/components/ui/card";
import { VehicleList } from "./VehicleList";
import { FleetTracking } from "./FleetTracking";
import { FleetStats } from "./FleetStats";
import { Vehicle3DViewer } from "./Vehicle3DViewer";

export const FleetDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar - Vehicle List */}
      <div className="lg:col-span-3 space-y-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Fleet Overview</h2>
          <VehicleList />
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-9 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats Cards */}
          <FleetStats />
          
          {/* 3D Vehicle Model */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Vehicle Model</h2>
            <Vehicle3DViewer modelUrl="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/tesla-model-3/model.gltf" />
          </Card>
        </div>

        {/* Map and Timeline */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Live Tracking</h2>
          <FleetTracking />
        </Card>
      </div>
    </div>
  );
};