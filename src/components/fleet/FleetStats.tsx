import { Card, CardContent } from "@/components/ui/card";
import { Battery, Truck, Clock, Zap } from "lucide-react";

export const FleetStats = () => {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Fleet Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={Battery}
          title="Average Battery"
          value="75%"
          trend="+5%"
          trendType="positive"
        />
        <StatCard
          icon={Truck}
          title="Active Vehicles"
          value="12"
          trend="+2"
          trendType="positive"
        />
        <StatCard
          icon={Clock}
          title="Avg. Trip Time"
          value="2.5h"
          trend="-10min"
          trendType="positive"
        />
        <StatCard
          icon={Zap}
          title="Energy Usage"
          value="450 kWh"
          trend="-5%"
          trendType="positive"
        />
      </div>
    </Card>
  );
};

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  trend,
  trendType = "positive"
}: { 
  icon: any;
  title: string;
  value: string;
  trend: string;
  trendType?: "positive" | "negative";
}) => (
  <div className="bg-accent/10 p-4 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-4 w-4 text-secondary" />
      <span className="text-sm text-muted-foreground">{title}</span>
    </div>
    <div className="flex items-baseline justify-between">
      <span className="text-2xl font-bold">{value}</span>
      <span className={`text-sm ${trendType === "positive" ? "text-eco" : "text-destructive"}`}>
        {trend}
      </span>
    </div>
  </div>
);