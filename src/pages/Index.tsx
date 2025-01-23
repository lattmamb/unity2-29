import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { AvailableVehicles } from "@/components/AvailableVehicles";
import { ActiveRentals } from "@/components/ActiveRentals";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { DockNav } from "@/components/navigation/DockNav";

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
      
      <main className="relative py-8">
        <div className="container mx-auto px-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Main Content - 8 columns on desktop */}
            <div className="md:col-span-8 space-y-6">
              <ActiveRentals />
              <AvailableVehicles />
            </div>

            {/* Sidebar - 4 columns on desktop */}
            <div className="md:col-span-4 space-y-6">
              <SubscriptionStatus />
            </div>
          </motion.div>
        </div>
      </main>

      <DockNav />
      <Footer />
    </div>
  );
};

export default Index;