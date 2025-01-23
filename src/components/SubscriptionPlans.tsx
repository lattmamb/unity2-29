import { useState } from "react";
import { plans } from "./subscription/PlanData";
import { PlanCard } from "./subscription/PlanCard";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { useToast } from "@/components/ui/use-toast";
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

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12 space-y-2">
        <h1 className="text-3xl font-light">Choose Your Plan</h1>
        <p className="text-muted-foreground text-sm">
          Select a subscription that fits your driving needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
        <div className="fade-in-bottom">
          <PlanCustomizer
            basePlan={selectedPlan}
            basePrice={Number(plans.find((p) => p.name === selectedPlan)?.price) || 0}
          />
        </div>
      )}

      <div className="mt-20">
        <PlanComparison />
      </div>
    </section>
  );
};