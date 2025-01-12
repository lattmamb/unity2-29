import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Zap, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FleetDashboard = () => {
  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'available');
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="h-5 w-5" />
            Battery Status
          </CardTitle>
          <CardDescription>Current vehicle battery levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vehicles?.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between">
                <span>{vehicle.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${vehicle.battery_level}%` }}
                    />
                  </div>
                  <span className="text-sm">{vehicle.battery_level}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Charging Stations
          </CardTitle>
          <CardDescription>Nearby charging locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">Downtown Hub</p>
                <p className="text-sm text-muted-foreground">0.5 miles away</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">Shopping Center</p>
                <p className="text-sm text-muted-foreground">1.2 miles away</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common fleet management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10">
              Schedule Maintenance
            </button>
            <button className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10">
              Request Support
            </button>
            <button className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10">
              View Reports
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};