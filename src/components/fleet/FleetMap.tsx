import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Tables } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";
import { VehicleMarker } from "./VehicleMarker";
import { VehiclePopup } from "./VehiclePopup";
import ReactDOM from "react-dom";

interface FleetMapProps {
  vehicles: Tables<"vehicles">[];
  selectedVehicleId?: string | null;
  onVehicleSelect?: (id: string) => void;
}

interface Point {
  x: number;
  y: number;
}

export function FleetMap({ vehicles, selectedVehicleId, onVehicleSelect }: FleetMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = "pk.eyJ1IjoidW5pdHlmbGVldCIsImEiOiJjbTV0bjBuMnEweWV2MmxxNjY3NWk5OGhlIn0.fVzbEBvxSWr1yt7iU1Uj0w";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-122.4194, 37.7749],
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      markers.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

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

    validVehicles.forEach(vehicle => {
      const location = vehicle.current_location as unknown as Point;
      
      const markerElement = document.createElement('div');
      ReactDOM.render(
        <VehicleMarker 
          vehicle={vehicle} 
          isSelected={selectedVehicleId === vehicle.id} 
        />,
        markerElement
      );

      const popupElement = document.createElement('div');
      ReactDOM.render(
        <VehiclePopup vehicle={vehicle} />,
        popupElement
      );

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setDOMContent(popupElement);

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([location.x, location.y])
        .setPopup(popup)
        .addTo(map.current!);

      markerElement.addEventListener('click', () => {
        onVehicleSelect?.(vehicle.id);
      });

      markers.current.push(marker);
    });

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

function isValidCoordinate(lng: number, lat: number): boolean {
  return !isNaN(lng) && 
         !isNaN(lat) && 
         lng >= -180 && 
         lng <= 180 && 
         lat >= -90 && 
         lat <= 90;
}