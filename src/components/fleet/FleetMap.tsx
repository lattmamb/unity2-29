import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Tables } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";

interface FleetMapProps {
  vehicles: Tables<"vehicles">[];
  selectedVehicleId?: string | null;
  onVehicleSelect?: (id: string) => void;
}

interface Point {
  x: number;
  y: number;
}

export function FleetMap({ vehicles, selectedVehicleId, onVehicleSelect }: FleetMapProps & {
  selectedVehicleId?: string | null;
  onVehicleSelect?: (id: string) => void;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRwbXB5YmkwMXB4MmltbGVtN3J4ZHJ4In0.a9EvQY0dVsxU2YPqZRXXdg";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11", // Changed to dark theme
      center: [-122.4194, 37.7749],
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

  // Update markers when vehicles or selection changes
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
      
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
        <div class="${
          selectedVehicleId === vehicle.id 
            ? 'p-2 bg-secondary text-secondary-foreground' 
            : 'p-2 bg-background text-foreground'
        } rounded-full shadow-lg transform transition-transform hover:scale-110 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/>
            <path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
          </svg>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-4 bg-background rounded-lg shadow-lg border border-accent/20">
          <h3 class="font-semibold text-lg">${vehicle.name}</h3>
          <div class="mt-2 space-y-2">
            <div class="flex items-center text-sm">
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 12h-6m-6 0H5m0 0l3.5-3.5M5 12l3.5 3.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              ${vehicle.battery_level}% battery
            </div>
            <div class="flex items-center text-sm">
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              ${vehicle.range_miles} miles range
            </div>
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.x, location.y])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        onVehicleSelect?.(vehicle.id);
      });

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
  }, [vehicles, selectedVehicleId]);

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
