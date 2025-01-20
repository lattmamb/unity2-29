import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { AvailableVehicles } from "@/components/AvailableVehicles";
import { ActiveRentals } from "@/components/ActiveRentals";
import { PromotionsBanner } from "@/components/PromotionsBanner";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
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
      
      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />
        
        <ContainerScroll
          titleComponent={
            <div className="relative max-w-5xl mx-auto px-4">
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                size={500}
              />
              <motion.div
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="relative z-10 space-y-8"
              >
                <h2 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  Experience Luxury
                </h2>
                <div className="mt-8 h-[400px] md:h-[600px] w-full">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          }
        >
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rental-blue/20 to-rental-blue/10 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full transform transition-all duration-500 group-hover:-translate-y-2">
                  <SubscriptionStatus />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rental-blue/20 to-rental-blue/10 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full transform transition-all duration-500 group-hover:-translate-y-2">
                  <AvailableVehicles />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rental-blue/20 to-rental-blue/10 rounded-xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full transform transition-all duration-500 group-hover:-translate-y-2">
                  <ActiveRentals />
                </div>
              </motion.div>
            </div>
          </div>
        </ContainerScroll>

        <div className="relative mt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-rental-blue/5 via-rental-blue/10 to-transparent pointer-events-none" />
          <PromotionsBanner />
        </div>
      </main>

      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;