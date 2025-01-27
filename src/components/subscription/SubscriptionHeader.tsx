import { motion } from "framer-motion";

export const SubscriptionHeader = () => {
  return (
    <motion.div 
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src="/unity-fleet-logo.svg" 
        alt="Unity Fleet Logo" 
        className="h-16 mx-auto"
      />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rental-blue via-white to-rental-blue">
        Ride Unlimited. Impact Limitless.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        Explore subscription plans that offer convenience, sustainability, and exclusive perks. 
        Choose the plan that fits your lifestyle.
      </p>
    </motion.div>
  );
};