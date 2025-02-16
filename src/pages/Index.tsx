
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Hero } from "@/components/Hero";
import { BrandShowcase } from "@/components/BrandShowcase";
import { Benefits } from "@/components/Benefits";
import { ContainerScrollDemo } from "@/components/ui/container-scroll-demo";

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
      <Hero />
      <BrandShowcase />
      <Benefits />
      <ContainerScrollDemo />
      <Footer />
    </div>
  );
};

export default Index;
