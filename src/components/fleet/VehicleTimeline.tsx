import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export const VehicleTimeline = () => {
  return (
    <Card className="p-4 bg-accent/10">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="/lovable-uploads/e7208ea9-864c-4d4c-a5b4-341b0a6cc04d.png"
          alt="Mercedes Arocs"
          className="w-12 h-12 rounded"
        />
        <div>
          <h3 className="font-semibold">FD63 VCW</h3>
          <p className="text-sm text-muted-foreground">Mercedes Arocs 400 - 2018 • White</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="h-8 w-full bg-accent/20 rounded">
            <div className="h-full w-1/3 bg-blue-500/50 rounded" />
          </div>
          <div className="absolute top-full mt-1 flex justify-between w-full text-xs text-muted-foreground">
            <span>06:00</span>
            <span>14:00</span>
            <span>22:00</span>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <TimelineItem
            time="19:30"
            title="Install C1907-484217"
          />
          <TimelineItem
            time="17:50"
            title="Install C1907-475865"
            status="Expected 25 min late"
            warning
          />
        </div>
      </div>
    </Card>
  );
};

const TimelineItem = ({ 
  time, 
  title, 
  status, 
  warning 
}: { 
  time: string; 
  title: string; 
  status?: string;
  warning?: boolean;
}) => (
  <div className="flex items-center gap-4 p-2 hover:bg-accent/5 rounded-lg transition-colors">
    <div className="w-16 text-sm text-muted-foreground">{time}</div>
    <div className="flex-1">
      <div className="font-medium">{title}</div>
      {status && (
        <Badge variant={warning ? "destructive" : "default"} className="mt-1">
          {warning && <AlertTriangle className="w-3 h-3 mr-1" />}
          {status}
        </Badge>
      )}
    </div>
  </div>
);