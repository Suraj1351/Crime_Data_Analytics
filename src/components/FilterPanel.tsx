import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { FilterState, CrimeData } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  crimeData: CrimeData[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, crimeData }) => {
  const states = [...new Set(crimeData.map(d => d.state))].sort();
  const cities = [...new Set(crimeData.map(d => d.city))].sort();
  const crimeTypes = [...new Set(crimeData.map(d => d.crimeType))].sort();
  const years = [...new Set(crimeData.map(d => d.date.getFullYear().toString()))].sort().reverse();

  const handleFilterChange = (key: keyof FilterState, value: string | { start: string; end: string }) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      state: '',
      city: '',
      year: '',
      crimeType: '',
      dateRange: { start: '', end: '' }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* State Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <MapPin className="h-4 w-4" />
            <span>State</span>
          </label>
          <select
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <MapPin className="h-4 w-4" />
            <span>City</span>
          </label>
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <Calendar className="h-4 w-4" />
            <span>Year</span>
          </label>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Crime Type Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Crime Type</span>
          </label>
          <select
            value={filters.crimeType}
            onChange={(e) => handleFilterChange('crimeType', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Crime Types</option>
            {crimeTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleFilterChange('dateRange', { 
                ...filters.dateRange, 
                start: e.target.value 
              })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleFilterChange('dateRange', { 
                ...filters.dateRange, 
                end: e.target.value 
              })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Search */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <Search className="h-4 w-4" />
            <span>Quick Search</span>
          </label>
          <input
            type="text"
            placeholder="Search locations, crime types..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filter Summary */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Active Filters</h3>
        <div className="flex flex-wrap gap-2">
          {filters.state && (
            <span className="px-2 py-1 bg-blue-600 text-xs rounded-full">
              State: {filters.state}
            </span>
          )}
          {filters.city && (
            <span className="px-2 py-1 bg-green-600 text-xs rounded-full">
              City: {filters.city}
            </span>
          )}
          {filters.year && (
            <span className="px-2 py-1 bg-orange-600 text-xs rounded-full">
              Year: {filters.year}
            </span>
          )}
          {filters.crimeType && (
            <span className="px-2 py-1 bg-purple-600 text-xs rounded-full">
              Type: {filters.crimeType}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;