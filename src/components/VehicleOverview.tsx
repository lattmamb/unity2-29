import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, DollarSign, Image } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const VehicleOverview = () => {
  const { data: vehicles } = useQuery({
    queryKey: ["vehicles-overview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("type");
      
      if (error) throw error;
      return data;
    },
  });

  const getPlanType = (vehicleType: string) => {
    switch (vehicleType) {
      case "autonomous":
        return {
          name: "Premium Plan",
          price: 750,
          badge: "bg-secondary text-secondary-foreground"
        };
      case "driver":
        return {
          name: "Essential Plan",
          price: 350,
          badge: "bg-primary text-primary-foreground"
        };
      default:
        return {
          name: "Standard Plan",
          price: 500,
          badge: "bg-muted text-muted-foreground"
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Vehicle Overview</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/fleet">View All</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {vehicles?.map((vehicle) => {
          const plan = getPlanType(vehicle.type);
          return (
            <Card key={vehicle.id} className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                {vehicle.image_url ? (
                  <img
                    src={vehicle.image_url}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <Badge 
                  className={`absolute top-2 right-2 ${plan.badge}`}
                >
                  {plan.name}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{vehicle.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Car className="h-4 w-4" />
                      <span className="capitalize">{vehicle.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-lg font-semibold">
                    <DollarSign className="h-4 w-4" />
                    {plan.price}
                    <span className="text-sm text-muted-foreground font-normal">/mo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};