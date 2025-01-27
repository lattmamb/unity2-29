import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkle } from "lucide-react";

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
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 animate-pulse-soft" />
      <div className="absolute inset-0 bg-gradient-radial from-rental-blue/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-2 text-sm text-rental-blue/80"
        >
          <Sparkle className="h-4 w-4 animate-pulse" />
          <span>Experience the future of mobility</span>
          <Sparkle className="h-4 w-4 animate-pulse" />
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-subscription-gradient animate-glow"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Empowering Your Journey
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Choose from our range of plans designed to fit your lifestyle, whether you're on the move occasionally or every day.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative"
        >
          <Button 
            size="lg"
            className="bg-rental-blue hover:bg-rental-blue/90 text-white group relative overflow-hidden"
            onClick={scrollToPlans}
          >
            <span className="relative z-10">Explore Plans</span>
            <ChevronDown className="ml-2 h-4 w-4 animate-bounce relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-rental-blue via-white/20 to-rental-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </motion.div>
  );
};