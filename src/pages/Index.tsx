
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Hero } from "@/components/Hero";
import { BrandShowcase } from "@/components/BrandShowcase";
import { Benefits } from "@/components/Benefits";
import { ContainerScrollDemo } from "@/components/ui/container-scroll-demo";
import { useAuth } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to their dashboard/fleet view
    if (auth?.user?.id) {
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
  }, [auth?.user?.id, navigate]);

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
