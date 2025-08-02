import React from 'react';
import { motion } from 'framer-motion';
import CrimeByTypeChart from './charts/CrimeByTypeChart';
import CrimeTrendChart from './charts/CrimeTrendChart';
import StateDistributionChart from './charts/StateDistributionChart';
import SeverityChart from './charts/SeverityChart';
import { CrimeData } from '../types';

interface DashboardProps {
  data: CrimeData[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Key Statistics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Cases</h3>
          <p className="text-3xl font-bold text-blue-400">{data.length.toLocaleString()}</p>
          <p className="text-sm text-green-400 mt-1">↑ 12% from last month</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Resolved Cases</h3>
          <p className="text-3xl font-bold text-green-400">
            {data.filter(d => d.status === 'resolved').length.toLocaleString()}
          </p>
          <p className="text-sm text-green-400 mt-1">
            {((data.filter(d => d.status === 'resolved').length / data.length) * 100).toFixed(1)}% resolution rate
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">High Severity</h3>
          <p className="text-3xl font-bold text-red-400">
            {data.filter(d => d.severity === 'high').length.toLocaleString()}
          </p>
          <p className="text-sm text-red-400 mt-1">↑ 5% increase</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">States Affected</h3>
          <p className="text-3xl font-bold text-orange-400">
            {new Set(data.map(d => d.state)).size}
          </p>
          <p className="text-sm text-gray-400 mt-1">Across India</p>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <CrimeTrendChart data={data} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <CrimeByTypeChart data={data} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StateDistributionChart data={data} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <SeverityChart data={data} />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-white">Recent Crime Reports</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Date</th>
                <th className="text-left py-2 text-gray-400">Type</th>
                <th className="text-left py-2 text-gray-400">Location</th>
                <th className="text-left py-2 text-gray-400">Severity</th>
                <th className="text-left py-2 text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((crime, index) => (
                <tr key={crime.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="py-2 text-gray-300">
                    {crime.date.toLocaleDateString()}
                  </td>
                  <td className="py-2 text-gray-300">{crime.crimeType}</td>
                  <td className="py-2 text-gray-300">{crime.city}, {crime.state}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      crime.severity === 'high' ? 'bg-red-600 text-red-100' :
                      crime.severity === 'medium' ? 'bg-orange-600 text-orange-100' :
                      'bg-green-600 text-green-100'
                    }`}>
                      {crime.severity}
                    </span>
                  </td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      crime.status === 'resolved' ? 'bg-green-600 text-green-100' :
                      crime.status === 'pending' ? 'bg-orange-600 text-orange-100' :
                      'bg-gray-600 text-gray-100'
                    }`}>
                      {crime.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;