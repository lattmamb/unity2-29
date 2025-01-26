import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { AvailableVehicles } from "@/components/AvailableVehicles";
import { ActiveRentals } from "@/components/ActiveRentals";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { DockNav } from "@/components/navigation/DockNav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-rental-light text-rental-text relative">
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
              <div className="inline-flex items-center gap-4 bg-rental-gray px-6 py-3 rounded-full backdrop-blur-sm mb-6">
                <div className="text-rental-blue font-semibold">UNITY FLEET</div>
                <div className="w-px h-6 bg-rental-blue/20" />
                <div className="text-rental-text">Experience the Future</div>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold text-rental-text mb-4">
                Making EVs accessible<br />and affordable
              </h1>
              <p className="text-xl text-rental-text/80 max-w-2xl mx-auto">
                All-inclusive EV subscription removes all the hassles of leasing or owning while giving you a much more affordable month-to-month option than renting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  size="lg" 
                  className="glass-button group text-lg"
                  asChild
                >
                  <Link to="/booking">
                    Download the app
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-rental-blue/20 text-rental-text hover:bg-rental-gray/50 transition-all duration-300 text-lg"
                  asChild
                >
                  <Link to="/fleet">
                    Learn more
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16">
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