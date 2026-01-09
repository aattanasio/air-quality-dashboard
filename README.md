# Air Quality Dashboard

A modern, responsive web application for monitoring real-time air quality and weather conditions worldwide. Built with React and TypeScript, the dashboard provides comprehensive environmental data with interactive visualizations and health recommendations.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://air-quality-dashboard-git-main-asja-attanasios-projects.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## 🚀 Live Demo

Check out the live application: [Air Quality Dashboard](https://air-quality-dashboard-git-main-asja-attanasios-projects.vercel.app/)

## ✨ Features

### Air Quality Monitoring
- **Real-time AQI Data**: Current Air Quality Index with color-coded status indicators
- **Health Recommendations**: Personalized suggestions based on current air quality levels
- **Pollutant Breakdown** with detailed measurements for:
  - PM2.5 (Fine Particulate Matter)
  - PM10 (Coarse Particulate Matter)
  - CO (Carbon Monoxide)
  - NO₂ (Nitrogen Dioxide)
  - O₃ (Ozone)
  - SO₂ (Sulfur Dioxide)

### Weather Information
- **Current Conditions**: Temperature, humidity, wind speed, and weather descriptions
- **5-Day Forecast**: Extended weather predictions with daily highs and lows
- **Weather Icons**: Animated visual representations of weather conditions

### User Experience
- **Interactive Search**: Search for any city worldwide with autocomplete suggestions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Animated Visualizations**: Smooth transitions and gradient charts using Recharts
- **Tab Navigation**: Easy switching between air quality and forecast views

## 🛠️ Technologies

- **Frontend Framework**: React 18.3
- **Language**: TypeScript 5.0
- **Build Tool**: Vite
- **Data Visualization**: Recharts
- **API**: OpenWeather API (Air Pollution API & Weather API)
- **Styling**: CSS3 with custom animations
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

## 🔧 Installation

1. **Clone the repository**
    ```
    git clone https://github.com/aattanasio/air-quality-dashboard.git
    cd air-quality-dashboard
    ```
2. **Install dependencies**
    ```
    npm install
    ```
3. **Set up environment variables**
    Create a .env file in the root directory:
    ```
    VITE_OPENWEATHER_API_KEY=your_api_key_here
    ```
    Get your free API key from [OpenWeather](https://openweathermap.org/api).

4. **Start the development server**
    ```
    npm run dev
    ```
    The application will be available at [http://localhost:5173](http://localhost:5173).

## 🚢 Deployment
### Vercel (Recommended)
1. **Push your code to GitHub**
    ```
    git add .
    git commit -m "Initial commit"
    git push origin main
    ```
2. **Deploy to Vercel**
- Go to **Vercel Dashboard**
- Click "Add New Project"
- Import your GitHub repository
- Add environment variable: `VITE_OPENWEATHER_API_KEY`
- Click "Deploy"

### Environment Variables
For production deployment, add the following environment variable in your hosting platform:
```
| Variable                 | Description              |
| ------------------------ | ------------------------ |
| VITE_OPENWEATHER_API_KEY | Your OpenWeather API key |
```

## 📁 Project Structure
```
air-quality-dashboard/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── services/        # API integration
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Main application component
│   ├── App.css          # Global styles
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables (not committed)
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔑 API Usage
This application uses the OpenWeather API with two endpoints:

### Air Pollution API
```
GET https://api.openweathermap.org/data/2.5/air_pollution
```
Returns current air quality data including AQI and pollutant concentrations.

### Weather API
```
GET https://api.openweathermap.org/data/2.5/weather
GET https://api.openweathermap.org/data/2.5/forecast
```
Returns current weather conditions and 5-day forecast.

## 🎨 Features Showcase
### Air Quality Index (AQI) Scale
- Good (1): Green - Air quality is satisfactory
- Fair (2): Yellow - Acceptable for most people
- Moderate (3): Orange - Sensitive groups may experience effects
- Poor (4): Red - Health effects possible for everyone
- Very Poor (5): Purple - Health alert, everyone may be affected

### Pollutant Visualizations
- Gradient-filled area charts for pollutant concentrations
- Color-coded bars indicating safe/warning/danger levels
- Smooth animations and transitions
- Responsive layout adapting to screen size

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments
- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Icons from [Lucide React](https://lucide.dev/)
- Chart library by [Recharts](https://recharts.github.io/)
- Deployed on [Vercel](https://vercel.com/)

# Author
GitHub: [aattanasio](https://github.com/aattanasio)

Portfolio: [asjaattanasio.it/projects](https://asjaattanasio.it/projects)
