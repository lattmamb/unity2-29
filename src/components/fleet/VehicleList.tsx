import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Battery, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const VehicleList = () => {
  const { toast } = useToast();
  const { data: vehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const handleScheduleMaintenance = (vehicleId: string) => {
    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance has been scheduled for vehicle ${vehicleId}`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Battery</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles?.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">{vehicle.name}</TableCell>
              <TableCell className="capitalize">{vehicle.type}</TableCell>
              <TableCell>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  vehicle.status === 'available' 
                    ? 'bg-green-100 text-green-800'
                    : vehicle.status === 'maintenance'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {vehicle.status}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4" />
                  {vehicle.battery_level}%
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center gap-2"
                  onClick={() => handleScheduleMaintenance(vehicle.id)}
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Maintenance
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};