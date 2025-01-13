import { PageLayout } from "@/components/PageLayout";
import { VehicleCard } from "@/components/rentals/VehicleCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Car, Calendar, CreditCard } from "lucide-react";

export default function Rentals() {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["rental-vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "available");
      
      if (error) throw error;
      return data;
    },
  });

  const menuItems = [
    {
      title: "Available Vehicles",
      icon: Car,
      description: "Browse our rental fleet",
    },
    {
      title: "Booking Calendar",
      icon: Calendar,
      description: "Check vehicle availability",
    },
    {
      title: "Rental Rates",
      icon: CreditCard,
      description: "View our competitive pricing",
    },
  ];

  return (
    <PageLayout title="Vehicle Rentals" menuItems={menuItems}>
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] animate-pulse bg-accent/5 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles?.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}