import { PageLayout } from "@/components/PageLayout";
import { FleetDashboard } from "@/components/fleet/FleetDashboard";
import { FleetStats } from "@/components/fleet/FleetStats";
import { MaintenanceAlerts } from "@/components/fleet/MaintenanceAlerts";
import { UsageReports } from "@/components/fleet/UsageReports";
import { SupportSection } from "@/components/fleet/SupportSection";
import { Car, Wrench, Battery, Map, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Fleet() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Vehicle Status",
      icon: Car,
      description: "Check real-time status of all vehicles",
    },
    {
      title: "Maintenance Schedule",
      icon: Wrench,
      description: "View and manage maintenance tasks",
    },
    {
      title: "Battery Management",
      icon: Battery,
      description: "Monitor battery levels and charging status",
    },
    {
      title: "Location Tracking",
      icon: Map,
      description: "Track vehicle locations in real-time",
    },
    {
      title: "Incident Reports",
      icon: AlertTriangle,
      description: "View and manage incident reports",
    },
  ];

  return (
    <PageLayout title="Fleet Management" menuItems={menuItems}>
      <div className="grid gap-6">
        <FleetDashboard />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FleetStats />
          <MaintenanceAlerts />
        </div>
        <UsageReports />
        <SupportSection />
      </div>
    </PageLayout>
  );
}