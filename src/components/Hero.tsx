import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-radial from-primary/5 via-primary/10 to-primary/20">
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up [animation-delay:200ms] leading-tight">
            Revolutionize Your Ride with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary/80">
              Unity Fleet
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up [animation-delay:400ms] max-w-3xl mx-auto">
            Experience the future of mobility with flexible EV subscriptions, rentals, and shuttle services.
            Drive sustainably without the commitment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up [animation-delay:600ms]">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-secondary to-secondary/80 text-primary hover:from-secondary/90 hover:to-secondary/70 group transition-all duration-300"
              asChild
            >
              <Link to="/subscription">
                Subscribe Now
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto glass-card hover:bg-white/20"
              onClick={scrollToServices}
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 animate-fade-up [animation-delay:800ms]">
            {[
              { title: "Eco-Friendly", value: "100% Electric Fleet" },
              { title: "Flexible Plans", value: "Starting at $350/mo" },
              { title: "Coverage", value: "Full Maintenance Included" },
            ].map((stat) => (
              <div key={stat.title} className="glass-card p-6 rounded-xl animate-pulse-soft">
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary/80">
                  {stat.value}
                </h3>
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