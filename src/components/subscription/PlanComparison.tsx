import { comparisonFeatures } from "./ComparisonData";
import { ComparisonTable } from "./ComparisonTable";
import { motion } from "framer-motion";

export const PlanComparison = () => {
  return (
    <motion.div 
      className="mt-8 md:mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl md:text-2xl font-bold text-rental-blue mb-6 md:mb-8 text-center break-words">
        Compare Plans
      </h2>
      <div className="glass-card p-4">
        <ComparisonTable features={comparisonFeatures} />
      </div>
    </motion.div>
  );
};