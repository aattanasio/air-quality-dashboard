import { TrendingUp, Calendar } from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { AQI_LEVELS } from '../constants/aqiThresholds';

interface ForecastData {
    dt: number;
    main: {
        aqi: number;
    };
    components: {
        pm2_5: number;
        pm10: number;
        no2: number;
        o3: number;
    };
}

interface AirQualityForecastProps {
    forecastData: ForecastData[];
}

export function AirQualityForecast({ forecastData }: AirQualityForecastProps) {
    const getDailyForecast = () => {
        const dailyData: { [key: string]: ForecastData[] } = {};

        forecastData.forEach((item) => {
            const date = new Date(item.dt * 1000);
            const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            if (!dailyData[dateKey]) {
                dailyData[dateKey] = [];
            }
            dailyData[dateKey].push(item);
        });

        return Object.entries(dailyData).slice(0, 5).map(([date, items]) => {
            const avgAqi = Math.round(
                items.reduce((sum, item) => sum + item.main.aqi, 0) / items.length
            );
            const avgPM25 = items.reduce((sum, item) => sum + item.components.pm2_5, 0) / items.length;
            const avgPM10 = items.reduce((sum, item) => sum + item.components.pm10, 0) / items.length;
            const avgNO2 = items.reduce((sum, item) => sum + item.components.no2, 0) / items.length;
            const avgO3 = items.reduce((sum, item) => sum + item.components.o3, 0) / items.length;

            return {
                date,
                aqi: avgAqi,
                pm2_5: Number(avgPM25.toFixed(1)),
                pm10: Number(avgPM10.toFixed(1)),
                no2: Number(avgNO2.toFixed(1)),
                o3: Number(avgO3.toFixed(1))
            };
        });
    };

    const dailyForecast = getDailyForecast();

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">5-Day Forecast</h2>
            </div>

            {/* Daily forecast cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {dailyForecast.map((day, index) => {
                    const aqiInfo = AQI_LEVELS[day.aqi as keyof typeof AQI_LEVELS];

                    return (
                        <div
                            key={day.date}
                            className="border-2 border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white hover:border-blue-300"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'fadeInUp 0.5s ease-out forwards'
                            }}
                        >
                            <div className="flex items-center justify-center gap-1.5 mb-3">
                                <div className="p-1 bg-blue-50 rounded-lg">
                                    <Calendar className="w-3 h-3 text-blue-600" />
                                </div>
                                <p className="text-sm font-bold text-gray-700">{day.date}</p>
                            </div>
                            <div
                                className={`${aqiInfo.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md ring-2 ring-white/50`}
                            >
                                <span className="text-xl font-extrabold text-white">{day.aqi}</span>
                            </div>
                            <p className={`text-xs font-bold ${aqiInfo.textColor}`}>
                                {aqiInfo.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* AQI Trend Chart with Gradient */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                    AQI Trend
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={dailyForecast}>
                        <defs>
                            <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            stroke="#6b7280"
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            stroke="#6b7280"
                            domain={[0, 5]}
                            ticks={[1, 2, 3, 4, 5]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            animationDuration={300}
                        />
                        <Area
                            type="monotone"
                            dataKey="aqi"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="url(#aqiGradient)"
                            animationDuration={1500}
                            animationBegin={0}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Pollutants Chart with Gradients */}
            <div>
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                    Pollutant Levels (μg/m³)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={dailyForecast}>
                        <defs>
                            <linearGradient id="pm25Gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="pm10Gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="no2Gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="o3Gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            stroke="#6b7280"
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            stroke="#6b7280"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            animationDuration={300}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: '12px' }}
                            iconType="line"
                        />
                        <Area
                            type="monotone"
                            dataKey="pm2_5"
                            stroke="#ef4444"
                            strokeWidth={2}
                            fill="url(#pm25Gradient)"
                            name="PM2.5"
                            animationDuration={1500}
                            animationBegin={0}
                        />
                        <Area
                            type="monotone"
                            dataKey="pm10"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            fill="url(#pm10Gradient)"
                            name="PM10"
                            animationDuration={1500}
                            animationBegin={200}
                        />
                        <Area
                            type="monotone"
                            dataKey="no2"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            fill="url(#no2Gradient)"
                            name="NO₂"
                            animationDuration={1500}
                            animationBegin={400}
                        />
                        <Area
                            type="monotone"
                            dataKey="o3"
                            stroke="#10b981"
                            strokeWidth={2}
                            fill="url(#o3Gradient)"
                            name="O₃"
                            animationDuration={1500}
                            animationBegin={600}
                        />
                    </AreaChart>
                </ResponsiveContainer>
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
    );
}
