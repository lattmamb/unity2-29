import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Essential Plan",
    price: 350,
    description: "Perfect for occasional drivers",
    features: [
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
    features: [
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
    features: [
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
  const handleSubscribe = (planName: string) => {
    // TODO: Implement subscription logic
    console.log(`Subscribing to ${planName}`);
  };

  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">
            Select the perfect subscription that fits your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? "border-2 border-secondary shadow-lg scale-105"
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
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-secondary hover:bg-secondary/90" : ""
                  }`}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 justify-center">
              <Check className="h-5 w-5 text-green-500" />
              <span>Insurance Coverage</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="h-5 w-5 text-green-500" />
              <span>Flexible Cancellation</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="h-5 w-5 text-green-500" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};