import { Card } from "@/components/ui/card";
import { Monitor, Palette, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AdOptions = () => {
  const navigate = useNavigate();

  const handleLaunchDigitalCampaign = () => {
    navigate("/advertising/campaign/digital");
    toast.success("Setting up your digital campaign");
  };

  const handleGetWrappingQuote = () => {
    navigate("/advertising/campaign/wrap");
    toast.success("Generating your wrapping quote");
  };

  const options = [
    {
      title: "Digital Displays",
      description: "Dynamic digital ads displayed on our vehicle screens",
      icon: Monitor,
      features: [
        "Real-time campaign updates",
        "Location-based targeting",
        "Performance analytics",
        "Flexible scheduling",
      ],
      price: "From $300/month",
      action: "Launch Digital Campaign",
      onClick: handleLaunchDigitalCampaign
    },
    {
      title: "Custom Wraps",
      description: "Premium vinyl wraps for maximum brand visibility",
      icon: Palette,
      features: [
        "Full or partial vehicle wraps",
        "Professional installation",
        "Long-term exposure",
        "Premium materials",
      ],
      price: "From $1,500",
      action: "Get Wrapping Quote",
      onClick: handleGetWrappingQuote
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {options.map((option, index) => (
        <Card 
          key={index} 
          className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 
            hover:border-[#00FFC6]/20 transition-all duration-300"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-[#00FFC6]/10">
                <option.icon className="w-6 h-6 text-[#00FFC6]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-white/70">{option.description}</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6 flex-grow">
              {option.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FFC6]" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
              <p className="text-lg font-semibold text-[#00FFC6] mb-4">{option.price}</p>
              <Button 
                className="w-full bg-[#00FFC6]/10 hover:bg-[#00FFC6]/20 text-[#00FFC6] border border-[#00FFC6]/20 group"
                onClick={option.onClick}
              >
                {option.action}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};