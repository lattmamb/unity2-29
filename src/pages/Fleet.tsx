import { Navigation } from "@/components/Navigation";
import { FleetTracking } from "@/components/fleet/FleetTracking";
import { VehicleList } from "@/components/fleet/VehicleList";
import { FleetStats } from "@/components/fleet/FleetStats";
import { DriverStats } from "@/components/fleet/DriverStats";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Wallet } from "lucide-react";

export default function Fleet() {
  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <Navigation />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">MyFleet Dashboard</h1>
            <p className="text-muted-foreground">
              Track and manage your electric vehicle fleet
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Wallet className="h-4 w-4" />
              Add Balance
            </Button>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Vehicle
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Vehicle List */}
          <div className="col-span-3 space-y-4">
            <div className="bg-accent/10 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Fleet Overview</h2>
              <VehicleList />
            </div>
          </div>

          {/* Main Content Area - Map and Stats */}
          <div className="col-span-9 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FleetStats />
              <DriverStats />
            </div>
            <div className="bg-accent/10 rounded-lg p-4">
              <FleetTracking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}