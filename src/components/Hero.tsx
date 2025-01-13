import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="absolute inset-0 circuit-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/90" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up [animation-delay:200ms] leading-tight">
            Drive the Future with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Unity Fleet
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up [animation-delay:400ms] max-w-2xl mx-auto px-4">
            Experience sustainable mobility through our electric vehicle subscription service. 
            No commitment, all convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:600ms] px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 group transition-all duration-300 animate-float"
              asChild
            >
              <Link to="/subscription">
                Start Your Journey
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto glass-card hover:bg-white/20"
              asChild
            >
              <Link to="/fleet">
                View Fleet
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 animate-fade-up [animation-delay:800ms] px-4">
            {[
              { title: "Eco-Friendly", value: "100% Electric Fleet" },
              { title: "Locations", value: "25+ Charging Hubs" },
              { title: "Community", value: "10k+ Members" },
            ].map((stat) => (
              <div key={stat.title} className="glass-card p-6 rounded-xl animate-pulse-soft">
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">{stat.value}</h3>
                <p className="text-muted-foreground mt-2">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};