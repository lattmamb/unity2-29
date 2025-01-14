import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const FleetMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapContainer.current || mapInstance.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNxOXB2NWIwMzZqMmpxdDV5ZjBnY3ZtIn0.JMIOnYw3qP4ZgCd_Y_4Xbg';
    
    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-89.6501, 39.7817], // Springfield, IL coordinates
      zoom: 7
    });
  }, []);

  const cleanupMap = useCallback(() => {
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }
  }, []);

  useEffect(() => {
    initializeMap();
    return cleanupMap;
  }, [initializeMap, cleanupMap]);

  return (
    <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
  );
};