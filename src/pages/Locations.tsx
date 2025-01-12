import { PageLayout } from "@/components/PageLayout";
import { MapPin, Navigation, Search, Clock, Filter } from "lucide-react";

export default function Locations() {
  const menuItems = [
    {
      title: "Find Nearest",
      icon: MapPin,
      description: "Locate the closest vehicle to you",
    },
    {
      title: "Navigation",
      icon: Navigation,
      description: "Get directions to pickup locations",
    },
    {
      title: "Search Areas",
      icon: Search,
      description: "Search for vehicles in specific areas",
    },
    {
      title: "Operating Hours",
      icon: Clock,
      description: "View location operating hours",
    },
    {
      title: "Filter Options",
      icon: Filter,
      description: "Filter locations by availability",
    },
  ];

  return (
    <PageLayout title="Locations" menuItems={menuItems}>
      <p>Locations content coming soon...</p>
    </PageLayout>
  );
}