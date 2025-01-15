import { Battery, Gauge, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface VehicleStatsProps {
  batteryLevel: number;
  rangeMiles: number;
  horsepower: number;
}

export function VehicleStats({ batteryLevel, rangeMiles, horsepower }: VehicleStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <motion.div 
        className="text-center group/stat"
        whileHover={{ scale: 1.05 }}
      >
        <div className="p-3 rounded-lg bg-accent/5 group-hover/stat:bg-accent/10 transition-colors">
          <Battery className="h-6 w-6 mx-auto mb-2 text-secondary" />
          <div className="text-sm font-medium">{batteryLevel}%</div>
          <div className="text-xs text-muted-foreground">Battery</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="text-center group/stat"
        whileHover={{ scale: 1.05 }}
      >
        <div className="p-3 rounded-lg bg-accent/5 group-hover/stat:bg-accent/10 transition-colors">
          <Zap className="h-6 w-6 mx-auto mb-2 text-secondary" />
          <div className="text-sm font-medium">{rangeMiles}mi</div>
          <div className="text-xs text-muted-foreground">Range</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="text-center group/stat"
        whileHover={{ scale: 1.05 }}
      >
        <div className="p-3 rounded-lg bg-accent/5 group-hover/stat:bg-accent/10 transition-colors">
          <Gauge className="h-6 w-6 mx-auto mb-2 text-secondary" />
          <div className="text-sm font-medium">{horsepower}hp</div>
          <div className="text-xs text-muted-foreground">Power</div>
        </div>
      </motion.div>
    </div>
  );
}