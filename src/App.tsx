import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FilterPanel from './components/FilterPanel';
import MapView from './components/MapView';
import { CrimeData, FilterState } from './types';
import { fetchCrimeData } from './services/api';
import { generateSampleData } from './utils/sampleData';

function App() {
  const [crimeData, setCrimeData] = useState<CrimeData[]>([]);
  const [filteredData, setFilteredData] = useState<CrimeData[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    state: '',
    city: '',
    year: '',
    crimeType: '',
    dateRange: { start: '', end: '' }
  });
  const [activeView, setActiveView] = useState<'dashboard' | 'map'>('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, crimeData]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      // For demo purposes, using sample data
      // In production, replace with: const data = await fetchCrimeData();
      const data = generateSampleData();
      setCrimeData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error loading crime data:', error);
      // Fallback to sample data
      const data = generateSampleData();
      setCrimeData(data);
      setFilteredData(data);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = crimeData;

    if (filters.state) {
      filtered = filtered.filter(item => 
        item.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    if (filters.city) {
      filtered = filtered.filter(item => 
        item.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.year) {
      filtered = filtered.filter(item => 
        item.date.getFullYear().toString() === filters.year
      );
    }

    if (filters.crimeType) {
      filtered = filtered.filter(item => 
        item.crimeType.toLowerCase().includes(filters.crimeType.toLowerCase())
      );
    }

    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter(item => 
        item.date >= startDate && item.date <= endDate
      );
    }

    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4 text-lg">Loading Crime Analytics Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Crime Data Analytics Platform
          </h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Explore, analyze, and visualize crime trends across India with interactive dashboards and real-time insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <FilterPanel 
              filters={filters} 
              onFiltersChange={setFilters}
              crimeData={crimeData}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {activeView === 'dashboard' ? (
              <Dashboard data={filteredData} />
            ) : (
              <MapView data={filteredData} />
            )}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Total Records</h3>
              <p className="text-3xl font-bold">{filteredData.length.toLocaleString()}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-400">States Covered</h3>
              <p className="text-3xl font-bold">
                {new Set(filteredData.map(d => d.state)).size}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Crime Types</h3>
              <p className="text-3xl font-bold">
                {new Set(filteredData.map(d => d.crimeType)).size}
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;