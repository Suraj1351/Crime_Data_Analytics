import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CrimeData } from '../../types';

interface CrimeByTypeChartProps {
  data: CrimeData[];
}

const CrimeByTypeChart: React.FC<CrimeByTypeChartProps> = ({ data }) => {
  const crimeTypeData = data.reduce((acc, crime) => {
    acc[crime.crimeType] = (acc[crime.crimeType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(crimeTypeData)
    .map(([type, count]) => ({ name: type, value: count }))
    .sort((a, b) => b.value - a.value);

  const COLORS = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-white">Crime Distribution by Type</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#374151', 
              border: '1px solid #4B5563',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CrimeByTypeChart;