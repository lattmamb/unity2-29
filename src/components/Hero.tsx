import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Zap, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-rental-dark to-background">
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">
              Unity Fleet
            </h1>
            <p className="text-xl md:text-2xl text-rental-light/80 max-w-xl mx-auto">
              The Future of Electric Mobility
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Button 
              size="lg" 
              className="glass-button group text-lg"
              asChild
            >
              <Link to="/booking">
                Book Now
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-rental-light/20 text-white hover:bg-rental-light/10 transition-all duration-300 text-lg"
              asChild
            >
              <Link to="/fleet">
                View Fleet
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="absolute inset-0 bg-frost-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-rental-dark via-transparent to-transparent" />
    </div>
  );
};