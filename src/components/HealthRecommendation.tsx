import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { HEALTH_RECOMMENDATIONS } from '../constants/aqiThresholds';

interface HealthRecommendationProps {
    aqi: number;
}

export function HealthRecommendation({ aqi }: HealthRecommendationProps) {
    const recommendation = HEALTH_RECOMMENDATIONS[aqi as keyof typeof HEALTH_RECOMMENDATIONS];

    // Get icon component and colors based on AQI level
    const getIconConfig = () => {
        if (aqi <= 2) {
            return {
                Icon: CheckCircle,
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-500'
            };
        }
        if (aqi === 3) {
            return {
                Icon: AlertTriangle,
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-500'
            };
        }
        return {
            Icon: AlertOctagon,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-500'
        };
    };

    const { Icon, color, bgColor, borderColor } = getIconConfig();

    return (
        <div className={`${bgColor} border-l-4 ${borderColor} p-5 rounded-2xl shadow-md border border-gray-100/50`}>
            <div className="flex items-start gap-4">
                <div className={`p-2.5 ${bgColor} rounded-xl ring-2 ring-white shadow-sm`}>
                    <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                </div>
                <div className="flex-1">
                    <h4 className={`font-bold ${color} mb-2 text-base`}>
                        Health Recommendation
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {recommendation}
                    </p>
                </div>
            </div>
        </div>
    );
}
