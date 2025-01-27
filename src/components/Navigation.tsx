import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DockNav } from "./navigation/DockNav";
import { BreadcrumbNav } from "./navigation/BreadcrumbNav";
import { motion } from "framer-motion";

export const Navigation = () => {
  return (
    <div className="sticky top-0 z-50 w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-white/10 bg-background/80 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex h-20 items-center px-6 container mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mr-8 flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
              <img 
                src="/lovable-uploads/f927bb84-ef36-4762-8d10-ade9a41f18ce.png" 
                alt="Unity Fleet Logo" 
                className="h-10 w-10" 
              />
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-400 to-violet-500">
                Unity Fleet
              </span>
            </Link>
          </motion.div>

          <DockNav />

          <div className="ml-auto flex items-center space-x-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center space-x-4"
            >
              <Button 
                asChild 
                variant="ghost" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <Link to="/support">Support</Link>
              </Button>
              <Button 
                asChild 
                variant="ghost"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <Link to="/profile">Account</Link>
              </Button>
              <Button 
                asChild 
                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
              >
                <Link to="/booking">Book a Ride</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <BreadcrumbNav />
    </div>
  );
};