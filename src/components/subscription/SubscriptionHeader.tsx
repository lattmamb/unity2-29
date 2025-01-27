import { motion } from "framer-motion";

export const SubscriptionHeader = () => {
  return (
    <motion.div 
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rental-blue via-white to-rental-blue">
        Your Ride. Your Way.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        Explore subscription options tailored to your lifestyle. Whether you need full flexibility 
        or all-inclusive perks, Unity Fleet has the perfect plan for you.
      </p>
    </motion.div>
  );
};