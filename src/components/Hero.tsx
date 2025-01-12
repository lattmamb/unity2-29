import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary to-primary/80">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary/20 to-primary/90" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up [animation-delay:200ms] leading-tight">
            Drive the Future with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-eco">
              Unity Fleet
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-up [animation-delay:400ms] max-w-2xl mx-auto">
            Experience sustainable mobility through our electric vehicle subscription service. 
            No commitment, all convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:600ms]">
            <Button 
              size="lg" 
              className="bg-secondary text-primary hover:bg-secondary/90 group transition-all duration-300 animate-float"
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
              className="text-white border-white hover:bg-white/10 backdrop-blur-sm"
              asChild
            >
              <Link to="/fleet">
                View Fleet
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-up [animation-delay:800ms]">
            {[
              { title: "Eco-Friendly", value: "100% Electric Fleet" },
              { title: "Locations", value: "25+ Charging Hubs" },
              { title: "Community", value: "10k+ Members" },
            ].map((stat) => (
              <div key={stat.title} className="p-4 rounded-lg bg-white/5 backdrop-blur-sm animate-pulse-soft">
                <h3 className="text-3xl font-bold text-secondary">{stat.value}</h3>
                <p className="text-white/80 mt-1">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};