import { useState } from "react";
import { plans } from "./subscription/PlanData";
import { PlanCard } from "./subscription/PlanCard";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Car, Zap, Crown } from "lucide-react";

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

  const subscriptionCards = [
    {
      icon: <Car className="size-4" />,
      title: "Essential Plan",
      description: "Perfect for occasional drivers",
      date: "$350/month",
    },
    {
      icon: <Zap className="size-4" />,
      title: "Premium Plan",
      description: "Ideal for regular commuters",
      date: "$750/month",
    },
    {
      icon: <Crown className="size-4" />,
      title: "Elite Plan",
      description: "Ultimate flexibility and luxury",
      date: "$1500/month",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Tesla</h1>
        <p className="text-muted-foreground">
          Select a plan that fits your driving needs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            onSubscribe={handleSubscribe}
            isLoading={isLoading === plan.name}
          />
        ))}
      </div>

      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PlanCustomizer
            basePlan={selectedPlan}
            basePrice={Number(plans.find((p) => p.name === selectedPlan)?.price) || 0}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <PlanComparison />
      </motion.div>
    </section>
  );
};