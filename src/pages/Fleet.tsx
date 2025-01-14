import { Navigation } from "@/components/Navigation";
import { FleetDashboard } from "@/components/fleet/FleetDashboard";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Wallet, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Fleet() {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Fleet data refreshed",
      description: "Latest vehicle information has been loaded.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Fleet Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your electric vehicle fleet
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Wallet className="h-4 w-4" />
              Add Balance
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Vehicle
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              Report
            </Button>
          </div>
        </div>

        <FleetDashboard />
      </div>
    </div>
  );
}