import { PageLayout } from "@/components/PageLayout";
import { ChargingStations as ChargingStationsComponent } from "@/components/ChargingStations";
import { MapPin, Battery, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ChargingStations = () => {
  const handleFindNearest = () => {
    // In a real app, this would use geolocation and query the nearest stations
    toast({
      title: "Finding Nearest Station",
      description: "Searching for charging stations near your location...",
    });
  };

  const handleCheckAvailability = () => {
    toast({
      title: "Checking Availability",
      description: "Loading real-time charging station availability...",
    });
  };

  const handleViewHistory = () => {
    toast({
      title: "Charging History",
      description: "Loading your charging session history...",
    });
  };

  const menuItems = [
    {
      title: "Find Nearest Station",
      icon: MapPin,
      description: "Locate the closest charging station to your current location",
      action: handleFindNearest,
    },
    {
      title: "Check Availability",
      icon: Battery,
      description: "View real-time availability of charging stations",
      action: handleCheckAvailability,
    },
    {
      title: "Charging History",
      icon: Clock,
      description: "View your charging session history",
      action: handleViewHistory,
    },
  ];

  return (
    <PageLayout title="Charging Stations" menuItems={menuItems}>
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              onClick={item.action}
              className="flex items-center gap-2"
              variant="secondary"
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </div>
        <ChargingStationsComponent />
      </div>
    </PageLayout>
  );
};

export default ChargingStations;