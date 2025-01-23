import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PlanCardProps {
  plan: any;
  onSubscribe: (planName: string) => void;
  isLoading: boolean;
}

export const PlanCard = ({ plan, onSubscribe, isLoading }: PlanCardProps) => {
  return (
    <Card className={`relative bg-background/80 backdrop-blur-sm border-[0.5px] transition-all duration-300
      ${plan.popular ? 'border-primary/30' : 'border-white/10'}`}>
      {plan.popular && (
        <Badge 
          className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 
          bg-primary/90 text-white px-4 py-1 text-xs font-medium"
        >
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center pt-8 space-y-2">
        <CardTitle className="text-xl font-medium">{plan.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
        <div className="mt-4">
          <span className="text-3xl font-light">${plan.price}</span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground/80">{plan.vehicle}</h3>
          <ul className="space-y-2">
            {plan.features.slice(0, 5).map((feature: string) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary/70 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pb-6">
        <Button
          className="w-full bg-primary/90 hover:bg-primary text-white border-0"
          onClick={() => onSubscribe(plan.name)}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            "Subscribe"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};