import { useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriverStats } from './DriverStats';
import { VehicleTimeline } from './VehicleTimeline';
import { FleetMap } from './FleetMap';
import { TrackingControls } from './TrackingControls';
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

export const FleetTracking = () => {
  const dateRef = useRef(new Date());

  const handleDateChange = (increment: boolean) => {
    const newDate = new Date(dateRef.current);
    newDate.setDate(dateRef.current.getDate() + (increment ? 1 : -1));
    dateRef.current = newDate;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <Card className="p-6 bg-accent/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Fleet Overview</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>3 Autonomous</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>2 Driver On Demand</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <span>2 Driver Assigned</span>
                </Badge>
              </div>
            </div>
          </div>
          
          <Badge variant="destructive" className="mb-4">
            <AlertCircle className="w-4 h-4 mr-1" />
            Low battery alert: Vehicle #UF-2014
          </Badge>

          <Tabs defaultValue="tracking">
            <TabsList className="w-full">
              <TabsTrigger value="tracking" className="flex-1">Tracking</TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="tracking">
              <div className="space-y-4 mt-4">
                <TrackingControls 
                  date={dateRef.current} 
                  onDateChange={handleDateChange}
                />
                <VehicleTimeline />
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <DriverStats />
            </TabsContent>
            <TabsContent value="details">
              <div className="p-4">
                <p className="text-muted-foreground">Vehicle and driver details will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      <div className="lg:col-span-2 h-[800px]">
        <FleetMap />
      </div>
    </div>
  );
};