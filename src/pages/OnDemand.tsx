import { PageLayout } from "@/components/PageLayout";
import { MapPin, Clock, Shield } from "lucide-react";

export default function OnDemand() {
  const menuItems = [
    {
      title: "Find a Ride",
      icon: MapPin,
      description: "Book an on-demand ride",
    },
    {
      title: "Schedule Later",
      icon: Clock,
      description: "Plan your future rides",
    },
    {
      title: "Safety Features",
      icon: Shield,
      description: "Learn about our safety measures",
    },
  ];

  return (
    <PageLayout title="On-Demand Rides" menuItems={menuItems}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Coming Soon</h1>
        <p className="text-lg text-muted-foreground">
          Our on-demand ride service is currently under development. Check back soon for updates!
        </p>
      </div>
    </PageLayout>
  );
}