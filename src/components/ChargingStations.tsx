import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

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
    <section className="min-h-screen bg-rental-dark">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-4 bg-rental-blue/10 px-6 py-3 rounded-full backdrop-blur-sm mb-6 border border-rental-blue/20">
            <div className="text-rental-cyan font-semibold">UNITY LINK</div>
            <div className="w-px h-6 bg-rental-blue/20" />
            <div className="text-rental-blue">Universal Charging Hub</div>
          </div>
          <h2 className="hero-title mb-4">
            Unity Link Charging Hub
          </h2>
          <p className="text-lg md:text-xl text-center max-w-2xl mx-auto text-white/80">
            Experience our state-of-the-art charging stations with integrated amenities and eco-friendly design
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[80vh] mb-16 rounded-xl overflow-hidden glass-card"
        >
          <img 
            src="/lovable-uploads/2f3ebc7e-63b4-418f-abbf-b878a891738f.png" 
            alt="Unity Fleet Charging Station" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rental-dark/20 to-rental-dark/80" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">Discover Unity Link</h3>
            <p className="text-white/80">Your gateway to sustainable energy and seamless charging experiences</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station, index) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group glass-card border-rental-blue/20 hover:border-rental-cyan/30"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={station.imageUrl}
                    alt={station.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rental-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-rental-cyan">{station.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-white/60">
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
                  <p className="text-sm text-white/60">{station.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};