import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CrimeData } from '../types';

interface MapViewProps {
  data: CrimeData[];
}

const MapView: React.FC<MapViewProps> = ({ data }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Create custom icons for different crime severities
    const createIcon = (severity: string) => {
      const color = severity === 'high' ? '#ef4444' : 
                   severity === 'medium' ? '#f59e0b' : '#10b981';
      
      return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
    };

    // Add markers for crime data
    data.forEach((crime) => {
      if (crime.latitude && crime.longitude) {
        const marker = L.marker([crime.latitude, crime.longitude], {
          icon: createIcon(crime.severity)
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${crime.crimeType}</h3>
            <p class="text-xs text-gray-600">${crime.city}, ${crime.state}</p>
            <p class="text-xs text-gray-600">${crime.date.toLocaleDateString()}</p>
            <span class="inline-block px-2 py-1 text-xs rounded-full mt-1 ${
              crime.severity === 'high' ? 'bg-red-100 text-red-800' :
              crime.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
              'bg-green-100 text-green-800'
            }">
              ${crime.severity} severity
            </span>
          </div>
        `);
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [data]);

  const crimeByState = data.reduce((acc, crime) => {
    acc[crime.state] = (acc[crime.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topStates = Object.entries(crimeByState)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Crime Distribution Map</h2>
        <div 
          ref={mapRef} 
          className="h-96 w-full rounded-lg overflow-hidden"
          style={{ backgroundColor: '#374151' }}
        />
        
        <div className="flex items-center justify-center space-x-8 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">High Severity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-300">Medium Severity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Low Severity</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-white">Top States by Crime Count</h3>
        <div className="space-y-3">
          {topStates.map(([state, count], index) => (
            <div key={state} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-400 w-6">#{index + 1}</span>
                <span className="text-gray-300">{state}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-700 rounded-full h-2 w-24 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all duration-300"
                    style={{ 
                      width: `${(count / Math.max(...Object.values(crimeByState))) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="text-white font-medium w-12 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MapView;