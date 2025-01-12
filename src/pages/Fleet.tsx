import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FleetDashboard } from "@/components/fleet/FleetDashboard";
import { FleetStats } from "@/components/fleet/FleetStats";
import { MaintenanceAlerts } from "@/components/fleet/MaintenanceAlerts";
import { UsageReports } from "@/components/fleet/UsageReports";
import { SupportSection } from "@/components/fleet/SupportSection";

export default function Fleet() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Fleet Management</h1>
        <div className="grid gap-6">
          <FleetDashboard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FleetStats />
            <MaintenanceAlerts />
          </div>
          <UsageReports />
          <SupportSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}