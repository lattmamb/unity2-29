import { PageLayout } from "@/components/PageLayout";
import { ChargingStations as ChargingStationsComponent } from "@/components/ChargingStations";
import { MapPin, Battery, Clock } from "lucide-react";

const ChargingStations = () => {
  const menuItems = [
    {
      title: "Find Nearest Station",
      icon: MapPin,
      description: "Locate the closest charging station to your current location",
    },
    {
      title: "Check Availability",
      icon: Battery,
      description: "View real-time availability of charging stations",
    },
    {
      title: "Charging History",
      icon: Clock,
      description: "View your charging session history",
    },
  ];

  return (
    <PageLayout title="Charging Stations" menuItems={menuItems}>
      <ChargingStationsComponent />
    </PageLayout>
  );
};

export default ChargingStations;