import React, { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// Set the access token for mapbox using environment variable
const accessToken = import.meta.env.VITE_MAP_ACCESS_TOKEN;
mapboxgl.accessToken = accessToken;

interface MapProps {
  latitude: number;
  longitude: number;
  onCloseMap: () => void;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, onCloseMap }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [longitude, latitude],
        zoom: 12,
      });

      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);

      return () => map.remove();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        onCloseMap(); 
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onCloseMap]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
