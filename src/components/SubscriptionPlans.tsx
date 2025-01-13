import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const plans = [
  {
    name: "Basic Plan",
    price: 350,
    description: "Perfect for occasional drivers",
    vehicle: "Tesla Model 3",
    image: "/lovable-uploads/78bd8b35-3144-4714-8892-83c867b058c2.png",
  },
  {
    name: "Premium Plan",
    price: 750,
    description: "Ideal for regular commuters",
    vehicle: "Tesla Model Y",
    image: "/lovable-uploads/78bd8b35-3144-4714-8892-83c867b058c2.png",
    popular: true,
  },
  {
    name: "Elite Plan",
    price: 1500,
    description: "Ultimate flexibility and luxury",
    vehicle: "Tesla Model X",
    image: "/lovable-uploads/78bd8b35-3144-4714-8892-83c867b058c2.png",
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
    <section className="py-8 md:py-16 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
            Tesla Subscription Plans
          </h1>
          <p className="text-lg text-gray-300">
            Select your perfect Tesla experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="relative overflow-hidden bg-gray-800/50 border-gray-700 backdrop-blur-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-6 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
                    <img
                      src={plan.image}
                      alt={plan.vehicle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                      <p className="text-gray-300 text-sm">{plan.description}</p>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    <div className="p-3 bg-gray-700/30 rounded-lg">
                      <p className="text-blue-400 font-semibold">{plan.vehicle}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
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
            {["Insurance Coverage", "Flexible Cancellation", "24/7 Support"].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 justify-center bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm"
              >
                <span className="text-blue-400">✓</span>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};