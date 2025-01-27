import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { InteractiveMap } from "@/components/map/InteractiveMap";

export const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-rental-dark to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          className="text-center space-y-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rental-blue via-white to-rental-blue">
            Explore. Ride. Connect.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of urban mobility with Unity Fleet's innovative electric vehicle network.
          </p>
          <Button 
            size="lg"
            className="bg-rental-blue hover:bg-rental-blue/90"
            onClick={scrollToFeatures}
          >
            Learn More
            <ChevronDown className="ml-2 h-4 w-4 animate-bounce" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-lg overflow-hidden shadow-2xl"
        >
          <InteractiveMap />
        </motion.div>
      </div>
    </section>
  );
};