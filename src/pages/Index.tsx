import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { AvailableVehicles } from "@/components/AvailableVehicles";
import { ActiveRentals } from "@/components/ActiveRentals";
import { PromotionsBanner } from "@/components/PromotionsBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <main className="container mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SubscriptionStatus />
          <AvailableVehicles />
          <ActiveRentals />
        </div>
        <PromotionsBanner />
      </main>
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;