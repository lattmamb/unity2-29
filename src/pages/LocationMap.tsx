import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Location {
  name: string;
  address: string;
  isUnityCharger: boolean;
  coordinates: [number, number];
}

interface MapProps {
  locations: Location[];
}

const LocationMap = ({ locations }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoidW5pdHlmbGVldCIsImEiOiJjbTV0bjBuMnEweWV2MmxxNjY3NWk5OGhlIn0.fVzbEBvxSWr1yt7iU1Uj0w';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-122.4194, 37.7749], // San Francisco coordinates
      zoom: 11
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
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Add legend
    const legend = document.createElement('div');
    legend.className = 'absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg';
    legend.innerHTML = `
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
          <span class="text-sm">Unity Charger</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-gray-500 border-2 border-white"></div>
          <span class="text-sm">Other Charger</span>
        </div>
      </div>
    `;
    mapContainer.current.appendChild(legend);

    // Cleanup
    return () => {
      map.current?.remove();
      legend.remove();
    };
  }, [locations]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};

export default LocationMap;