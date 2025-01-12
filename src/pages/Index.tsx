import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { Benefits } from "@/components/Benefits";
import { ChargingStations } from "@/components/ChargingStations";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Dashboard />
      <Benefits />
      <ChargingStations />
      <Footer />
    </div>
  );
};

export default Index;