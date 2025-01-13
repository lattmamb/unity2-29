import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

const features = [
  {
    name: "Monthly Mileage",
    essential: "1,000 miles",
    premium: "2,000 miles",
    elite: "Unlimited",
  },
  {
    name: "Vehicle Selection",
    essential: "Basic",
    premium: "Premium",
    elite: "Luxury",
  },
  {
    name: "FSD Capability",
    essential: false,
    premium: true,
    elite: true,
  },
  {
    name: "Maintenance Coverage",
    essential: "Basic",
    premium: "Full",
    elite: "Comprehensive",
  },
  {
    name: "Charging Access",
    essential: "Basic",
    premium: "Premium",
    elite: "Priority",
  },
  {
    name: "Vehicle Switching",
    essential: false,
    premium: false,
    elite: true,
  },
  {
    name: "Dedicated Concierge",
    essential: false,
    premium: false,
    elite: true,
  },
];

export const PlanComparison = () => {
  return (
    <div className="mt-8 md:mt-16">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center break-words">
        Detailed Plan Comparison
      </h2>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden glass-card rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-700">
                  <TableHead className="text-gray-300">Features</TableHead>
                  <TableHead className="text-gray-300">Essential</TableHead>
                  <TableHead className="text-gray-300">Premium</TableHead>
                  <TableHead className="text-gray-300">Elite</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow 
                    key={feature.name}
                    className="border-b border-gray-700 hover:bg-secondary/5 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-300">{feature.name}</TableCell>
                    <TableCell>
                      {typeof feature.essential === "boolean" ? (
                        feature.essential ? (
                          <Check className="h-5 w-5 text-secondary" />
                        ) : (
                          <X className="h-5 w-5 text-gray-500" />
                        )
                      ) : (
                        <span className="text-gray-300">{feature.essential}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {typeof feature.premium === "boolean" ? (
                        feature.premium ? (
                          <Check className="h-5 w-5 text-secondary" />
                        ) : (
                          <X className="h-5 w-5 text-gray-500" />
                        )
                      ) : (
                        <span className="text-gray-300">{feature.premium}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {typeof feature.elite === "boolean" ? (
                        feature.elite ? (
                          <Check className="h-5 w-5 text-secondary" />
                        ) : (
                          <X className="h-5 w-5 text-gray-500" />
                        )
                      ) : (
                        <span className="text-gray-300">{feature.elite}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};