
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Hero } from "@/components/Hero";
import { BrandShowcase } from "@/components/BrandShowcase";
import { Benefits } from "@/components/Benefits";
import { ContainerScrollDemo } from "@/components/ui/container-scroll-demo";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ModelSViewer } from "@/components/ModelSViewer";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      navigate('/fleet');
    }

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
  }, [user?.id, navigate]);

  return (
    <div className="min-h-screen bg-[#14121F]">
      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#7B5EFB]/5 via-transparent to-transparent pointer-events-none" />
      
      <Navigation />
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7B5EFB]/10 via-transparent to-transparent blur-3xl" />
        <Hero />
      </div>
      
      <div className="relative z-10">
        <ModelSViewer />
        <BrandShowcase />
        <Benefits />
        <ContainerScrollDemo />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
