import { useState } from "react";
import { plans } from "./subscription/PlanData";
import { PlanCard } from "./subscription/PlanCard";
import { PlanHeader } from "./subscription/PlanHeader";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { useToast } from "@/components/ui/use-toast";

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
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <PlanHeader 
          title="Choose Your Perfect Tesla" 
          description="Select a subscription plan that fits your lifestyle. All plans include insurance, maintenance, and charging access."
        />

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