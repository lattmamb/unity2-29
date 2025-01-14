import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanComparison } from "./PlanComparison";
import { PlanCustomizer } from "./PlanCustomizer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Car, Shield, Zap, Clock, Battery, CreditCard, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const plans = [
  {
    name: "Base Plan",
    description: "Perfect for occasional drivers",
    price: "350",
    maxPrice: "500",
    vehicle: "Tesla Model 3",
    image: "/lovable-uploads/9a7951c8-5fac-4e5d-9c41-4517db1e9f87.png",
    features: [
      "Model 3 (RWD - Standard Range)",
      "1,000-2,000 miles/month included",
      "Basic Autopilot",
      "Standard interior",
      "Pay-Per-Charge",
      "Standard support (Business Hours)",
      "Standard insurance (Higher deductible)",
    ],
    addOns: [
      { name: "Enhanced Autopilot / FSD", price: "50-100" },
      { name: "Extra Mileage (500 miles)", price: "50" },
      { name: "Maintenance & Extended Warranty", price: "30" },
    ],
    trims: [
      {
        name: "Model 3 RWD",
        price: "350",
        features: ["Standard Range", "Basic Autopilot", "Standard interior"],
      },
      {
        name: "Model 3 Long Range",
        price: "400",
        features: ["Dual Motor AWD", "Partial Premium interior", "Extended Range"],
      },
      {
        name: "Model 3 Performance",
        price: "500",
        features: ["Performance wheels & suspension", "Premium interior", "Maximum performance"],
      },
    ],
  },
  {
    name: "Premium Plan",
    description: "Ideal for regular commuters",
    price: "750",
    maxPrice: "1000",
    vehicle: "Tesla Model Y",
    image: "/lovable-uploads/e7208ea9-864c-4d4c-a5b4-341b0a6cc04d.png",
    popular: true,
    features: [
      "Model Y (Long Range or Performance)",
      "2,500-3,000 miles/month included",
      "Enhanced Autopilot option",
      "Premium interior",
      "Priority charging access",
      "Priority support (Extended Hours)",
      "Enhanced insurance (Lower deductible)",
    ],
    addOns: [
      { name: "Full Self-Driving", price: "100" },
      { name: "Unlimited Charging", price: "100-150" },
      { name: "Fleet Management Software", price: "150", note: "for business clients" },
    ],
    trims: [
      {
        name: "Model Y Long Range",
        price: "750",
        features: ["Dual Motor AWD", "7-seat option", "Priority maintenance"],
      },
      {
        name: "Model Y Performance",
        price: "1000",
        features: ["Performance tuning", "Premium interior & audio", "Priority roadside assist"],
      },
    ],
  },
  {
    name: "Exclusive Plan",
    description: "Ultimate flexibility and luxury",
    price: "1500",
    maxPrice: "2500",
    vehicle: "Tesla Model S & X",
    image: "/lovable-uploads/f927bb84-ef36-4762-8d10-ade9a41f18ce.png",
    features: [
      "Model S & X (All variants)",
      "3,500-4,500 miles/month included",
      "Full Self-Driving capability",
      "Premium interior & features",
      "Unlimited charging",
      "24/7 Dedicated support + Concierge",
      "Comprehensive insurance (Lowest deductible)",
    ],
    addOns: [
      { name: "Full Self-Driving", price: "150" },
      { name: "Advanced Fleet Telematics", price: "200", note: "for corporate" },
      { name: "White-Glove Service", price: "100" },
    ],
    trims: [
      {
        name: "Model S Long Range",
        price: "1500",
        features: ["Dual Motor AWD", "Premium interior", "24/7 support"],
      },
      {
        name: "Model S Plaid",
        price: "2000",
        features: ["Tri Motor AWD", "Advanced infotainment", "Concierge service"],
      },
      {
        name: "Model X Long Range",
        price: "1800",
        features: ["Premium SUV", "Falcon Wing doors", "Seating up to 7"],
      },
      {
        name: "Model X Plaid",
        price: "2500",
        features: ["Tri Motor AWD", "Luxury interior", "White-glove service"],
      },
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
            Unity Fleet Subscriptions
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your perfect Tesla experience with our flexible subscription plans.
            All plans include insurance, maintenance, and charging access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <HoverCard key={plan.name}>
              <HoverCardTrigger asChild>
                <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? "border-2 border-secondary shadow-lg md:scale-105" : "border border-gray-200"
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4 text-3xl font-bold">
                      ${plan.price}
                      <span className="text-sm font-normal text-gray-600">
                        - ${plan.maxPrice}/mo
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                      <img
                        src={plan.image}
                        alt={plan.vehicle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{plan.vehicle}</h3>
                      <ul className="space-y-2">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Available Add-ons:</h4>
                      <ul className="space-y-1">
                        {plan.addOns.map((addon) => (
                          <li key={addon.name} className="text-sm text-gray-600 flex justify-between">
                            <span>{addon.name}</span>
                            <span>+${addon.price}/mo</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
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
                  <h3 className="font-semibold">Available Trims</h3>
                  <div className="space-y-3">
                    {plan.trims.map((trim) => (
                      <div key={trim.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{trim.name}</span>
                          <span className="text-sm text-gray-600">${trim.price}/mo</span>
                        </div>
                        <ul className="text-sm text-gray-600">
                          {trim.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <Check className="h-3 w-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
      </div>
    </section>
  );
};