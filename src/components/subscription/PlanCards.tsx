
import { motion } from "framer-motion";
import { Check, ChevronRight, Car, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ModelSCarousel } from "./ModelSCarousel";

const plans = [
  {
    name: "Base Plan",
    tagline: "Model 3 Standard",
    price: 350,
    vehicle: "Tesla Model 3 (No FSD)",
    specs: {
      range: "250 miles",
      acceleration: "5.8s 0-60",
      topSpeed: "140 mph"
    },
    features: [
      "Unlimited rides within your city",
      "Basic support during business hours",
      "Standard vehicle access",
      "Public charging (pay-as-you-go)",
      "Basic app features",
    ],
    addOns: ["FSD capability (+$200/mo)", "Premium Connectivity (+$10/mo)"],
    cta: "Choose Base Plan",
  },
  {
    name: "Premium Take-Home",
    tagline: "Model Y Long Range",
    price: 750,
    popular: true,
    vehicle: "Tesla Model Y (with FSD)",
    specs: {
      range: "330 miles",
      acceleration: "4.8s 0-60",
      topSpeed: "135 mph"
    },
    features: [
      "Take-home vehicle",
      "Unlimited rides anywhere",
      "Free public charging",
      "24/7 priority support",
      "Premium app features",
    ],
    addOns: ["Premium Connectivity included", "HomeLink (+$50 one-time)"],
    cta: "Upgrade to Premium",
  },
  {
    name: "Elite Take-Home",
    tagline: "Model S Plaid",
    price: 1250,
    vehicle: "Tesla Model S (Full Premium)",
    specs: {
      range: "396 miles",
      acceleration: "1.99s 0-60",
      topSpeed: "200 mph"
    },
    features: [
      "Luxury take-home vehicle",
      "Global unlimited rides",
      "Free premium charging",
      "24/7 concierge support",
      "All premium features + beta access",
    ],
    addOns: ["All premium features included"],
    cta: "Go Elite",
  },
];

export const PlanCards = () => {
  return (
    <div className="space-y-12">
      <div id="plans-section" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <Card 
              className={cn(
                "relative h-full bg-background/80 backdrop-blur-sm border-[0.5px] transition-all duration-300",
                "hover:shadow-lg hover:shadow-rental-blue/20",
                "group",
                plan.popular ? 'border-rental-blue/30' : 'border-white/10'
              )}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 
                  bg-rental-blue text-white px-4 py-1 text-xs font-medium animate-pulse-soft"
                >
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pt-8 space-y-2">
                <div className="flex items-center justify-center gap-2 text-rental-blue">
                  <Car className="h-5 w-5" />
                  <h3 className="text-2xl font-medium">{plan.name}</h3>
                </div>
                <p className="text-lg font-semibold text-foreground">{plan.vehicle}</p>
                <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                <div className="mt-4">
                  <span className="text-4xl font-light">${plan.price}</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <Zap className="h-4 w-4 mx-auto mb-1 text-rental-blue" />
                    <p className="font-medium">{plan.specs.range}</p>
                    <p className="text-xs text-muted-foreground">Range</p>
                  </div>
                  <div>
                    <Car className="h-4 w-4 mx-auto mb-1 text-rental-blue" />
                    <p className="font-medium">{plan.specs.acceleration}</p>
                    <p className="text-xs text-muted-foreground">0-60</p>
                  </div>
                  <div>
                    <Shield className="h-4 w-4 mx-auto mb-1 text-rental-blue" />
                    <p className="font-medium">{plan.specs.topSpeed}</p>
                    <p className="text-xs text-muted-foreground">Top Speed</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Features:</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <motion.li
                        key={feature}
                        className="flex items-center gap-2 text-sm group-hover:translate-x-1 transition-transform"
                      >
                        <Check className="h-4 w-4 text-rental-blue/70 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Available Add-ons:</p>
                  <ul className="space-y-1">
                    {plan.addOns.map((addon) => (
                      <li key={addon} className="text-sm text-muted-foreground">
                        {addon}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="pb-6">
                <Button
                  className="w-full bg-rental-blue/90 hover:bg-rental-blue text-white border-0
                  transition-all duration-300 hover:shadow-lg hover:shadow-rental-blue/20 group relative overflow-hidden"
                >
                  <span className="relative z-10">{plan.cta}</span>
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-rental-blue via-white/20 to-rental-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Model S Carousel for Elite Plan */}
      <div className="mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-6"
        >
          <h3 className="text-2xl font-semibold mb-2">Elite Plan Showcase: Model S</h3>
          <p className="text-muted-foreground">Experience luxury and performance with our Elite Plan Model S</p>
        </motion.div>
        <ModelSCarousel />
      </div>
    </div>
  );
};
