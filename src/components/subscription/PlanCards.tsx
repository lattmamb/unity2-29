import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Base Plan",
    tagline: "Drive with Freedom",
    price: 250,
    features: [
      "Unlimited rides within your city",
      "Basic support during business hours",
      "Standard vehicle access",
      "Public charging (pay-as-you-go)",
      "Basic app features",
    ],
    cta: "Choose Base Plan",
  },
  {
    name: "Premium Take-Home",
    tagline: "Elevate Your Journey",
    price: 750,
    popular: true,
    features: [
      "Take-home vehicle",
      "Unlimited rides anywhere",
      "Free public charging",
      "24/7 priority support",
      "Premium app features",
    ],
    cta: "Upgrade to Premium",
  },
  {
    name: "Elite Take-Home",
    tagline: "Ultimate Luxury & Freedom",
    price: 1250,
    features: [
      "Luxury take-home vehicle",
      "Global unlimited rides",
      "Free premium charging",
      "24/7 concierge support",
      "All premium features + beta access",
    ],
    cta: "Go Elite",
  },
];

export const PlanCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card 
            className={cn(
              "relative h-full bg-background/80 backdrop-blur-sm border-[0.5px] transition-all duration-300",
              "hover:shadow-lg hover:shadow-rental-blue/20 hover:scale-105",
              "group",
              plan.popular ? 'border-rental-blue/30' : 'border-white/10'
            )}
          >
            {plan.popular && (
              <Badge 
                className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 
                bg-rental-blue text-white px-4 py-1 text-xs font-medium"
              >
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pt-8 space-y-2">
              <h3 className="text-2xl font-medium">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.tagline}</p>
              <div className="mt-4">
                <span className="text-4xl font-light">${plan.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform">
                    <Check className="h-4 w-4 text-rental-blue/70 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pb-6">
              <Button
                className="w-full bg-rental-blue/90 hover:bg-rental-blue text-white border-0
                transition-all duration-300 hover:shadow-lg hover:shadow-rental-blue/20 group"
              >
                <span>{plan.cta}</span>
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};