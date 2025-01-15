import { comparisonFeatures } from "./ComparisonData";
import { ComparisonTable } from "./ComparisonTable";

export const PlanComparison = () => {
  return (
    <div className="mt-8 md:mt-16">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-6 md:mb-8 text-center break-words">
        Detailed Plan Comparison
      </h2>
      <ComparisonTable features={comparisonFeatures} />
    </div>
  );
};