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
        <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white border-2 
          ${plan.popular ? "border-ev-DEFAULT shadow-lg md:scale-105" : "border-gray-100"}
          hover:border-ev-DEFAULT group`}>
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-ev-DEFAULT text-white px-4 py-1 rounded-full">
                Most Popular
              </Badge>
            </div>
          )}
          <CardHeader className="text-center pt-8">
            <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
            <p className="text-gray-600">{plan.description}</p>
            <div className="mt-4 text-4xl font-bold text-ev-dark">
              ${plan.price}
              <span className="text-base font-normal text-gray-500">
                /mo
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video relative bg-ev-light rounded-xl overflow-hidden p-4">
              <img
                src={plan.image}
                alt={plan.vehicle}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-900">{plan.vehicle}</h3>
              <ul className="space-y-3">
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-ev-DEFAULT flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="my-6" />
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Available Add-ons:</h4>
              <ul className="space-y-2">
                {plan.addOns.map((addon: any) => (
                  <li key={addon.name} className="text-sm text-gray-600 flex justify-between items-center">
                    <span>{addon.name}</span>
                    <Badge variant="outline" className="text-ev-dark">
                      +${addon.price}/mo
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pb-8">
            <Button
              className="w-full bg-ev-DEFAULT hover:bg-ev-dark text-white transition-all duration-300 py-6"
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
      <HoverCardContent className="w-80 p-4">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Available Trims</h3>
          <div className="space-y-4">
            {plan.trims.map((trim: any) => (
              <div key={trim.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{trim.name}</span>
                  <span className="text-sm text-ev-dark">${trim.price}/mo</span>
                </div>
                <ul className="space-y-1">
                  {trim.features.map((feature: string) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-3 w-3 text-ev-DEFAULT" />
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