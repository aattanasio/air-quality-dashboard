import { Cloud, Droplets, Wind as WindIcon, Gauge, Thermometer, Sun, CloudRain, CloudSnow, CloudDrizzle, CloudFog } from 'lucide-react';
import type { WeatherData } from '../types/airQuality';

interface WeatherCardProps {
    weather: WeatherData;
}

const getWeatherIcon = (weatherMain: string) => {
    const iconStyle = { color: '#FFFFFF', strokeWidth: 2 };
    const iconSize = "w-16 h-16";

    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return <Sun className={iconSize} style={iconStyle} />;
        case 'clouds':
            return <Cloud className={iconSize} style={iconStyle} />;
        case 'rain':
            return <CloudRain className={iconSize} style={iconStyle} />;
        case 'drizzle':
            return <CloudDrizzle className={iconSize} style={iconStyle} />;
        case 'snow':
            return <CloudSnow className={iconSize} style={iconStyle} />;
        case 'mist':
        case 'fog':
        case 'haze':
            return <CloudFog className={iconSize} style={iconStyle} />;
        case 'thunderstorm':
            return <CloudRain className={iconSize} style={iconStyle} />;
        default:
            return <Cloud className={iconSize} style={iconStyle} />;
    }
};

export function WeatherCard({ weather }: WeatherCardProps) {
    const temp = Math.round(weather.main.temp);
    const feelsLike = Math.round(weather.main.feels_like);
    const humidity = weather.main.humidity;
    const windSpeed = (weather.wind.speed * 3.6).toFixed(1);
    const pressure = weather.main.pressure;
    const description = weather.weather[0].description;
    const weatherMain = weather.weather[0].main;

    return (
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl shadow-xl border border-blue-400/20 p-6 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4"
                    style={{
                        animationDelay: '0ms',
                        animation: 'fadeInUp 0.5s ease-out forwards'
                    }}>
                    <div>
                        <h2 className="text-lg font-bold mb-1">Current Weather</h2>
                        <p className="text-blue-100 text-sm capitalize font-medium">{description}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg ring-2 ring-white/20">
                        {getWeatherIcon(weatherMain)}
                    </div>
                </div>

                <div className="flex items-baseline gap-2 mb-6"
                    style={{
                        animationDelay: '100ms',
                        animation: 'fadeInUp 0.5s ease-out forwards'
                    }}>
                    <span className="text-5xl font-bold">{temp}°</span>
                    <span className="text-xl text-blue-100">Feels like {feelsLike}°</span>
                </div>

                <div className="grid grid-cols-2 gap-3"
                    style={{
                        animationDelay: '200ms',
                        animation: 'fadeInUp 0.5s ease-out forwards'
                    }}>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10 hover:bg-white/15 transition-all">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Thermometer className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-blue-100 font-medium">Temperature</p>
                            <p className="text-lg font-bold">{temp}°C</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10 hover:bg-white/15 transition-all">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Droplets className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-blue-100 font-medium">Humidity</p>
                            <p className="text-lg font-bold">{humidity}%</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10 hover:bg-white/15 transition-all">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <WindIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-blue-100 font-medium">Wind Speed</p>
                            <p className="text-lg font-bold">{windSpeed} km/h</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10 hover:bg-white/15 transition-all">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Gauge className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-xs text-blue-100 font-medium">Pressure</p>
                            <p className="text-lg font-bold">{pressure} hPa</p>
                        </div>
                    </div>
                </div>

                {/* Add CSS animation */}
                <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
            </div>
        </div>
    );
}
