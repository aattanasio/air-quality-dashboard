import { MapPin, Clock } from 'lucide-react';
import { AQI_LEVELS } from '../constants/aqiThresholds';

interface AirQualityCardProps {
    aqi: number;
    location: string;
    timestamp: Date;
}

export function AirQualityCard({ aqi, location, timestamp }: AirQualityCardProps) {
    const aqiInfo = AQI_LEVELS[aqi as keyof typeof AQI_LEVELS];

    const formattedTime = timestamp.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            {/* Location header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-800">{location}</h3>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{formattedTime}</span>
                </div>
            </div>

            {/* AQI badge */}
            <div className="flex items-center gap-4">
                <div
                    className={`
            ${aqiInfo.color}
            rounded-full
            w-24 h-24
            flex items-center justify-center
            shadow-md
          `}
                >
                    <span className="text-4xl font-bold text-white">{aqi}</span>
                </div>

                <div>
                    <p className={`text-2xl font-bold ${aqiInfo.textColor}`}>
                        {aqiInfo.label}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                        {aqiInfo.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
