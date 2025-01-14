import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriverStats } from './DriverStats';
import { VehicleTimeline } from './VehicleTimeline';
import { AlertCircle, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const FleetTracking = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(new Date());
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNxOXB2NWIwMzZqMmpxdDV5ZjBnY3ZtIn0.JMIOnYw3qP4ZgCd_Y_4Xbg';
    
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-0.1276, 51.5074], // London coordinates
      zoom: 12
    });

    setMap(mapInstance);

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <Card className="p-6 bg-accent/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Alex Williams</h2>
              <p className="text-muted-foreground">BedFord Group • Amey Rail</p>
              <p className="text-sm text-muted-foreground">HGV Class 1 • C+E</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">37,548 km</div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-muted-foreground">Driver score</span>
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">4.69</span>
                  </div>
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="2"
                      fill="transparent"
                      r="20"
                      cx="24"
                      cy="24"
                    />
                    <circle
                      className="text-eco stroke-current"
                      strokeWidth="2"
                      fill="transparent"
                      r="20"
                      cx="24"
                      cy="24"
                      strokeDasharray={`${(4.69 / 5) * 125.6} 125.6`}
                    />
                  </svg>
                </div>
              </div>
              <div className="text-eco text-sm">+0.28</div>
            </div>
          </div>
          
          <Badge variant="destructive" className="mb-4">
            <AlertCircle className="w-4 h-4 mr-1" />
            License not checked for 6 months
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
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <div className="flex items-center">
                      <Button variant="outline" size="icon">
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="mx-1">Today</Button>
                      <Button variant="outline" size="icon">
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