import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Tables } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";

interface FleetMapProps {
  vehicles: Tables<"vehicles">[];
}

interface Point {
  x: number;
  y: number;
}

export function FleetMap({ vehicles }: FleetMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRwbXB5YmkwMXB4MmltbGVtN3J4ZHJ4In0.a9EvQY0dVsxU2YPqZRXXdg";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-122.4194, 37.7749], // Default to San Francisco
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => {
      markers.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when vehicles change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    const validVehicles = vehicles.filter(vehicle => {
      if (!vehicle.current_location) return false;
      const location = vehicle.current_location as unknown as Point;
      return (
        typeof location?.x === 'number' &&
        typeof location?.y === 'number' &&
        isValidCoordinate(location.x, location.y)
      );
    });

    // Add markers for valid vehicles
    validVehicles.forEach(vehicle => {
      const location = vehicle.current_location as unknown as Point;
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${vehicle.name}</h3>
          <p class="text-sm text-muted-foreground">${vehicle.battery_level}% battery</p>
        </div>
      `);

      const marker = new mapboxgl.Marker()
        .setLngLat([location.x, location.y])
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });

    // Fit bounds if there are valid vehicles
    if (validVehicles.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      validVehicles.forEach(vehicle => {
        const location = vehicle.current_location as unknown as Point;
        bounds.extend([location.x, location.y]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [vehicles]);

  return (
    <Card className="w-full overflow-hidden">
      <div ref={mapContainer} className="w-full h-[600px]" />
    </Card>
  );
}

// Helper function to validate coordinates
function isValidCoordinate(lng: number, lat: number): boolean {
  return !isNaN(lng) && 
         !isNaN(lat) && 
         lng >= -180 && 
         lng <= 180 && 
         lat >= -90 && 
         lat <= 90;
}