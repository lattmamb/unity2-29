import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stations = [
  {
    id: 1,
    name: "Downtown Hub",
    location: "123 Main Street",
    description: "Central charging station with 24/7 access and fast charging capabilities",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Shopping Center Hub",
    location: "456 Market Avenue",
    description: "Convenient charging while you shop, with multiple charging points",
    imageUrl: "https://images.unsplash.com/photo-1647500666543-6a42566926dd?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Business District Hub",
    location: "789 Commerce Boulevard",
    description: "Premium charging station with dedicated business parking",
    imageUrl: "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Residential Area Hub",
    location: "321 Neighborhood Lane",
    description: "Local community charging station with easy access",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80",
  },
];

export const ChargingStations = () => {
  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <img 
            src="/lovable-uploads/e00776b3-1f80-47c3-bccc-d21f9cd40dd6.png" 
            alt="Unity Link Logo" 
            className="w-32 h-32 mb-6 animate-float"
          />
          <h2 className="text-4xl font-bold text-center text-primary">Unity Link Charging Hub</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stations.map((station) => (
            <Card key={station.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={station.imageUrl}
                  alt={station.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{station.name}</CardTitle>
                <CardDescription>{station.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{station.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};