import React from 'react';
import { X, Settings } from 'lucide-react';
import type { Widget } from '../../types/dashboard';

interface BaseWidgetProps {
  widget: Widget;
  onDelete: (id: string) => void;
  onConfigure?: (id: string) => void;
  children: React.ReactNode;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ 
  widget, 
  onDelete, 
  onConfigure, 
  children 
}) => {
  return (
    <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-900 truncate">{widget.title}</h3>
        <div className="flex items-center gap-1">
          {onConfigure && (
            <button
              onClick={() => onConfigure(widget.id)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Configure widget"
            >
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <button
            onClick={() => onDelete(widget.id)}
            className="p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete widget"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Widget Content */}
      <div className="flex-1 p-4 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default BaseWidget;