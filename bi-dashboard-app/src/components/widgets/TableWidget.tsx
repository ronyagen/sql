import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { Widget } from '../../types/dashboard';
import BaseWidget from './BaseWidget';
import { sampleTableData } from '../../utils/sampleData';

interface TableWidgetProps {
  widget: Widget;
  onDelete: (id: string) => void;
  onConfigure?: (id: string) => void;
}

type SortDirection = 'asc' | 'desc' | null;
type SortKey = keyof typeof sampleTableData[0];

const TableWidget: React.FC<TableWidgetProps> = ({ widget, onDelete, onConfigure }) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortKey(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDirection) return sampleTableData;

    return [...sampleTableData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortDirection === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [sortKey, sortDirection]);

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  const formatCellValue = (key: SortKey, value: any) => {
    if (key === 'revenue') {
      return `$${value.toLocaleString()}`;
    }
    if (key === 'sales') {
      return value.toLocaleString();
    }
    if (key === 'growth') {
      const isPositive = value.startsWith('+');
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      );
    }
    return value;
  };

  const columns = [
    { key: 'product' as SortKey, label: 'Product' },
    { key: 'category' as SortKey, label: 'Category' },
    { key: 'sales' as SortKey, label: 'Sales' },
    { key: 'revenue' as SortKey, label: 'Revenue' },
    { key: 'growth' as SortKey, label: 'Growth' },
  ];

  return (
    <BaseWidget widget={widget} onDelete={onDelete} onConfigure={onConfigure}>
      <div className="h-full overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 py-2 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {renderSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-2 text-gray-900">
                    {formatCellValue(column.key, row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BaseWidget>
  );
};

export default TableWidget;