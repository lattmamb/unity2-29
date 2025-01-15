import { PageLayout } from "@/components/PageLayout";
import { MapPin, Navigation, Search, Clock, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

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

  const locations = [
    {
      name: "Downtown Hub",
      address: "123 Main Street",
      status: "Open",
      availableVehicles: 5,
      hours: "9 AM - 9 PM",
    },
    {
      name: "Airport Terminal",
      address: "456 Airport Road",
      status: "Open",
      availableVehicles: 8,
      hours: "24/7",
    },
    {
      name: "Shopping Center",
      address: "789 Market Avenue",
      status: "Open",
      availableVehicles: 3,
      hours: "10 AM - 8 PM",
    },
  ];

  return (
    <PageLayout title="Locations" menuItems={menuItems}>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
          <div className="relative">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Find Your Nearest Location
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover our convenient pickup locations across the city. Each hub is equipped
              with charging stations and secure parking facilities.
            </p>
          </div>
        </div>

        {/* Locations Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {locations.map((location, index) => (
            <motion.div key={index} variants={item}>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">
                        {location.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {location.address}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                      {location.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Available Vehicles</span>
                      <span className="font-medium text-primary">
                        {location.availableVehicles}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Hours</span>
                      <span className="font-medium text-primary">{location.hours}</span>
                    </div>
                    
                    <div className="pt-4">
                      <button className="w-full glass-button py-2 px-4">
                        View Details
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
}