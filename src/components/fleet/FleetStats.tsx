import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Truck, Clock } from "lucide-react";

export const FleetStats = () => {
  return (
    <Card className="bg-accent/10 border-0">
      <CardHeader>
        <CardTitle className="text-lg">Fleet Statistics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <StatCard
          icon={Battery}
          title="Average Battery"
          value="75%"
          trend="+5%"
        />
        <StatCard
          icon={Truck}
          title="Active Vehicles"
          value="12"
          trend="+2"
        />
        <StatCard
          icon={Clock}
          title="Avg. Trip Time"
          value="2.5h"
          trend="-10min"
        />
      </CardContent>
    </Card>
  );
};

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  trend 
}: { 
  icon: any;
  title: string;
  value: string;
  trend: string;
}) => (
  <div className="p-4 bg-background/5 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-4 w-4 text-secondary" />
      <span className="text-sm text-muted-foreground">{title}</span>
    </div>
    <div className="flex items-baseline justify-between">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-eco">{trend}</span>
    </div>
  </div>
);