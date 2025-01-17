import { Button } from "@/components/ui/button";
import { ChevronRight, Download, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1F3B]">
      {/* Subscribe Now Button - Top Left */}
      <div className="absolute top-4 left-4 z-20">
        <Button 
          asChild
          size="lg"
          className="bg-gradient-to-r from-[#00FFC6] to-[#C4FF00] text-[#0B1F3B] hover:opacity-90 transition-all duration-300"
        >
          <Link to="/subscription">Subscribe Now</Link>
        </Button>
      </div>

      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/ec960a52-1e70-4d52-b6c3-d8e1af41e121.png"
          alt="Tesla Fleet Lineup"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3B]/80 via-[#0B1F3B]/70 to-[#0B1F3B]/90" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/f927bb84-ef36-4762-8d10-ade9a41f18ce.png" 
              alt="Unity Fleet Logo" 
              className="w-32 h-32 mb-6 animate-float"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up [animation-delay:200ms] leading-tight">
            Join the EV Revolution with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC6] to-[#C4FF00]">
              Unity Fleet
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-up [animation-delay:400ms] max-w-2xl mx-auto">
            Flexible Tesla Subscriptions, Immersive 3D Previews, and a Greener Future—All in One App
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-up [animation-delay:600ms]">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00FFC6]/20 transition-all duration-300">
              <Zap className="w-10 h-10 text-[#00FFC6] mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Flexible Subscriptions</h3>
              <p className="text-white/70">From $350/mo (Model 3) up to $2,500/mo (Model X Plaid)</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00FFC6]/20 transition-all duration-300">
              <Shield className="w-10 h-10 text-[#00FFC6] mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">High-End Electric Vehicles</h3>
              <p className="text-white/70">Drive Tesla's latest models—Model 3, Model Y, Model S, and Model X</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00FFC6]/20 transition-all duration-300">
              <Download className="w-10 h-10 text-[#00FFC6] mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Seamless Technology</h3>
              <p className="text-white/70">Manage your fleet from our intuitive mobile app</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:800ms]">
            <Button 
              size="lg" 
              className="bg-[#00FFC6] text-[#0B1F3B] hover:bg-[#00FFC6]/90 group transition-all duration-300"
              asChild
            >
              <Link to="/subscription">
                View Plans
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#00FFC6]/20 text-white hover:bg-[#00FFC6]/10"
              asChild
            >
              <Link to="/subscription">
                Get Started
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
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 
                  hover:border-[#00FFC6]/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-[#00FFC6]">{stat.value}</h3>
                <p className="text-white/70 mt-1">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B1F3B] to-transparent" />
    </div>
  );
};