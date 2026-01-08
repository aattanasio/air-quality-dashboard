# Air Quality Dashboard

A real-time air quality monitoring dashboard that helps users make informed decisions about outdoor activities based on current pollution levels.

![Project Status](https://img.shields.io/badge/status-in%20development-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue)

## Problem Statement

People with respiratory conditions, allergies, or health-conscious individuals need accessible, real-time air quality information to plan their daily activities safely. This dashboard provides clear, actionable air quality data for any location worldwide.

## Features (Planned)

- Search any city worldwide
- Real-time Air Quality Index (AQI) display with color-coded indicators
- 5-day air quality forecast
- Save and track multiple locations
- Automatic geolocation detection
- Personalized health recommendations based on AQI levels
- Fully responsive design for mobile and desktop

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts (planned)
- **API:** OpenWeatherMap Air Pollution API
- **Deployment:** Vercel (planned)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenWeatherMap API key ([Get one free here](https://openweathermap.org/api))

### Installation

1. Clone the repository
```
git clone https://github.com/YOUR_USERNAME/air-quality-dashboard.git
cd air-quality-dashboard
```

2. Install dependencies
```
npm install
```

3. Create environment file
```
cp .env.example .env
```

5. Add your OpenWeatherMap API key to .env
```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

5. Start development server
```
npm run dev
Open http://localhost:5173 in your browser
```

### Project Structure
```
src/
├── components/      # React UI components
├── services/        # API integration layer
├── types/          # TypeScript type definitions
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
└── constants/      # Configuration values
```

# Author
GitHub: @aattanasio
Portfolio: asjaattanasio.it/projects
