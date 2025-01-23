import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";

export const SubscriptionStatus = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: subscription } = useQuery({
    queryKey: ["subscription", user?.id],
    queryFn: async () => {
      // Placeholder for subscription data
      return {
        plan: "Essential Plan",
        renewalDate: "2024-04-15",
        status: "active"
      };
    },
    enabled: !!user,
  });

  const handleManageSubscription = () => {
    navigate("/subscription");
  };

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-accent/10 hover:border-accent/20 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <CreditCard className="h-5 w-5" />
          Subscription Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Current Plan</p>
          <p className="text-lg font-semibold text-blue-500">{subscription?.plan}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Renewal Date</p>
          <div className="flex items-center gap-2 text-secondary">
            <Calendar className="h-4 w-4" />
            {subscription?.renewalDate}
          </div>
        </div>
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          onClick={handleManageSubscription}
        >
          Manage Subscription
        </Button>
      </CardContent>
    </Card>
  );
};