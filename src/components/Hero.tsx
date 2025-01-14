import { Button } from "@/components/ui/button";
import { ChevronRight, Info, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-accent to-white">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/9a7951c8-5fac-4e5d-9c41-4517db1e9f87.png')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-accent/20 to-accent/90" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/e00776b3-1f80-47c3-bccc-d21f9cd40dd6.png" 
              alt="Unity Link Logo" 
              className="w-32 h-32 mb-6 animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 animate-fade-up [animation-delay:200ms] leading-tight">
            Experience Premium Electric Vehicle{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-eco">
              Subscriptions
            </span>
          </h1>
          <p className="text-lg md:text-xl text-primary/80 mb-8 animate-fade-up [animation-delay:400ms] max-w-2xl mx-auto">
            Join Unity Fleet for a flexible, all-inclusive electric vehicle experience. 
            No long-term commitments, just pure driving pleasure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-up [animation-delay:600ms]">
            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/10 hover:border-secondary/20 transition-all duration-300">
              <Zap className="w-10 h-10 text-secondary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-primary mb-2">Instant Access</h3>
              <p className="text-primary/70">Get your vehicle delivered within 24 hours</p>
            </div>
            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/10 hover:border-secondary/20 transition-all duration-300">
              <Shield className="w-10 h-10 text-secondary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-primary mb-2">All-Inclusive</h3>
              <p className="text-primary/70">Insurance, maintenance, and charging included</p>
            </div>
            <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/10 hover:border-secondary/20 transition-all duration-300">
              <Info className="w-10 h-10 text-secondary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-primary mb-2">Flexible Terms</h3>
              <p className="text-primary/70">Switch vehicles or cancel anytime</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:800ms]">
            <Button 
              size="lg" 
              className="bg-secondary text-primary hover:bg-secondary/90 group transition-all duration-300"
              asChild
            >
              <Link to="/subscription">
                View Subscription Plans
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/5"
              asChild
            >
              <Link to="/fleet">
                Explore Our Fleet
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 animate-fade-up [animation-delay:1000ms]">
            {[
              { title: "Premium Fleet", value: "100% Tesla Vehicles" },
              { title: "Coverage", value: "25+ Charging Stations" },
              { title: "Community", value: "10k+ Active Members" },
            ].map((stat) => (
              <div 
                key={stat.title} 
                className="p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-primary/10 
                  hover:border-secondary/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-secondary">{stat.value}</h3>
                <p className="text-primary/70 mt-1">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-accent to-transparent" />
    </div>
  );
};