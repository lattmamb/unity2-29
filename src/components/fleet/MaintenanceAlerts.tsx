import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const MaintenanceAlerts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="font-medium">Tire Rotation Due</p>
              <p className="text-sm text-muted-foreground">
                Schedule service within next 500 miles
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium">Battery Check Complete</p>
              <p className="text-sm text-muted-foreground">
                Next check scheduled in 3 months
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};