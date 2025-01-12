import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Car } from "lucide-react";

export const FleetMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});

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

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRwbXB5YmkwMXB4MmltbGVtN3J4ZHJ4In0.a9EvQY0dVsxU2YPqZRXXdg";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-122.4194, 37.7749], // Default to San Francisco
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !vehicles) return;

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    vehicles.forEach((vehicle) => {
      if (!vehicle.current_location) return;

      // Parse the point data from Supabase
      let coordinates;
      try {
        // Handle both string and object formats of point data
        if (typeof vehicle.current_location === 'string') {
          // Parse string format: (x,y)
          const match = vehicle.current_location.match(/\((.*?),(.*?)\)/);
          if (match) {
            coordinates = {
              lng: parseFloat(match[1]),
              lat: parseFloat(match[2])
            };
          }
        } else {
          // Handle object format
          const point = vehicle.current_location as any;
          coordinates = {
            lng: point.x || point.longitude,
            lat: point.y || point.latitude
          };
        }

        // Validate coordinates
        if (!coordinates || isNaN(coordinates.lng) || isNaN(coordinates.lat)) {
          console.warn(`Invalid coordinates for vehicle ${vehicle.id}`);
          return;
        }

      } catch (error) {
        console.error(`Error parsing coordinates for vehicle ${vehicle.id}:`, error);
        return;
      }

      const el = document.createElement("div");
      el.className = "w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-primary/90 transition-colors";
      el.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${vehicle.name}</h3>
          <p class="text-sm text-muted-foreground">Battery: ${vehicle.battery_level}%</p>
          <p class="text-sm text-muted-foreground">Status: ${vehicle.status}</p>
        </div>
      `);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([coordinates.lng, coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!);

      markers.current[vehicle.id] = marker;
    });

    // Fit bounds to show all markers
    if (Object.keys(markers.current).length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      Object.values(markers.current).forEach(marker => {
        bounds.extend(marker.getLngLat());
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [vehicles]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Fleet Location Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={mapContainer}
          className="w-full h-[400px] rounded-lg border shadow-sm"
        />
      </CardContent>
    </Card>
  );
};