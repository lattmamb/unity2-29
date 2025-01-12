import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export const SubscriptionStatus = () => {
  const { user } = useAuth();

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Subscription Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Current Plan</p>
          <p className="text-lg font-semibold">{subscription?.plan}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Renewal Date</p>
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {subscription?.renewalDate}
          </p>
        </div>
        <Button className="w-full" variant="outline">
          Manage Subscription
        </Button>
      </CardContent>
    </Card>
  );
};