import { useState } from "react";
import { FleetDashboard } from "@/components/fleet/FleetDashboard";
import { FleetStats } from "@/components/fleet/FleetStats";
import { MaintenanceAlerts } from "@/components/fleet/MaintenanceAlerts";
import { UsageReports } from "@/components/fleet/UsageReports";
import { SupportSection } from "@/components/fleet/SupportSection";
import { Car, Wrench, Battery, Map, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Navigation } from "@/components/Navigation";

export default function Fleet() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col">
        <div className="p-4 border-b">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="ml-4">
                Quick Actions
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Quick Actions</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto py-4"
                  >
                    <div className="flex items-start space-x-4">
                      <item.icon className="h-5 w-5 mt-0.5" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.title}</div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex-1">
          <FleetDashboard />
        </div>
      </div>
    </div>
  );
}