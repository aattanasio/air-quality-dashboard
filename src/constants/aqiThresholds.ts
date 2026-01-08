// AQI levels with their visual appearance
export const AQI_LEVELS = {
    1: {
        label: 'Good',
        color: 'bg-green-500',
        textColor: 'text-green-700',
        description: 'Air quality is satisfactory'
    },
    2: {
        label: 'Fair',
        color: 'bg-yellow-400',
        textColor: 'text-yellow-700',
        description: 'Air quality is acceptable'
    },
    3: {
        label: 'Moderate',
        color: 'bg-orange-500',
        textColor: 'text-orange-700',
        description: 'Sensitive groups may experience effects'
    },
    4: {
        label: 'Poor',
        color: 'bg-red-500',
        textColor: 'text-red-700',
        description: 'Everyone may experience health effects'
    },
    5: {
        label: 'Very Poor',
        color: 'bg-purple-600',
        textColor: 'text-purple-700',
        description: 'Health alert - avoid outdoor activities'
    }
} as const;

// Health recommendations for each AQI level
export const HEALTH_RECOMMENDATIONS = {
    1: 'Perfect conditions for outdoor activities! Enjoy your time outside.',
    2: 'Air quality is acceptable. Sensitive individuals should watch for symptoms.',
    3: 'Sensitive groups should limit prolonged outdoor activities.',
    4: 'Consider limiting outdoor activities. Sensitive groups should stay indoors.',
    5: 'Avoid all outdoor activities. Everyone is at risk of health effects.'
} as const;

// API configuration
export const API_CONFIG = {
    BASE_URL: 'https://api.openweathermap.org',
    ENDPOINTS: {
        AIR_POLLUTION: '/data/2.5/air_pollution',
        FORECAST: '/data/2.5/air_pollution/forecast',
        GEOCODING: '/geo/1.0/direct'
    }
} as const;
