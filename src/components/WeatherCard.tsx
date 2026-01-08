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
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold mb-1">Current Weather</h2>
                    <p className="text-blue-100 text-sm capitalize">{description}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    {getWeatherIcon(weatherMain)}
                </div>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold">{temp}°</span>
                <span className="text-xl text-blue-100">Feels like {feelsLike}°</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <Thermometer className="w-5 h-5 text-blue-100" />
                    <div>
                        <p className="text-xs text-blue-100">Temperature</p>
                        <p className="text-lg font-semibold">{temp}°C</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <Droplets className="w-5 h-5 text-blue-100" />
                    <div>
                        <p className="text-xs text-blue-100">Humidity</p>
                        <p className="text-lg font-semibold">{humidity}%</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <WindIcon className="w-5 h-5 text-blue-100" />
                    <div>
                        <p className="text-xs text-blue-100">Wind Speed</p>
                        <p className="text-lg font-semibold">{windSpeed} km/h</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <Gauge className="w-5 h-5 text-blue-100" />
                    <div>
                        <p className="text-xs text-blue-100">Pressure</p>
                        <p className="text-lg font-semibold">{pressure} hPa</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
