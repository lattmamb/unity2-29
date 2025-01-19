import { useState } from "react";
import { plans } from "./subscription/PlanData";
import { PlanCard } from "./subscription/PlanCard";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Car, Zap, Crown } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

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

  const subscriptionCards = [
    {
      icon: <Car className="size-4 text-blue-300" />,
      title: "Essential Plan",
      description: "Perfect for occasional drivers",
      date: "$350/month",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 -translate-x-32",
    },
    {
      icon: <Zap className="size-4 text-violet-300" />,
      title: "Premium Plan",
      description: "Ideal for regular commuters",
      date: "$750/month",
      iconClassName: "text-violet-500",
      titleClassName: "text-violet-500",
      className: "[grid-area:stack] translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Crown className="size-4 text-amber-300" />,
      title: "Elite Plan",
      description: "Ultimate flexibility and luxury",
      date: "$1500/month",
      iconClassName: "text-amber-500",
      titleClassName: "text-amber-500",
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <section className="relative">
      <ContainerScroll
        titleComponent={
          <div className="relative">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                Choose Your Perfect Tesla
              </h1>
              <div className="mt-8 h-[400px] md:h-[600px] w-full">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        }
      >
        <div className="mt-12 scale-[1.5] transform w-full max-w-6xl mx-auto px-8">
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
        </div>
      </ContainerScroll>

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
    </section>
  );
};