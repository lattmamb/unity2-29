import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AdHero = () => {
  const navigate = useNavigate();

  const handleStartDigitalCampaign = () => {
    navigate("/advertising#digital-campaign");
    toast.success("Starting new digital campaign setup");
  };

  const handleDesignVehicleWrap = () => {
    navigate("/advertising#vehicle-wrap");
    toast.success("Opening vehicle wrap designer");
  };

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0B1F3B]">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/c650f54f-2783-48c7-a17b-7c1d8d9bba88.png"
          alt="Tesla Fleet Advertising"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3B]/80 via-[#0B1F3B]/70 to-[#0B1F3B]/90" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up [animation-delay:200ms]">
            Advertise on Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC6] to-[#C4FF00]">
              Premium Fleet
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-up [animation-delay:400ms] max-w-2xl mx-auto">
            Transform our Tesla fleet into moving billboards with digital displays and custom wraps
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:600ms]">
            <Button 
              size="lg" 
              className="bg-[#00FFC6] text-[#0B1F3B] hover:bg-[#00FFC6]/90 group"
              onClick={handleStartDigitalCampaign}
            >
              Start Digital Campaign
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#00FFC6]/20 text-white hover:bg-[#00FFC6]/10"
              onClick={handleDesignVehicleWrap}
            >
              Design Vehicle Wrap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};