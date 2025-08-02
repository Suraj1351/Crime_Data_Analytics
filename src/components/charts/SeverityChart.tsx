import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CrimeData } from '../../types';

interface SeverityChartProps {
  data: CrimeData[];
}

const SeverityChart: React.FC<SeverityChartProps> = ({ data }) => {
  const severityData = data.reduce((acc, crime) => {
    acc[crime.severity] = (acc[crime.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { severity: 'Low', count: severityData.low || 0, color: '#10B981' },
    { severity: 'Medium', count: severityData.medium || 0, color: '#F59E0B' },
    { severity: 'High', count: severityData.high || 0, color: '#EF4444' }
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-white">Crime Severity Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis 
            dataKey="severity" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#374151', 
              border: '1px solid #4B5563',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Bar 
            dataKey="count" 
            radius={[4, 4, 0, 0]}
            fill={(entry: any) => entry.color}
          >
            {chartData.map((entry, index) => (
              <Bar key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeverityChart;