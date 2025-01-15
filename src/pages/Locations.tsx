import { PageLayout } from "@/components/PageLayout";
import { MapPin, Navigation, Search, Clock, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationMap from "./LocationMap";

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

const locations = [
  {
    name: "Downtown Hub",
    address: "123 Main Street",
    status: "Open",
    availableVehicles: 5,
    hours: "9 AM - 9 PM",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    coordinates: [-122.4194, 37.7749] as [number, number],
    isUnityCharger: true
  },
  {
    name: "Airport Terminal",
    address: "456 Airport Road",
    status: "Open",
    availableVehicles: 8,
    hours: "24/7",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    coordinates: [-122.3892, 37.6213] as [number, number],
    isUnityCharger: true
  },
  {
    name: "Shopping Center",
    address: "789 Market Avenue",
    status: "Open",
    availableVehicles: 3,
    hours: "10 AM - 8 PM",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    coordinates: [-122.4014, 37.7899] as [number, number],
    isUnityCharger: false
  }
];

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
      <div className="space-y-8">
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

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {locations.map((location, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={location.image} 
                        alt={location.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                      {location.isUnityCharger && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-primary/80 text-white backdrop-blur-sm">
                            Unity Charger
                          </Badge>
                        </div>
                      )}
                    </div>
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
          </TabsContent>
          
          <TabsContent value="map" className="h-[600px] rounded-lg overflow-hidden">
            <LocationMap locations={locations} />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}