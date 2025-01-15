import { Tables } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, DollarSign, Gauge } from "lucide-react";
import { motion } from "framer-motion";

interface FleetMetricsProps {
  vehicles: Tables<"vehicles">[];
}

export function FleetMetrics({ vehicles }: FleetMetricsProps) {
  const metrics = {
    daily: {
      revenue: 2500,
      mileage: 1200,
      maintenance: 2,
    },
    weekly: {
      revenue: 15000,
      mileage: 8400,
      maintenance: 5,
    },
    monthly: {
      revenue: 60000,
      mileage: 32000,
      maintenance: 12,
    },
  };

  return (
    <Card className="p-6 bg-accent/5 backdrop-blur-sm border-accent/20">
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        
        {Object.entries(metrics).map(([period, data]) => (
          <TabsContent key={period} value={period} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-lg bg-background/50 border border-accent/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
                  <DollarSign className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold mt-2">${data.revenue.toLocaleString()}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-lg bg-background/50 border border-accent/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Mileage</h3>
                  <Gauge className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold mt-2">{data.mileage.toLocaleString()} mi</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 rounded-lg bg-background/50 border border-accent/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Maintenance</h3>
                  <Battery className="h-4 w-4 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold mt-2">{data.maintenance} vehicles</p>
              </motion.div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}