import { PageLayout } from "@/components/PageLayout";
import { MapPin, Navigation, Search, Clock, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="responsive-grid">
              {[1, 2, 3].map((location) => (
                <div
                  key={location}
                  className="flex flex-col space-y-2 p-4 rounded-lg bg-accent/50"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold">Location {location}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    123 Example Street, City, State
                  </p>
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">Open</span>
                    <span className="text-muted-foreground"> • 9 AM - 9 PM</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}