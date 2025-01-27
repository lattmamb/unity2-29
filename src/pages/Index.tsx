import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/landing/Hero";
import { Footer } from "@/components/Footer";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { AvailableVehicles } from "@/components/AvailableVehicles";
import { ActiveRentals } from "@/components/ActiveRentals";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { DockNav } from "@/components/navigation/DockNav";
import { InteractiveMap } from "@/components/map/InteractiveMap";

const Index = () => {
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (error.message.includes('postMessage')) {
        console.error('PostMessage Error:', error);
        toast({
          title: "Connection Issue",
          description: "We're experiencing some technical difficulties. Please try refreshing the page.",
          variant: "destructive",
        });
      }
    };

    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      <main className="relative">
        {/* Map Section */}
        <section className="py-12 bg-gradient-to-b from-rental-dark to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Our Network
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover Unity Fleet vehicles and charging stations near you. Our interactive map shows real-time availability and locations.
              </p>
            </motion.div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <InteractiveMap />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-8 space-y-6">
                <ActiveRentals />
                <AvailableVehicles />
              </div>

              <div className="md:col-span-4 space-y-6">
                <SubscriptionStatus />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-rental-dark">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Eco-Impact Card */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Eco-Impact</h3>
                <p className="text-muted-foreground">
                  Track your environmental impact and see how Unity Fleet is making a difference.
                </p>
              </div>

              {/* Charging Network Card */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Charging Network</h3>
                <p className="text-muted-foreground">
                  Access our growing network of charging stations and Unity Link hubs.
                </p>
              </div>

              {/* Flexible Plans Card */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Flexible Plans</h3>
                <p className="text-muted-foreground">
                  Choose from a range of plans that fit your lifestyle and budget.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <DockNav />
      <Footer />
    </div>
  );
};

export default Index;