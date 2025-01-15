import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  name: string;
  address: string;
  isUnityCharger: boolean;
  status: string;
}

interface MapProps {
  locations: Location[];
}

const Map: React.FC<MapProps> = ({ locations }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-118.2437, 34.0522], // Los Angeles coordinates
      zoom: 10
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each location
    locations.forEach(location => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = location.isUnityCharger ? '#3b82f6' : '#6b7280';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      el.style.cursor = 'pointer';

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-bold">${location.name}</h3>
            <p class="text-sm text-gray-600">${location.address}</p>
            ${location.isUnityCharger ? '<span class="text-xs text-blue-500 font-medium">Unity Charger</span>' : ''}
          </div>
        `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([-118.2437, 34.0522]) // Replace with actual coordinates
        .setPopup(popup)
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [locations]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white" />
            <span className="text-sm">Unity Charger</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white" />
            <span className="text-sm">Other Charger</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;