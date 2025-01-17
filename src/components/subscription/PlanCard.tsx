import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface PlanCardProps {
  plan: any;
  onSubscribe: (planName: string) => void;
  isLoading: boolean;
}

export const PlanCard = ({ plan, onSubscribe, isLoading }: PlanCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl glass-card
          ${plan.popular ? "border-primary/50 shadow-lg md:scale-105" : "border-white/10"}
          hover:border-primary/50 group`}>
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </Badge>
            </div>
          )}
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-2xl font-bold text-primary-foreground">{plan.name}</CardTitle>
            <p className="text-muted-foreground">{plan.description}</p>
            <div className="mt-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
              ${plan.price}
              <span className="text-base font-normal text-muted-foreground">
                /mo
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video relative bg-black/20 rounded-xl overflow-hidden p-4 backdrop-blur-sm">
              <img
                src={plan.image}
                alt={plan.vehicle}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-primary-foreground">{plan.vehicle}</h3>
              <ul className="space-y-3">
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="my-6 bg-white/10" />
            <div className="space-y-3">
              <h4 className="font-semibold text-primary-foreground">Available Add-ons:</h4>
              <ul className="space-y-2">
                {plan.addOns.map((addon: any) => (
                  <li key={addon.name} className="text-sm flex justify-between items-center">
                    <span className="text-muted-foreground">{addon.name}</span>
                    <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border border-primary/30">
                      +${addon.price}/mo
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pb-8">
            <Button
              className="w-full glass-button"
              onClick={() => onSubscribe(plan.name)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/50 border-t-white mr-2" />
                  Processing...
                </>
              ) : (
                "Subscribe Now"
              )}
            </Button>
          </CardFooter>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4 glass-card">
        <div className="space-y-4">
          <h3 className="font-semibold text-primary-foreground">Available Trims</h3>
          <div className="space-y-4">
            {plan.trims.map((trim: any) => (
              <div key={trim.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-primary-foreground">{trim.name}</span>
                  <span className="text-sm text-primary">${trim.price}/mo</span>
                </div>
                <ul className="space-y-1">
                  {trim.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-3 w-3 text-primary" />
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
  );
};