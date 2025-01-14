import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriverStats } from './DriverStats';
import { VehicleTimeline } from './VehicleTimeline';
import { AlertCircle, Download, ChevronLeft, ChevronRight, Car, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/components/ui/use-toast";

export const FleetTracking = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(new Date());
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNxOXB2NWIwMzZqMmpxdDV5ZjBnY3ZtIn0.JMIOnYw3qP4ZgCd_Y_4Xbg';
    
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-89.6501, 39.7817], // Springfield, IL coordinates
      zoom: 7
    });

    setMap(mapInstance);

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "The fleet tracking report has been downloaded successfully.",
    });
  };

  const handleDateChange = (increment: boolean) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + (increment ? 1 : -1));
    setDate(newDate);
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
                  <Car className="w-4 h-4" />
                  <span>3 Autonomous</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>2 Driver On Demand</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last updated 09:05</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <div className="flex items-center">
                      <Button variant="outline" size="icon" onClick={() => handleDateChange(false)}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="mx-1">
                        {date.toLocaleDateString()}
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDateChange(true)}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
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
        <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      </div>
    </div>
  );
};