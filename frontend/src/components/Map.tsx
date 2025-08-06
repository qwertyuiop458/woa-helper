import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Заглушка для trajectories, далі буде fetch
const trajectories: any[] = [];

const geoMap: Record<string, [number, number]> = {
  'Бєлгород': [50.6092, 36.585],
  'Харків': [49.9935, 36.2304],
  // ... додайте інші міста
};

function getCoordinates(city: string): [number, number] {
  return geoMap[city] || [0, 0];
}

const Map: React.FC<{ data?: any[] }> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const layerGroup = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([48.3794, 31.1656], 6);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap.current);
      layerGroup.current = L.layerGroup().addTo(leafletMap.current);
    }
    return () => {
      leafletMap.current?.remove();
      leafletMap.current = null;
    };
  }, []);

  useEffect(() => {
    if (!layerGroup.current) return;
    layerGroup.current.clearLayers();
    (data || trajectories).forEach(({ source, target }) => {
      const from = getCoordinates(source);
      const to = getCoordinates(target);
      if (from && to) {
        L.polyline([from, to], { color: 'red' }).addTo(layerGroup.current!);
      }
    });
  }, [data]);

  return <div ref={mapRef} style={{ height: '80vh', width: '100%' }} />;
};

export default Map;