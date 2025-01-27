import { motion } from "framer-motion";
import { Award, Clock, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const perks = [
  {
    icon: Crown,
    title: "'Pay It Forward' Feature",
    description: "Sponsor rides for others and make a positive impact in your community",
  },
  {
    icon: Award,
    title: "VIP Lounge Access",
    description: "Exclusive access to Unity Link lounges with premium amenities",
  },
  {
    icon: Clock,
    title: "Early Access",
    description: "Be the first to try new features and vehicle models",
  },
];

export const ExclusivePerks = () => {
  return (
    <section className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl font-bold">Exclusive Perks</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enjoy premium benefits designed to enhance your Unity Fleet experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {perks.map((perk, index) => (
          <motion.div
            key={perk.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card h-full group hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <perk.icon className="h-12 w-12 mx-auto text-rental-blue" />
                <h3 className="text-xl font-semibold">{perk.title}</h3>
                <p className="text-sm text-muted-foreground">{perk.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};