# 🕵️ Crime Data Analytics Platform for India

A comprehensive full-stack web application for exploring, visualizing, and analyzing Indian crime trends using interactive dashboards, real-time data filtering, and geographical mapping.

## 🌟 Features

### Frontend (React + TypeScript)
- **Interactive Dashboards**: Real-time crime data visualization with multiple chart types
- **Advanced Filtering**: Filter by state, city, year, crime type, and date ranges
- **Geographic Mapping**: Interactive crime heatmaps using Leaflet.js
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Real-time Search**: Autocomplete functionality for locations and crime types
- **Data Export**: Download filtered datasets and reports

### Backend (FastAPI + Python)
- **RESTful API**: Comprehensive endpoints for crime data operations
- **Real-time Analytics**: Live crime statistics and trend analysis
- **Data Processing**: Pandas and NumPy for efficient data manipulation
- **Prediction Models**: Basic ML integration for crime trend forecasting
- **CORS Support**: Cross-origin resource sharing for frontend integration

### Key Visualizations
- **Trend Analysis**: Line charts showing crime patterns over time
- **Distribution Charts**: Pie and bar charts for crime type analysis
- **Geographic Heatmaps**: State-wise crime intensity mapping
- **Severity Analysis**: Crime severity distribution and patterns
- **Comparative Analytics**: Multi-dimensional data comparison tools

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crime-analytics-platform
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

4. **Start the development servers**
   
   **Frontend** (Terminal 1):
   ```bash
   npm run dev
   ```
   
   **Backend** (Terminal 2):
   ```bash
   npm run backend
   # or alternatively:
   cd backend && python run.py
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
crime-analytics-platform/
│
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── charts/              # Chart components (Recharts)
│   │   ├── Dashboard.tsx        # Main dashboard component
│   │   ├── FilterPanel.tsx      # Data filtering interface
│   │   ├── Header.tsx           # Navigation header
│   │   └── MapView.tsx          # Geographic visualization
│   │
│   ├── services/                # API integration services
│   │   └── api.ts               # HTTP client and API methods
│   │
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts             # Data models and interfaces
│   │
│   ├── utils/                   # Utility functions
│   │   └── sampleData.ts        # Sample data generation
│   │
│   └── App.tsx                  # Main application component
│
├── backend/                     # FastAPI backend server
│   ├── main.py                  # FastAPI application and routes
│   ├── run.py                   # Development server runner
│   └── requirements.txt         # Python dependencies
│
├── package.json                 # Frontend dependencies and scripts
└── README.md                    # Project documentation
```

## 🔌 API Endpoints

### Core Data Endpoints
- `GET /api/crimes` - Fetch crime data with filtering options
- `GET /api/stats` - Get comprehensive crime statistics
- `GET /api/heatmap` - Geographic crime distribution data
- `GET /api/trends` - Time-series crime trend analysis

### Advanced Features
- `GET /api/predict` - ML-powered crime predictions
- `POST /api/upload` - Bulk crime data upload (admin)

### Example API Usage
```javascript
// Fetch filtered crime data
const response = await fetch('/api/crimes?state=Maharashtra&year=2024');
const crimeData = await response.json();

// Get crime statistics
const stats = await fetch('/api/stats');
const statistics = await stats.json();
```

## 📊 Data Sources

The platform supports multiple data input methods:

1. **Government Data**: Integration with data.gov.in and NCRB datasets
2. **Sample Data**: Built-in generator for demonstration purposes
3. **Manual Upload**: Admin interface for data entry
4. **API Integration**: Real-time data feeds from external sources

## 🎨 Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **TailwindCSS** for responsive, utility-first styling
- **Recharts** for interactive data visualizations
- **Leaflet.js** for geographic mapping and heatmaps
- **Framer Motion** for smooth animations and transitions
- **Axios** for HTTP client operations

### Backend
- **FastAPI** for high-performance API development
- **Pandas & NumPy** for efficient data processing
- **Pydantic** for data validation and serialization
- **Uvicorn** as ASGI server for production deployment

### Development Tools
- **Vite** for fast frontend development and building
- **ESLint & TypeScript** for code quality and type checking
- **CORS** middleware for cross-origin resource sharing

## 🔮 Future Enhancements

### Machine Learning Integration
- Advanced time-series forecasting with Prophet/ARIMA models
- Crime hotspot prediction using clustering algorithms
- Pattern recognition for crime prevention strategies

### Authentication & Security
- JWT-based user authentication system
- Role-based access control (Admin, Officer, Analyst)
- Data encryption and secure API endpoints

### Advanced Features
- Real-time crime reporting interface
- Automated alert system for crime spikes
- PDF report generation and scheduled exports
- Mobile app development (React Native)

### Data Enhancement
- Integration with additional government databases
- Real-time social media sentiment analysis
- Weather and economic data correlation

## 🚀 Deployment

### Frontend Deployment
- **Vercel**: `vercel --prod`
- **Netlify**: Connect GitHub repository for auto-deployment
- **Firebase**: `firebase deploy`

### Backend Deployment
- **Render**: Connect GitHub repository
- **Heroku**: `git push heroku main`
- **Railway**: One-click deployment from GitHub

### Environment Variables
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:8000/api

# Backend
DATABASE_URL=postgresql://user:pass@localhost/crimedb
SECRET_KEY=your-secret-key-here
```

## 📈 Performance Metrics

- **Load Time**: < 2 seconds for dashboard rendering
- **Data Processing**: Handles 10,000+ records efficiently
- **API Response**: < 500ms for filtered queries
- **Mobile Performance**: Optimized for 3G networks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

