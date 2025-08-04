import React from 'react';
import { useDrag } from 'react-dnd';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Hash, 
  Table, 
  Type,
  Plus
} from 'lucide-react';
import type { WidgetTemplate } from '../types/dashboard';

const widgetTemplates: WidgetTemplate[] = [
  {
    type: 'chart-line',
    title: 'Line Chart',
    icon: 'LineChart',
    defaultSize: { w: 6, h: 4 },
    description: 'Show trends over time'
  },
  {
    type: 'chart-bar',
    title: 'Bar Chart',
    icon: 'BarChart3',
    defaultSize: { w: 6, h: 4 },
    description: 'Compare categories'
  },
  {
    type: 'chart-pie',
    title: 'Pie Chart',
    icon: 'PieChart',
    defaultSize: { w: 4, h: 4 },
    description: 'Show proportions'
  },
  {
    type: 'chart-area',
    title: 'Area Chart',
    icon: 'TrendingUp',
    defaultSize: { w: 6, h: 4 },
    description: 'Filled line chart'
  },
  {
    type: 'metric',
    title: 'Metric',
    icon: 'Hash',
    defaultSize: { w: 3, h: 2 },
    description: 'Single number display'
  },
  {
    type: 'table',
    title: 'Data Table',
    icon: 'Table',
    defaultSize: { w: 8, h: 6 },
    description: 'Tabular data view'
  },
  {
    type: 'text',
    title: 'Text Widget',
    icon: 'Type',
    defaultSize: { w: 4, h: 2 },
    description: 'Custom text content'
  }
];

const iconMap = {
  LineChart,
  BarChart3,
  PieChart,
  TrendingUp,
  Hash,
  Table,
  Type
};

interface DraggableWidgetProps {
  template: WidgetTemplate;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({ template }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'widget',
    item: { template },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const IconComponent = iconMap[template.icon as keyof typeof iconMap];

  return (
    <div
      ref={drag as any}
      className={`p-4 bg-white rounded-lg border-2 border-gray-200 cursor-move hover:border-primary-500 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary-50 rounded-lg">
          <IconComponent className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{template.title}</h3>
          <p className="text-sm text-gray-500">{template.description}</p>
        </div>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Add Widgets</h2>
        <p className="text-sm text-gray-600">
          Drag and drop widgets to build your dashboard
        </p>
      </div>
      
      <div className="space-y-3">
        {widgetTemplates.map((template) => (
          <DraggableWidget key={template.type} template={template} />
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Plus className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">Pro Tip</span>
        </div>
        <p className="text-xs text-primary-600">
          Drag widgets onto the dashboard and resize them to fit your needs.
          Double-click to configure data sources and styling.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;