import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DockNav } from "./navigation/DockNav";
import { BreadcrumbNav } from "./navigation/BreadcrumbNav";

export const Navigation = () => {
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 container mx-auto">
          <div className="mr-8 flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <img src="/lovable-uploads/f927bb84-ef36-4762-8d10-ade9a41f18ce.png" alt="Unity Fleet Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
                Unity Fleet
              </span>
            </Link>
          </div>

          <DockNav />

          <div className="ml-auto flex items-center space-x-4">
            <Button 
              asChild 
              variant="secondary" 
              className="bg-primary/10 hover:bg-primary/20 text-primary-foreground border border-primary/20"
            >
              <Link to="/booking">Book a Ride</Link>
            </Button>
          </div>
        </div>
      </div>
      <BreadcrumbNav />
    </div>
  );
};