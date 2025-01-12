import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapContainerProps {
  onMapCreated: (map: mapboxgl.Map) => void;
  onCleanup: () => void;
}

export const MapContainer = ({ onMapCreated, onCleanup }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRwbXB5YmkwMXB4MmltbGVtN3J4ZHJ4In0.a9EvQY0dVsxU2YPqZRXXdg";

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-3.7038, 40.4168],
        zoom: 5.5,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      onMapCreated(map.current);

      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
        onCleanup();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [onMapCreated, onCleanup]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-lg border shadow-sm"
    />
  );
};