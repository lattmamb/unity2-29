import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FleetMap } from "./FleetMap";

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
    <div className="h-[calc(100vh-8rem)]">
      <FleetMap />
    </div>
  );
};