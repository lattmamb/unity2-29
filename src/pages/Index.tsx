import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { ChargingStations } from "@/components/ChargingStations";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Benefits />
      <ChargingStations />
      <Footer />
    </div>
  );
};

export default Index;