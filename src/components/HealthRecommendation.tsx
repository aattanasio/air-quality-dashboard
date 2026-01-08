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
        <div className={`${bgColor} border-l-4 ${borderColor} p-4 rounded`}>
            <div className="flex items-start gap-3">
                <Icon className={`w-6 h-6 ${color} flex-shrink-0 mt-0.5`} />
                <div>
                    <h4 className={`font-semibold ${color} mb-1`}>
                        Health Recommendation
                    </h4>
                    <p className="text-gray-700 text-sm">
                        {recommendation}
                    </p>
                </div>
            </div>
        </div>
    );
}
