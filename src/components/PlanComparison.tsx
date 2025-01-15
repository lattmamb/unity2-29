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
    essential: "Model 3 Standard",
    premium: "Model S, Model 3 Performance",
    elite: "All Models (Including Model X, Model S Plaid)",
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
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-6 md:mb-8 text-center break-words">
        Detailed Plan Comparison
      </h2>
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Features</TableHead>
                  <TableHead className="whitespace-nowrap">Essential</TableHead>
                  <TableHead className="whitespace-nowrap">Premium</TableHead>
                  <TableHead className="whitespace-nowrap">Elite</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="font-medium break-words">{feature.name}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {typeof feature.essential === "boolean" ? (
                        feature.essential ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )
                      ) : (
                        feature.essential
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {typeof feature.premium === "boolean" ? (
                        feature.premium ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )
                      ) : (
                        feature.premium
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {typeof feature.elite === "boolean" ? (
                        feature.elite ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )
                      ) : (
                        feature.elite
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