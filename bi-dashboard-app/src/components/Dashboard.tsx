import React, { useState, useCallback } from 'react';
import type { Layout } from 'react-grid-layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Download, Upload, Settings } from 'lucide-react';
import type { Widget, WidgetTemplate, DashboardLayout } from '../types/dashboard';
import Sidebar from './Sidebar';
import DashboardGrid from './DashboardGrid';

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [layouts, setLayouts] = useState<{ [key: string]: DashboardLayout[] }>({});
  const [dashboardTitle, setDashboardTitle] = useState('My Dashboard');

  const generateId = () => {
    return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAddWidget = useCallback((template: WidgetTemplate, x: number, y: number) => {
    const id = generateId();
    const newWidget: Widget = {
      id,
      type: template.type,
      title: template.title,
      x,
      y,
      w: template.defaultSize.w,
      h: template.defaultSize.h,
    };

    setWidgets(prev => [...prev, newWidget]);

    // Update layouts for all breakpoints
    const newLayoutItem: DashboardLayout = {
      i: id,
      x,
      y,
      w: template.defaultSize.w,
      h: template.defaultSize.h,
      minW: 2,
      minH: 2,
    };

    setLayouts(prev => ({
      ...prev,
      lg: [...(prev.lg || []), newLayoutItem],
      md: [...(prev.md || []), { ...newLayoutItem, w: Math.min(newLayoutItem.w, 8) }],
      sm: [...(prev.sm || []), { ...newLayoutItem, w: Math.min(newLayoutItem.w, 6) }],
      xs: [...(prev.xs || []), { ...newLayoutItem, w: Math.min(newLayoutItem.w, 4) }],
      xxs: [...(prev.xxs || []), { ...newLayoutItem, w: Math.min(newLayoutItem.w, 2) }],
    }));
  }, []);

  const handleDeleteWidget = useCallback((id: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== id));
    setLayouts(prev => {
      const newLayouts: { [key: string]: DashboardLayout[] } = {};
      Object.keys(prev).forEach(breakpoint => {
        newLayouts[breakpoint] = prev[breakpoint].filter(item => item.i !== id);
      });
      return newLayouts;
    });
  }, []);

  const handleLayoutChange = useCallback((layout: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    // Update widget positions based on layout changes
    setWidgets(prev => {
      const layoutMap = new Map(layout.map(item => [item.i, item]));
      return prev.map(widget => {
        const layoutItem = layoutMap.get(widget.id);
        if (layoutItem) {
          return {
            ...widget,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
        return widget;
      });
    });

    setLayouts(allLayouts as { [key: string]: DashboardLayout[] });
  }, []);

  const handleSaveDashboard = () => {
    const dashboardData = {
      title: dashboardTitle,
      widgets,
      layouts,
      timestamp: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(dashboardData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handleLoadDashboard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const dashboardData = JSON.parse(e.target?.result as string);
          setDashboardTitle(dashboardData.title || 'Loaded Dashboard');
          setWidgets(dashboardData.widgets || []);
          setLayouts(dashboardData.layouts || {});
        } catch (error) {
          console.error('Error loading dashboard:', error);
          alert('Error loading dashboard file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">BI Dashboard Builder</h1>
              <div className="text-gray-300">|</div>
              <input
                type="text"
                value={dashboardTitle}
                onChange={(e) => setDashboardTitle(e.target.value)}
                className="text-lg font-medium text-gray-700 bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded"
                placeholder="Dashboard title"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDashboard}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleLoadDashboard}
                  className="hidden"
                />
              </label>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-hidden">
            <DashboardGrid
              widgets={widgets}
              layouts={layouts}
              onLayoutChange={handleLayoutChange}
              onAddWidget={handleAddWidget}
              onDeleteWidget={handleDeleteWidget}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;