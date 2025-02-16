
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Zap, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Spotlight } from "@/components/ui/spotlight";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1F3B] to-background">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/services-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
            },
          },
        }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex justify-center"
          >
            <img 
              src="/lovable-uploads/f927bb84-ef36-4762-8d10-ade9a41f18ce.png" 
              alt="Unity Fleet Logo" 
              className="w-16 h-16 mb-4 animate-float"
            />
          </motion.div>

          <div className="relative">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                Your Next Ride Awaits
              </h1>
              <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
                Experience sustainable mobility with Unity Fleet's premium electric vehicle service. 
                Drive the future today.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button 
              size="lg" 
              className="bg-rental-blue hover:bg-rental-blue/90 text-white group transition-all duration-300 
                transform hover:scale-105 hover:shadow-lg hover:shadow-rental-blue/20"
              asChild
            >
              <Link to="/subscription">
                Start Your Journey
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-rental-blue/20 text-white hover:bg-rental-blue/10 transition-all duration-300
                transform hover:scale-105 backdrop-blur-sm"
              asChild
            >
              <Link to="/fleet">
                Explore Our Fleet
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Premium vehicles with advanced safety features"
              },
              {
                icon: Zap,
                title: "100% Electric",
                description: "Zero emissions, maximum performance"
              },
              {
                icon: Download,
                title: "Easy Booking",
                description: "Book your ride in minutes"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 backdrop-blur-lg hover:scale-105 transition-transform duration-300"
              >
                <feature.icon className="w-8 h-8 text-rental-blue mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-100/80">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
