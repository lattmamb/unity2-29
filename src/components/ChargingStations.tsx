import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stations = [
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
        <div className="relative h-[500px] mb-16 rounded-xl overflow-hidden shadow-2xl">
          <img 
            src="/lovable-uploads/b8702820-bc8d-4c96-81d2-b37ff33ea397.png" 
            alt="Unity Link Charging Station" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-5xl font-bold text-center mb-6 animate-fade-up">Unity Link Supercharging</h2>
            <p className="text-xl text-center max-w-2xl px-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Experience our next-generation charging stations with solar integration and eco-friendly design
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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