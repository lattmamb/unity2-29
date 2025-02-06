
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DockNav } from "./navigation/DockNav";
import { BreadcrumbNav } from "./navigation/BreadcrumbNav";
import { SidebarNav } from "./navigation/SidebarNav";
import { BottomNav } from "./navigation/BottomNav";
import { MobileNav } from "./navigation/MobileNav";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";

export const Navigation = () => {
  const { user } = useAuth();

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex h-16 items-center px-6 container mx-auto">
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
                className="h-8 w-8" 
              />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-400 to-violet-500">
                Unity Fleet
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex">
            <DockNav />
          </div>

          <div className="md:hidden">
            <MobileNav />
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center space-x-4"
            >
              {user?.id ? (
                <Button 
                  asChild 
                  className="bg-rental-blue hover:bg-rental-blue/90 text-white"
                >
                  <Link to="/fleet">View Fleet</Link>
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-foreground/60 hover:text-foreground/80"
                    asChild
                  >
                    <Link to="/subscription">Subscribe</Link>
                  </Button>
                  <Button 
                    asChild 
                    className="bg-rental-blue hover:bg-rental-blue/90 text-white"
                  >
                    <Link to="/booking">Book a Ride</Link>
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="h-16" />
      <BreadcrumbNav />
      <SidebarNav />
      <BottomNav />
    </>
  );
};
