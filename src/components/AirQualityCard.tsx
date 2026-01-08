import { MapPin, Clock, Heart } from 'lucide-react';
import { AQI_LEVELS } from '../constants/aqiThresholds';

interface AirQualityCardProps {
    aqi: number;
    location: string;
    timestamp: Date;
    isSaved: boolean;
    onToggleSave: () => void;
}

export function AirQualityCard({ aqi, location, timestamp, isSaved, onToggleSave }: AirQualityCardProps) {
    const aqiInfo = AQI_LEVELS[aqi as keyof typeof AQI_LEVELS];

    const formattedTime = timestamp.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative">
            {/* Save button in top-right corner */}
            <button
                onClick={onToggleSave}
                className={`
          absolute top-4 right-4 p-2 rounded-full transition-all
          ${isSaved
                        ? 'bg-red-50 text-red-600'
                        : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-600'
                    }
        `}
                title={isSaved ? 'Remove from saved locations' : 'Save this location'}
            >
                <Heart
                    className={`w-5 h-5 transition-all ${isSaved ? 'fill-current' : ''}`}
                />
            </button>

            {/* Location header - now without timestamp */}
            <div className="flex items-center gap-2 mb-4 pr-12">
                <MapPin className="w-5 h-5 text-gray-500" />
                <h3 className="text-xl font-semibold text-gray-800">{location}</h3>
            </div>

            {/* AQI badge and info */}
            <div className="flex items-center gap-4 mb-3">
                <div
                    className={`
            ${aqiInfo.color}
            rounded-full
            w-20 h-20 lg:w-24 lg:h-24
            flex items-center justify-center
            shadow-md
          `}
                >
                    <span className="text-3xl lg:text-4xl font-bold text-white">{aqi}</span>
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

            {/* Timestamp in bottom-right corner */}
            <div className="flex items-center justify-end gap-1 text-gray-400 text-xs">
                <Clock className="w-3 h-3" />
                <span>Updated {formattedTime}</span>
            </div>
        </div>
    );
}
