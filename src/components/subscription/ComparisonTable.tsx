import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  name: string;
  essential: string | boolean;
  premium: string | boolean;
  elite: string | boolean;
}

interface ComparisonTableProps {
  features: Feature[];
}

export const ComparisonTable = ({ features }: ComparisonTableProps) => {
  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-rental-blue animate-pulse-soft" />
      ) : (
        <X className="h-5 w-5 text-red-500/50" />
      );
    }
    return <span className="text-muted-foreground">{value}</span>;
  };

  return (
    <div className="overflow-x-auto -mx-4 md:mx-0">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap font-medium">Features</TableHead>
                <TableHead className="whitespace-nowrap text-center">Essential</TableHead>
                <TableHead className="whitespace-nowrap text-center">Premium</TableHead>
                <TableHead className="whitespace-nowrap text-center">Elite</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, index) => (
                <TableRow 
                  key={feature.name}
                  className={cn(
                    "transition-colors hover:bg-rental-blue/5",
                    index % 2 === 0 ? "bg-background/40" : "bg-background/20"
                  )}
                >
                  <TableCell className="font-medium break-words">
                    {feature.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderValue(feature.essential)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderValue(feature.premium)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderValue(feature.elite)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};