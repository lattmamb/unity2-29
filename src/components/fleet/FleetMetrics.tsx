import { Tables } from "@/integrations/supabase/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Gauge, Battery } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { StatCard } from "@/components/ui/stat-card";

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
    <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border p-6">
      <h2 className="text-2xl font-bold mb-6">Fleet Metrics</h2>
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-accent/10 backdrop-blur-sm p-1 rounded-full">
          <TabsTrigger value="daily" className="rounded-full data-[state=active]:bg-primary">Daily</TabsTrigger>
          <TabsTrigger value="weekly" className="rounded-full data-[state=active]:bg-primary">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="rounded-full data-[state=active]:bg-primary">Monthly</TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <TabsContent value="daily">
            <motion.div
              key="daily"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <StatCard
                title="Revenue"
                value={`$${metrics.daily.revenue.toLocaleString()}`}
                icon={DollarSign}
                change={{ value: 12.5, label: "from yesterday" }}
                variant="primary"
              />
              <StatCard
                title="Total Mileage"
                value={`${metrics.daily.mileage.toLocaleString()} mi`}
                icon={Gauge}
                change={{ value: 8.3, label: "from yesterday" }}
                variant="success"
              />
              <StatCard
                title="Maintenance"
                value={metrics.daily.maintenance}
                icon={Battery}
                change={{ value: -2.1, label: "from yesterday" }}
                variant="warning"
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <motion.div
              key="weekly"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <StatCard
                title="Revenue"
                value={`$${metrics.weekly.revenue.toLocaleString()}`}
                icon={DollarSign}
                change={{ value: 15.7, label: "from last week" }}
                variant="primary"
              />
              <StatCard
                title="Total Mileage"
                value={`${metrics.weekly.mileage.toLocaleString()} mi`}
                icon={Gauge}
                change={{ value: 10.2, label: "from last week" }}
                variant="success"
              />
              <StatCard
                title="Maintenance"
                value={metrics.weekly.maintenance}
                icon={Battery}
                change={{ value: 5.4, label: "from last week" }}
                variant="warning"
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <motion.div
              key="monthly"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <StatCard
                title="Revenue"
                value={`$${metrics.monthly.revenue.toLocaleString()}`}
                icon={DollarSign}
                change={{ value: 23.8, label: "from last month" }}
                variant="primary"
              />
              <StatCard
                title="Total Mileage"
                value={`${metrics.monthly.mileage.toLocaleString()} mi`}
                icon={Gauge}
                change={{ value: 18.5, label: "from last month" }}
                variant="success"
              />
              <StatCard
                title="Maintenance"
                value={metrics.monthly.maintenance}
                icon={Battery}
                change={{ value: -3.2, label: "from last month" }}
                variant="warning"
              />
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
