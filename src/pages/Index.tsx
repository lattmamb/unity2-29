
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
    // If user is already authenticated, redirect to their dashboard/fleet view
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ModelSViewer />
      <BrandShowcase />
      <Benefits />
      <ContainerScrollDemo />
      <Footer />
    </div>
  );
};

export default Index;
