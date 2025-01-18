import { useState } from "react";
import { plans } from "./subscription/PlanData";
import { PlanCard } from "./subscription/PlanCard";
import { PlanHeader } from "./subscription/PlanHeader";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { useToast } from "@/components/ui/use-toast";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

export const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (planName: string) => {
    setIsLoading(planName);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSelectedPlan(planName);
    setIsLoading(null);
    toast({
      title: "Plan Selected",
      description: `You've selected the ${planName}. Customize it below.`,
    });
  };

  return (
    <section className="relative">
      <div className="h-[50vh] relative overflow-hidden bg-[#0B1F3B]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <LampContainer className="bg-transparent">
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
            >
              Choose Your Perfect Tesla
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-xl md:text-2xl text-white/80"
            >
              Select a subscription plan that fits your lifestyle
            </motion.p>
          </LampContainer>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <div className="mt-12">
            <PlanCustomizer
              basePlan={selectedPlan}
              basePrice={Number(plans.find((p) => p.name === selectedPlan)?.price) || 0}
            />
          </div>
        )}

        <div className="mt-16">
          <PlanComparison />
        </div>
      </div>
    </section>
  );
};