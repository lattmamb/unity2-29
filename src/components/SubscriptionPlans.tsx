import { useState } from "react";
import { plans } from "./subscription/PlanData";
import { PlanCard } from "./subscription/PlanCard";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Car, MapPin, Users, Zap } from "lucide-react";

export const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (planName: string) => {
    setIsLoading(planName);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSelectedPlan(planName);
    setIsLoading(null);
    toast({
      title: "Plan Selected",
      description: `You've selected the ${planName}. Customize it below.`,
    });
  };

  const features = [
    {
      icon: Car,
      title: "Premium Tesla Fleet",
      description: "Access to Model 3, Model Y, and Model S vehicles"
    },
    {
      icon: Zap,
      title: "Unlimited Charging",
      description: "Free charging at all Unity Link hubs"
    },
    {
      icon: MapPin,
      title: "Nationwide Access",
      description: "Use any Unity Fleet hub across America"
    },
    {
      icon: Users,
      title: "Concierge Support",
      description: "24/7 dedicated assistance for premium members"
    }
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-12 overflow-hidden">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 space-y-6"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rental-blue via-white to-rental-blue">
          Join Unity Fleet for Exclusive Benefits
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that powers your journey with unmatched convenience and innovation
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
          >
            <feature.icon className="w-12 h-12 mx-auto mb-4 text-rental-blue" />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PlanCard
              plan={plan}
              onSubscribe={handleSubscribe}
              isLoading={isLoading === plan.name}
            />
          </motion.div>
        ))}
      </div>

      {/* Plan Customizer */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <PlanCustomizer
            basePlan={selectedPlan}
            basePrice={Number(plans.find((p) => p.name === selectedPlan)?.price) || 0}
          />
        </motion.div>
      )}

      {/* Plan Comparison */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PlanComparison />
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-24 text-center space-y-6"
      >
        <div className="space-x-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-rental-blue transition-colors">Terms & Conditions</a>
          <span>•</span>
          <a href="#" className="hover:text-rental-blue transition-colors">Refund Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-rental-blue transition-colors">Support</a>
        </div>
        <p className="text-xs text-muted-foreground">
          Building America's most comprehensive EV transit system, one hub at a time
        </p>
      </motion.footer>
    </section>
  );
};