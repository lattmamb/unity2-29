import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Battery, Users, Zap } from 'lucide-react';

interface MapStats {
  availableVehicles: number;
  activeRides: number;
  chargingHubs: number;
}

export const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  const [stats, setStats] = React.useState<MapStats>({
    availableVehicles: 24,
    activeRides: 156,
    chargingHubs: 12
  });

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRwbXB5YmkwMXB4MmltbGVtN3J4ZHJ4In0.a9EvQY0dVsxU2YPqZRXXdg';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-122.4194, 37.7749],
      zoom: 12,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      })
    );

    // Add 3D building layer
    map.current.on('load', () => {
      map.current?.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 12,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-opacity': 0.6
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[80vh] bg-background rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 space-y-2">
        <Button variant="secondary" className="w-full bg-background/80 backdrop-blur-sm">
          <MapPin className="mr-2 h-4 w-4" />
          Show Cars Near Me
        </Button>
        <Button variant="secondary" className="w-full bg-background/80 backdrop-blur-sm">
          <Battery className="mr-2 h-4 w-4" />
          Highlight Charging Hubs
        </Button>
        <Button variant="secondary" className="w-full bg-background/80 backdrop-blur-sm">
          <Users className="mr-2 h-4 w-4" />
          Display Routes in Use
        </Button>
      </div>

      {/* Stats Panel */}
      <Card className="absolute top-4 right-4 p-4 space-y-4 bg-background/80 backdrop-blur-sm w-64">
        <h3 className="font-semibold text-lg">Live Stats</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Available Vehicles</span>
            <span className="font-medium">{stats.availableVehicles}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Active Rides</span>
            <span className="font-medium">{stats.activeRides}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Charging Hubs</span>
            <span className="font-medium">{stats.chargingHubs}</span>
          </div>
        </div>
      </Card>

      {/* Loading Overlay */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center space-y-4">
          <Zap className="h-8 w-8 mx-auto animate-pulse text-rental-blue" />
          <p className="text-sm text-muted-foreground">Loading map data...</p>
        </div>
      </div>
    </div>
  );
};