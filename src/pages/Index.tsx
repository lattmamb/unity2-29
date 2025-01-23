import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { AvailableVehicles } from "@/components/AvailableVehicles";
import { ActiveRentals } from "@/components/ActiveRentals";
import { PromotionsBanner } from "@/components/PromotionsBanner";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

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
      
      <main className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SubscriptionStatus />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AvailableVehicles />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ActiveRentals />
            </motion.div>
          </div>
        </div>

        <div className="mt-16">
          <PromotionsBanner />
        </div>
      </main>

      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;