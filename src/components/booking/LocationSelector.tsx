import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

type LocationSelectorProps = {
  location?: { lat: number; lng: number };
  onSelect: (location: { lat: number; lng: number }) => void;
};

export function LocationSelector({ location, onSelect }: LocationSelectorProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRwbXB5YmkwMXB4MmltbGVtN3J4ZHJ4In0.a9EvQY0dVsxU2YPqZRXXdg";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: location ? [location.lng, location.lat] : [-122.4194, 37.7749],
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    marker.current = new mapboxgl.Marker({
      draggable: true,
    });

    if (location) {
      marker.current
        .setLngLat([location.lng, location.lat])
        .addTo(map.current);
    }

    marker.current.on("dragend", () => {
      const lngLat = marker.current?.getLngLat();
      if (lngLat) {
        onSelect({ lat: lngLat.lat, lng: lngLat.lng });
      }
    });

    map.current.on("click", (e) => {
      marker.current?.setLngLat(e.lngLat).addTo(map.current!);
      onSelect({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchQuery
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      
      map.current?.flyTo({
        center: [lng, lat],
        zoom: 14,
      });
      
      marker.current?.setLngLat([lng, lat]).addTo(map.current!);
      onSelect({ lat, lng });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Select Pick-up Location</h2>
      
      <div className="flex gap-2">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a location..."
          className="flex-grow"
        />
        <Button onClick={handleSearch}>
          <MapPin className="mr-2" />
          Search
        </Button>
      </div>
      
      <div
        ref={mapContainer}
        className="w-full h-[400px] rounded-lg border shadow-sm"
      />
      
      {location && (
        <p className="text-sm text-muted-foreground">
          Selected location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
}