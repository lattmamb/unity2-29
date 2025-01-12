import { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const plans = [
  {
    name: "Essential Plan",
    price: 350,
    description: "Perfect for occasional drivers",
    vehicle: "Tesla Model 3",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
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
    description: "Ideal for regular commuters",
    vehicle: "Tesla Model Y",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
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
    description: "Ultimate flexibility and luxury",
    vehicle: "Tesla Model X",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
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
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">
            Tesla Subscription Plans
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Select your perfect Tesla experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {plans.map((plan) => (
            <HoverCard key={plan.name}>
              <HoverCardTrigger asChild>
                <Card
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    plan.popular
                      ? "border-2 border-secondary shadow-lg md:scale-105"
                      : "border border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div 
                    className="h-48 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${plan.image})` }}
                  />
                  <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl md:text-3xl">{plan.name}</CardTitle>
                    <CardDescription className="text-lg">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <div className="mb-4 p-3 bg-secondary/10 rounded-lg">
                      <p className="text-secondary-foreground font-semibold">{plan.vehicle}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
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
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-4">
                  <img 
                    src={plan.image} 
                    alt={plan.vehicle}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{plan.vehicle} Features</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
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
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 justify-center">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span>Insurance Coverage</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span>Flexible Cancellation</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};