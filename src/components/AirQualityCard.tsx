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
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 relative overflow-hidden">
            <div className="animate-fadeInUp">
                {/* Save button in top-right corner */}
                <button
                    onClick={onToggleSave}
                    className={`
          absolute top-6 right-6 p-2.5 rounded-xl transition-all shadow-sm hover:shadow-md z-10
          ${isSaved
                            ? 'bg-red-50 text-red-500 ring-2 ring-red-200'
                            : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:ring-2 hover:ring-red-100'
                        }
        `}
                    title={isSaved ? 'Remove from saved locations' : 'Save this location'}
                >
                    <Heart
                        className={`w-5 h-5 transition-all ${isSaved ? 'fill-current' : ''}`}
                    />
                </button>

                {/* Location header - now without timestamp */}
                <div className="flex items-center gap-2.5 mb-5 pr-12 pt-3">
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{location}</h3>
                </div>

                {/* AQI badge and info */}
                <div className="flex items-center gap-5 mb-4">
                    <div
                        className={`
            ${aqiInfo.color}
            rounded-2xl
            w-24 h-24 lg:w-28 lg:h-28
            flex items-center justify-center
            shadow-lg ring-4 ring-white/50
          `}
                    >
                        <span className="text-4xl lg:text-5xl font-extrabold text-white">{aqi}</span>
                    </div>

                    <div className="flex-1">
                        <p className={`text-2xl lg:text-3xl font-extrabold ${aqiInfo.textColor} mb-1`}>
                            {aqiInfo.label}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {aqiInfo.description}
                        </p>
                    </div>
                </div>

                {/* Timestamp in bottom-right corner */}
                <div className="flex items-center justify-end gap-1.5 text-gray-500 text-xs border-t border-gray-100 pt-3 mt-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-medium">Updated {formattedTime}</span>
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
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
