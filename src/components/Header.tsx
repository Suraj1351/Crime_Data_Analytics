import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Map, Shield, TrendingUp } from 'lucide-react';

interface HeaderProps {
  activeView: 'dashboard' | 'map';
  setActiveView: (view: 'dashboard' | 'map') => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 shadow-lg border-b border-gray-700"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">CrimeAnalytics</span>
          </div>

          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeView === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveView('map')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeView === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Map className="h-5 w-5" />
              <span>Map View</span>
            </button>

            <div className="flex items-center space-x-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Live Data</span>
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;