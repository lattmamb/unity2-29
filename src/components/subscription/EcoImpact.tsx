import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Zap, Car } from "lucide-react";

export const EcoImpact = () => {
  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold">Your Environmental Impact</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your contribution to a greener future with Unity Fleet
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-background/80 backdrop-blur-sm border-[0.5px] border-white/10">
          <CardContent className="p-6 text-center space-y-4">
            <Leaf className="h-12 w-12 mx-auto text-green-500" />
            <h3 className="text-xl font-semibold">500 lbs</h3>
            <p className="text-sm text-muted-foreground">CO₂ Saved This Month</p>
          </CardContent>
        </Card>

        <Card className="bg-background/80 backdrop-blur-sm border-[0.5px] border-white/10">
          <CardContent className="p-6 text-center space-y-4">
            <Zap className="h-12 w-12 mx-auto text-yellow-500" />
            <h3 className="text-xl font-semibold">250 kWh</h3>
            <p className="text-sm text-muted-foreground">Clean Energy Used</p>
          </CardContent>
        </Card>

        <Card className="bg-background/80 backdrop-blur-sm border-[0.5px] border-white/10">
          <CardContent className="p-6 text-center space-y-4">
            <Car className="h-12 w-12 mx-auto text-rental-blue" />
            <h3 className="text-xl font-semibold">50 Rides</h3>
            <p className="text-sm text-muted-foreground">Sustainable Trips</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};