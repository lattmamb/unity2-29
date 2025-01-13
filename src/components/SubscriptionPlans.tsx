import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, Shield, Zap, Car, Settings, HelpCircle, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Basic Plan",
    price: 350,
    description: "Perfect for occasional drivers",
    features: ["Basic vehicle access", "Standard support", "Limited mileage"],
    icon: Car,
  },
  {
    name: "Premium Plan",
    price: 750,
    description: "Ideal for regular commuters",
    features: ["Premium vehicles", "Priority support", "Extended mileage"],
    popular: true,
    icon: Shield,
  },
  {
    name: "Elite Plan",
    price: 1500,
    description: "Ultimate flexibility and luxury",
    features: ["Luxury fleet access", "Concierge service", "Unlimited mileage"],
    icon: Zap,
  },
];

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
      description: `You've selected the ${planName}`,
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary/20 to-primary/5 circuit-pattern">
      <div className="container mx-auto px-4 py-8">
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-12">
          <Button variant="ghost" size="icon" className="hover:bg-secondary/10">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-secondary/10">
              <HelpCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary/10">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary via-secondary/80 to-secondary/60 mb-4"
          >
            Unity Fleet Subscription Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            Choose your perfect subscription plan
          </motion.p>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card 
                  className={`relative h-full overflow-hidden glass-card transition-all duration-300 ${
                    selectedPlan === plan.name 
                      ? 'border-secondary ring-2 ring-secondary/50' 
                      : 'hover:border-secondary/50'
                  }`}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-center mb-6">
                      <div className={`p-4 rounded-full ${
                        selectedPlan === plan.name 
                          ? 'bg-secondary/20' 
                          : 'bg-secondary/10'
                        } transition-colors duration-300`}>
                        <Icon className="h-8 w-8 text-secondary" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                      <div className="flex items-baseline gap-2 justify-center">
                        <span className="text-4xl font-bold text-white">${plan.price}</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      <p className="text-gray-400">{plan.description}</p>
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300">
                          <ChevronRight className="h-4 w-4 text-secondary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      onClick={() => handleSubscribe(plan.name)}
                      disabled={isLoading === plan.name}
                    >
                      {isLoading === plan.name ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Processing...
                        </div>
                      ) : (
                        "Subscribe Now"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Plan Customizer */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <PlanCustomizer
              basePlan={selectedPlan}
              basePrice={plans.find((p) => p.name === selectedPlan)?.price || 0}
            />
          </motion.div>
        )}

        {/* Plan Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <PlanComparison />
        </motion.div>

        {/* Footer Links */}
        <div className="mt-16 text-center">
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-secondary transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-secondary transition-colors">Contact Support</a>
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </section>
  );
};