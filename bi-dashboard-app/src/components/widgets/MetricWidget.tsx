import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Widget } from '../../types/dashboard';
import BaseWidget from './BaseWidget';
import { sampleMetrics } from '../../utils/sampleData';

interface MetricWidgetProps {
  widget: Widget;
  onDelete: (id: string) => void;
  onConfigure?: (id: string) => void;
}

const MetricWidget: React.FC<MetricWidgetProps> = ({ widget, onDelete, onConfigure }) => {
  // Get a random metric from sample data
  const metricKeys = Object.keys(sampleMetrics) as Array<keyof typeof sampleMetrics>;
  const randomKey = metricKeys[Math.floor(Math.random() * metricKeys.length)];
  const value = sampleMetrics[randomKey];
  
  // Format the value based on the metric type
  const formatValue = (key: string, val: number) => {
    switch (key) {
      case 'totalRevenue':
      case 'avgOrderValue':
        return `$${val.toLocaleString()}`;
      case 'conversionRate':
      case 'customerSatisfaction':
        return `${val.toFixed(1)}${key === 'conversionRate' ? '%' : '/5'}`;
      default:
        return val.toLocaleString();
    }
  };

  const getMetricLabel = (key: string) => {
    switch (key) {
      case 'totalRevenue':
        return 'Total Revenue';
      case 'totalSales':
        return 'Total Sales';
      case 'conversionRate':
        return 'Conversion Rate';
      case 'activeUsers':
        return 'Active Users';
      case 'avgOrderValue':
        return 'Avg Order Value';
      case 'customerSatisfaction':
        return 'Customer Satisfaction';
      default:
        return key;
    }
  };

  // Generate a random trend for demo purposes
  const trends = [
    { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50', value: '+12.5%' },
    { icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50', value: '-5.2%' },
    { icon: Minus, color: 'text-gray-500', bg: 'bg-gray-50', value: '0.0%' },
  ];
  const trend = trends[Math.floor(Math.random() * trends.length)];
  const TrendIcon = trend.icon;

  return (
    <BaseWidget widget={widget} onDelete={onDelete} onConfigure={onConfigure}>
      <div className="h-full flex flex-col justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {formatValue(randomKey, value)}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            {getMetricLabel(randomKey)}
          </div>
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${trend.bg}`}>
            <TrendIcon className={`w-4 h-4 ${trend.color}`} />
            <span className={`text-sm font-medium ${trend.color}`}>
              {trend.value}
            </span>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
};

export default MetricWidget;