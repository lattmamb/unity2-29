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
    <Card className={`relative transition-all duration-300 hover:shadow-lg
      ${plan.popular ? "border-primary/50 shadow-md" : "border-white/10"}`}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center pt-8">
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <p className="text-muted-foreground">{plan.description}</p>
        <div className="mt-4 text-4xl font-bold">
          ${plan.price}
          <span className="text-base font-normal text-muted-foreground">/mo</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{plan.vehicle}</h3>
          <ul className="space-y-2">
            {plan.features.slice(0, 5).map((feature: string) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pb-8">
        <Button
          className="w-full"
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
  );
};