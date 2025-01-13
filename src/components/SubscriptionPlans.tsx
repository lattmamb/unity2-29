import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, Zap, Shield, Clock } from "lucide-react";

const plans = [
  {
    name: "Basic Plan",
    price: 350,
    description: "Perfect for occasional drivers",
    features: ["Basic vehicle access", "Standard support", "Limited mileage"],
  },
  {
    name: "Premium Plan",
    price: 750,
    description: "Ideal for regular commuters",
    features: ["Premium vehicles", "Priority support", "Extended mileage"],
    popular: true,
  },
  {
    name: "Elite Plan",
    price: 1500,
    description: "Ultimate flexibility and luxury",
    features: ["Luxury fleet access", "Concierge service", "Unlimited mileage"],
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
    <section className="py-8 md:py-16 min-h-screen circuit-pattern">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary via-secondary/80 to-secondary/60 mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            Select the perfect subscription that matches your lifestyle
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative h-full overflow-hidden glass-card hover:border-secondary/50 transition-all duration-300">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
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
          ))}
        </div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <PlanComparison />
        </motion.div>

        <div className="mt-16 text-center px-4">
          <h2 className="text-2xl font-bold text-white mb-8">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Shield, text: "Insurance Coverage" },
              { icon: Clock, text: "Flexible Cancellation" },
              { icon: Zap, text: "24/7 Support" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 justify-center glass-card p-4 rounded-lg"
              >
                <Icon className="h-5 w-5 text-secondary" />
                <span className="text-gray-300">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};