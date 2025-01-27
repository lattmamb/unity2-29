import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const SubscriptionHeader = () => {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans-section');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-rental-dark to-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rental-blue via-white to-rental-blue"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Empowering Your Journey
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Choose from our range of plans designed to fit your lifestyle, whether you're on the move occasionally or every day.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button 
            size="lg"
            className="bg-rental-blue hover:bg-rental-blue/90 text-white"
            onClick={scrollToPlans}
          >
            Explore Plans
            <ChevronDown className="ml-2 h-4 w-4 animate-bounce" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};