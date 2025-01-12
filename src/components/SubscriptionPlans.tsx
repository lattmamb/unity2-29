import { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";

const plans = [
  {
    name: "Essential Plan",
    price: 350,
    description: "Perfect for occasional drivers - Includes Tesla Model 3",
    vehicle: "Tesla Model 3",
    features: [
      "Tesla Model 3 included",
      "Up to 1,000 miles per month",
      "Basic vehicle selection",
      "Standard maintenance coverage",
      "24/7 roadside assistance",
      "Basic charging access",
    ],
  },
  {
    name: "Premium Plan",
    price: 750,
    description: "Ideal for regular commuters - Includes Tesla Model Y",
    vehicle: "Tesla Model Y",
    features: [
      "Tesla Model Y included",
      "Up to 2,000 miles per month",
      "Premium vehicle selection",
      "Full maintenance coverage",
      "Priority roadside assistance",
      "Premium charging access",
      "Full Self-Driving capability",
    ],
    popular: true,
  },
  {
    name: "Elite Plan",
    price: 1500,
    description: "Ultimate flexibility and luxury - Includes Tesla Model X",
    vehicle: "Tesla Model X",
    features: [
      "Tesla Model X included",
      "Unlimited miles",
      "Luxury vehicle selection",
      "Comprehensive coverage",
      "VIP roadside assistance",
      "Priority charging access",
      "Full Self-Driving capability",
      "Vehicle switching anytime",
      "Dedicated concierge",
    ],
  },
];

export const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (planName: string) => {
    setIsLoading(planName);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSelectedPlan(planName);
    setIsLoading(null);
  };

  return (
    <section className="py-8 md:py-16 bg-accent">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4 break-words">Choose Your Plan</h1>
          <p className="text-base md:text-lg text-gray-600 px-2">
            Select the perfect Tesla subscription that fits your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden ${
                plan.popular
                  ? "border-2 border-secondary shadow-lg md:scale-105"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="space-y-1 p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl break-words">{plan.name}</CardTitle>
                <CardDescription className="text-sm break-words">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="mb-4 md:mb-6">
                  <span className="text-3xl md:text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="mb-4 p-3 bg-secondary/10 rounded-lg">
                  <p className="text-secondary-foreground font-semibold">{plan.vehicle}</p>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 break-words">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-sm md:text-base text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-4 md:p-6">
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-secondary hover:bg-secondary/90" : ""
                  }`}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={isLoading === plan.name}
                >
                  {isLoading === plan.name ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-8">
            <PlanCustomizer
              basePlan={selectedPlan}
              basePrice={plans.find((p) => p.name === selectedPlan)?.price || 0}
            />
          </div>
        )}

        <PlanComparison />

        <div className="mt-8 md:mt-16 text-center px-4">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 break-words">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 justify-center">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-sm md:text-base break-words">Insurance Coverage</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-sm md:text-base break-words">Flexible Cancellation</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-sm md:text-base break-words">24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};