import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

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
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      );
    }
    return value;
  };

  return (
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
                    {renderValue(feature.essential)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {renderValue(feature.premium)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
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