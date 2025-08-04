export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  data?: any;
  config?: WidgetConfig;
}

export type WidgetType = 
  | 'chart-line'
  | 'chart-bar'
  | 'chart-pie'
  | 'chart-area'
  | 'metric'
  | 'table'
  | 'text';

export interface WidgetConfig {
  chartType?: string;
  dataSource?: string;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  title?: string;
  description?: string;
}

export interface DashboardLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export interface DashboardState {
  widgets: Widget[];
  layout: DashboardLayout[];
}

export interface WidgetTemplate {
  type: WidgetType;
  title: string;
  icon: string;
  defaultSize: { w: number; h: number };
  description: string;
}