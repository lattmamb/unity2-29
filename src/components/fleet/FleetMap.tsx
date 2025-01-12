import { useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { MapContainer } from "./MapContainer";
import { MapMarker } from "./MapMarker";

export const FleetMap = () => {
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  const { data: vehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*");
      if (error) throw error;
      return data as Tables<"vehicles">[];
    },
  });

  const handleMapCreated = useCallback((mapInstance: mapboxgl.Map) => {
    map.current = mapInstance;
  }, []);

  const handleMarkerCreated = useCallback((id: string, marker: mapboxgl.Marker) => {
    markersRef.current[id] = marker;

    if (Object.keys(markersRef.current).length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      Object.values(markersRef.current).forEach(m => {
        bounds.extend(m.getLngLat());
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, []);

  const handleCleanup = useCallback(() => {
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};
  }, []);

  return (
    <div className="w-full h-full">
      <MapContainer 
        onMapCreated={handleMapCreated}
        onCleanup={handleCleanup}
      />
      {map.current && vehicles?.map(vehicle => (
        <MapMarker
          key={vehicle.id}
          vehicle={vehicle}
          map={map.current!}
          onMarkerCreated={handleMarkerCreated}
        />
      ))}
    </div>
  );
};