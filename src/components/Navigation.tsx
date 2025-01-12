import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";

export const Navigation = () => {
  return (
    <div className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="mr-8 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/lovable-uploads/f927bb84-ef36-4762-8d10-ade9a41f18ce.png" 
              alt="Unity Fleet Logo" 
              className="h-8 w-8 transition-transform group-hover:scale-110" 
            />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Unity Fleet
            </span>
          </Link>
        </div>
        
        <DesktopNav />
        <MobileNav />

        <div className="ml-auto flex items-center space-x-4">
          <Button 
            asChild 
            variant="secondary" 
            className="whitespace-nowrap animate-pulse-soft hover:animate-none"
          >
            <Link to="/booking">Book a Ride</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};