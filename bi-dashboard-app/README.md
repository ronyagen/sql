# BI Dashboard Builder

A modern, interactive Business Intelligence dashboard builder built with React, TypeScript, and drag-and-drop functionality.

![BI Dashboard Builder](https://img.shields.io/badge/React-18.x-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-blue)

## ✨ Features

### 🎯 Core Functionality
- **Drag & Drop Interface**: Intuitive widget placement with visual feedback
- **Responsive Grid Layout**: Automatically adapts to different screen sizes
- **Real-time Resizing**: Resize widgets by dragging from corners
- **Widget Library**: Pre-built visualization components ready to use

### 📊 Visualization Types
- **Line Charts**: Display trends over time with multiple data series
- **Bar Charts**: Compare categories with colorful bar representations
- **Pie Charts**: Show proportions and percentages with labeled segments
- **Area Charts**: Stacked area visualizations for cumulative data
- **Metrics**: Single-value KPI displays with trend indicators
- **Data Tables**: Sortable tabular data with formatted values
- **Text Widgets**: Custom markdown-style text content

### 🛠 Dashboard Management
- **Export/Import**: Save and load dashboard configurations as JSON
- **Custom Titles**: Editable dashboard and widget titles
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with ES6+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bi-dashboard-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the dashboard builder

## 🎮 How to Use

### Building Your Dashboard
1. **Add Widgets**: Drag widget types from the left sidebar onto the dashboard
2. **Position Widgets**: Drag widgets around to arrange them as desired
3. **Resize Widgets**: Drag from the bottom-right corner to resize
4. **Delete Widgets**: Click the X button in the widget header
5. **Save Dashboard**: Use the Export button to download your configuration

### Widget Types Guide

#### 📈 Charts
- **Line Chart**: Perfect for time-series data and trends
- **Bar Chart**: Great for comparing categories or groups
- **Pie Chart**: Ideal for showing proportions and percentages
- **Area Chart**: Useful for stacked or cumulative data

#### 📊 Data Display
- **Metrics**: Single KPI values with trend indicators
- **Data Table**: Structured data with sorting capabilities
- **Text Widget**: Custom content with basic markdown formatting

### Dashboard Management
- **Export**: Save your dashboard as a JSON file
- **Import**: Load a previously saved dashboard configuration
- **Responsive**: Dashboard automatically adapts to different screen sizes

## 🏗 Project Structure

```
src/
├── components/
│   ├── widgets/
│   │   ├── BaseWidget.tsx      # Common widget wrapper
│   │   ├── ChartWidget.tsx     # Chart visualizations
│   │   ├── MetricWidget.tsx    # KPI metrics display
│   │   ├── TableWidget.tsx     # Data table component
│   │   └── TextWidget.tsx      # Text content widget
│   ├── Dashboard.tsx           # Main dashboard orchestrator
│   ├── DashboardGrid.tsx       # Grid layout with drag/drop
│   └── Sidebar.tsx             # Widget selection sidebar
├── types/
│   └── dashboard.ts            # TypeScript type definitions
├── utils/
│   └── sampleData.ts           # Demo data for visualizations
└── App.tsx                     # Application entry point
```

## 🛠 Technology Stack

### Frontend Framework
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development with excellent IDE support
- **Vite**: Fast build tool and development server

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, customizable SVG icons
- **Inter Font**: Modern, readable typeface for professional appearance

### Dashboard Functionality
- **react-grid-layout**: Responsive, draggable grid system
- **react-dnd**: Drag and drop functionality with HTML5 backend
- **Recharts**: Composable charting library built on D3

### Development Tools
- **ESLint**: Code linting for consistent code quality
- **PostCSS**: CSS processing with Autoprefixer
- **TypeScript**: Static type checking

## 🎨 Customization

### Adding New Widget Types
1. Create a new widget component in `src/components/widgets/`
2. Add the widget type to `src/types/dashboard.ts`
3. Update the widget templates in `src/components/Sidebar.tsx`
4. Add rendering logic in `src/components/DashboardGrid.tsx`

### Styling Customization
The application uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in individual component files
- Global styles in `src/index.css`

### Data Integration
Replace sample data in `src/utils/sampleData.ts` with:
- API calls to your data sources
- Database connections
- Real-time data streams
- Custom data processing logic

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Roadmap

### Upcoming Features
- [ ] Widget configuration modal with advanced options
- [ ] Custom data source connections (API, CSV, databases)
- [ ] Dashboard templates and themes
- [ ] Real-time data updates and WebSocket support
- [ ] Advanced chart types (scatter plots, heatmaps, gauges)
- [ ] User authentication and dashboard sharing
- [ ] Export to PDF/PNG formats
- [ ] Collaborative editing features

## 🐛 Known Issues

- Widget positioning may need adjustment after screen size changes
- Large datasets in tables may affect performance
- Some mobile interactions might need refinement

## 💬 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check the documentation
- Review existing issues and discussions

---

Built with ❤️ using React, TypeScript, and modern web technologies.
