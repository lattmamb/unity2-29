import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { AvailableVehicles } from "@/components/AvailableVehicles";
import { ActiveRentals } from "@/components/ActiveRentals";
import { TeslaScene } from "@/components/TeslaScene";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { DockNav } from "@/components/navigation/DockNav";
import { SplashCursor } from "@/components/ui/splash-cursor";

const Index = () => {
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Error:', error);
      toast({
        title: "An error occurred",
        description: "Please refresh the page or contact support if the issue persists.",
        variant: "destructive",
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <div className="min-h-screen bg-rental-dark text-rental-light relative">
      <SplashCursor />
      <Navigation />
      
      <main className="relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-4 bg-rental-blue/10 px-6 py-3 rounded-full backdrop-blur-sm mb-6 border border-rental-blue/20">
                <div className="text-rental-cyan font-semibold">UNITY FLEET</div>
                <div className="w-px h-6 bg-rental-blue/20" />
                <div className="text-rental-blue">Experience the Future</div>
              </div>
              <h1 className="hero-title">
                The Future of Electric Mobility
              </h1>
              <p className="text-xl text-rental-light/80 max-w-2xl mx-auto">
                Join Unity Fleet and experience the next generation of sustainable transportation
              </p>
            </div>

            <div className="relative">
              <TeslaScene />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-rental-dark via-transparent to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 space-y-8">
                <ActiveRentals />
                <AvailableVehicles />
              </div>

              <div className="md:col-span-4 space-y-8">
                <SubscriptionStatus />
              </div>
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