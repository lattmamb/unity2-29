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
    <section className="relative">
      <div className="h-[50vh] relative overflow-hidden">
        <img 
          src="/lovable-uploads/fffbc4a7-1bff-48ee-b0eb-d56a7429a02a.png"
          alt="Tesla Fleet at Night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Choose Your Perfect Tesla</h1>
            <p className="text-xl md:text-2xl text-white/80">
              Select a subscription plan that fits your lifestyle
            </p>
          </div>
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