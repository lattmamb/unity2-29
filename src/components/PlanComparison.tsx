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
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-primary mb-8 text-center">
        Detailed Plan Comparison
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Features</TableHead>
              <TableHead>Essential</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Elite</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.name}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell>
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
                <TableCell>
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
                <TableCell>
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
  );
};