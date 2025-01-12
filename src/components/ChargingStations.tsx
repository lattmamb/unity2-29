import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stations = [
  {
    id: 1,
    name: "Georgia Station Hub",
    location: "123 Unity Drive",
    description: "Premium charging station with solar panels and eco-friendly design",
    imageUrl: "/lovable-uploads/9a7951c8-5fac-4e5d-9c41-4517db1e9f87.png",
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
          <h2 className="text-4xl font-bold text-center text-primary mb-4">Unity Link Charging Hub</h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Experience our state-of-the-art charging stations with solar integration and eco-friendly design
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stations.map((station) => (
            <Card 
              key={station.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={station.imageUrl}
                  alt={station.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-primary">{station.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {station.location}
                </CardDescription>
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