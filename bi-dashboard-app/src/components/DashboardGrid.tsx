import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import type { Widget, WidgetTemplate, DashboardLayout } from '../types/dashboard';
import ChartWidget from './widgets/ChartWidget';
import MetricWidget from './widgets/MetricWidget';
import TableWidget from './widgets/TableWidget';
import TextWidget from './widgets/TextWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  widgets: Widget[];
  layouts: { [key: string]: DashboardLayout[] };
  onLayoutChange: (layout: Layout[], layouts: { [key: string]: Layout[] }) => void;
  onAddWidget: (template: WidgetTemplate, x: number, y: number) => void;
  onDeleteWidget: (id: string) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  widgets,
  layouts,
  onLayoutChange,
  onAddWidget,
  onDeleteWidget,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item: { template: WidgetTemplate }, monitor) => {
      if (!monitor.didDrop()) {
        // Calculate grid position based on drop coordinates
        const clientOffset = monitor.getClientOffset();
        if (clientOffset) {
          // Simple grid calculation - you might want to make this more sophisticated
          const gridX = Math.floor(Math.random() * 8); // Random X for demo
          const gridY = Math.floor(Math.random() * 8); // Random Y for demo
          onAddWidget(item.template, gridX, gridY);
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const renderWidget = useCallback((widget: Widget) => {
    const commonProps = {
      widget,
      onDelete: onDeleteWidget,
      onConfigure: (id: string) => {
        console.log('Configure widget:', id);
        // TODO: Implement widget configuration
      }
    };

    switch (widget.type) {
      case 'chart-line':
      case 'chart-bar':
      case 'chart-pie':
      case 'chart-area':
        return <ChartWidget key={widget.id} {...commonProps} />;
      case 'metric':
        return <MetricWidget key={widget.id} {...commonProps} />;
      case 'table':
        return <TableWidget key={widget.id} {...commonProps} />;
      case 'text':
        return <TextWidget key={widget.id} {...commonProps} />;
      default:
        return (
          <div key={widget.id} className="h-full bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Unknown widget type: {widget.type}</span>
          </div>
        );
    }
  }, [onDeleteWidget]);

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <div 
      ref={drop as any}
      className={`h-full p-6 transition-colors ${
        isOver ? 'bg-blue-50' : 'bg-gray-50'
      }`}
    >
      {widgets.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Dashboard</h3>
            <p className="text-gray-600 max-w-md">
              Drag widgets from the sidebar to create your custom dashboard. 
              You can resize and rearrange them as needed.
            </p>
          </div>
        </div>
      ) : (
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          onLayoutChange={onLayoutChange}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={60}
          width={1200}
          isDraggable={true}
          isResizable={true}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          useCSSTransforms={true}
        >
          {widgets.map(renderWidget)}
        </ResponsiveGridLayout>
      )}
      
      {isOver && widgets.length > 0 && (
        <div className="fixed inset-0 bg-blue-200 bg-opacity-20 pointer-events-none" />
      )}
    </div>
  );
};

export default DashboardGrid;