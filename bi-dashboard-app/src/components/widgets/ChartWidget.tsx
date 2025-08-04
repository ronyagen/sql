import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { Widget } from '../../types/dashboard';
import BaseWidget from './BaseWidget';
import {
  sampleLineData,
  sampleBarData,
  samplePieData,
  sampleAreaData,
} from '../../utils/sampleData';

interface ChartWidgetProps {
  widget: Widget;
  onDelete: (id: string) => void;
  onConfigure?: (id: string) => void;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ widget, onDelete, onConfigure }) => {
  const renderChart = () => {
    const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'];

    switch (widget.type) {
      case 'chart-line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke={colors[0]} 
                strokeWidth={2}
                dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke={colors[1]} 
                strokeWidth={2}
                dot={{ fill: colors[1], strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'chart-bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {sampleBarData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'chart-pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={samplePieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {samplePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'chart-area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleAreaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="users" 
                stackId="1" 
                stroke={colors[0]} 
                fill={colors[0]} 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="sessions" 
                stackId="1" 
                stroke={colors[1]} 
                fill={colors[1]} 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return <div className="flex items-center justify-center h-full text-gray-500">Unsupported chart type</div>;
    }
  };

  return (
    <BaseWidget widget={widget} onDelete={onDelete} onConfigure={onConfigure}>
      <div className="h-full min-h-0">
        {renderChart()}
      </div>
    </BaseWidget>
  );
};

export default ChartWidget;