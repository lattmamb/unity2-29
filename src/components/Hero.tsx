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
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1F3B] to-background">
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            <img 
              src="/lovable-uploads/f927bb84-ef36-4762-8d10-ade9a41f18ce.png" 
              alt="Unity Fleet Logo" 
              className="w-16 h-16 mb-4"
            />
          </motion.div>

          <div className="relative">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            <motion.div variants={itemVariants}>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Your Next Ride Awaits
              </h1>
              <p className="text-base md:text-lg text-blue-100/80 max-w-xl mx-auto">
                Experience sustainable mobility with Unity Fleet
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
          >
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white group transition-all duration-300"
              asChild
            >
              <Link to="/booking">
                Start Ride
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-400/20 text-white hover:bg-blue-400/10 transition-all duration-300"
              asChild
            >
              <Link to="/fleet">
                View Fleet
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};