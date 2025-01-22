import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Zap, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { toast } from "@/components/ui/use-toast";

export const Hero = () => {
  const handleSplineError = (error: any) => {
    console.error("Spline loading error:", error);
    toast({
      title: "3D Model Loading Error",
      description: "We're having trouble loading the 3D model. Please refresh the page.",
      variant: "destructive",
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1F3B]">
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3B]/80 via-[#0B1F3B]/70 to-[#0B1F3B]/90" />
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <img 
            src="/lovable-uploads/ec960a52-1e70-4d52-b6c3-d8e1af41e121.png"
            alt="Tesla Fleet Background"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo Animation */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <img 
              src="/lovable-uploads/f927bb84-ef36-4762-8d10-ade9a41f18ce.png" 
              alt="Unity Fleet Logo" 
              className="w-32 h-32 mb-6 animate-float"
            />
          </motion.div>

          {/* Main Title with Spotlight Effect */}
          <div className="relative">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-white to-blue-400 bg-clip-text text-transparent mb-4">
                Experience The Future of Mobility
              </h1>
              <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
                Join the electric revolution with our premium Tesla fleet
              </p>
            </motion.div>
          </div>

          {/* 3D Model Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-[400px] w-full relative"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              onError={handleSplineError}
            />
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                icon: <Zap className="w-8 h-8 text-blue-400" />,
                title: "Instant Access",
                description: "Get your Tesla in minutes"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Premium Fleet",
                description: "Latest Tesla models"
              },
              {
                icon: <Download className="w-8 h-8 text-blue-400" />,
                title: "Smart App",
                description: "Full control at your fingertips"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 
                  hover:border-blue-400/20 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-blue-100/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white group"
              asChild
            >
              <Link to="/subscription">
                Start Now
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-400/20 text-white hover:bg-blue-400/10"
              asChild
            >
              <Link to="/fleet">
                View Fleet
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B1F3B] to-transparent" />
    </div>
  );
};