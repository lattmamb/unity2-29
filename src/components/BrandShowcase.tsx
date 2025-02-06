import { motion } from "framer-motion";
import { ChevronRight, Shield, Zap, Car, Battery, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Car,
    title: "Premium Tesla Fleet",
    description: "Access to our exclusive collection of Tesla vehicles"
  },
  {
    icon: Shield,
    title: "Full Coverage",
    description: "Comprehensive insurance and maintenance included"
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Get your vehicle within 24 hours"
  },
  {
    icon: Battery,
    title: "Charging Network",
    description: "Access to our extensive charging infrastructure"
  },
  {
    icon: CreditCard,
    title: "Flexible Plans",
    description: "Customizable subscription options"
  }
];

export const BrandShowcase = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-rental-dark via-rental-dark/95 to-background">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      
      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rental-blue to-white mb-6">
            Experience The Future of Mobility
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join Unity Fleet and discover a new era of sustainable transportation with our premium electric vehicle service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <feature.icon className="w-10 h-10 text-rental-blue mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            size="lg"
            className="bg-rental-blue hover:bg-rental-blue/90 text-white group"
            asChild
          >
            <Link to="/fleet">
              Explore Our Fleet
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};