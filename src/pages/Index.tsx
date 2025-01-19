import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { AvailableVehicles } from "@/components/AvailableVehicles";
import { ActiveRentals } from "@/components/ActiveRentals";
import { PromotionsBanner } from "@/components/PromotionsBanner";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (error.message.includes('postMessage')) {
        console.error('PostMessage Error:', error);
        toast({
          title: "Connection Issue",
          description: "We're experiencing some technical difficulties. Please try refreshing the page.",
          variant: "destructive",
        });
      }
    };

    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-white">
            Welcome to <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#00FFC6] to-[#C4FF00]">
              Unity Fleet
            </span>
          </h1>
        }
      >
        <img
          src="/lovable-uploads/ec960a52-1e70-4d52-b6c3-d8e1af41e121.png"
          alt="Tesla Fleet"
          className="w-full h-full object-cover"
        />
      </ContainerScroll>
      <Hero />
      <main className="container mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <SubscriptionStatus />
          <AvailableVehicles />
          <ActiveRentals />
        </div>
        <div className="w-full overflow-hidden">
          <PromotionsBanner />
        </div>
      </main>
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;