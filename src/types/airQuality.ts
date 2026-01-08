export interface AirQualityResponse {
    coord: {
        lon: number;  // Longitude
        lat: number;  // Latitude
    };
    list: Array<{
        main: {
            aqi: number;  // Air Quality Index: 1-5 (1=Good, 5=Very Poor)
        };
        components: {
            co: number;      // Carbon monoxide (μg/m³)
            no: number;      // Nitrogen monoxide (μg/m³)
            no2: number;     // Nitrogen dioxide (μg/m³)
            o3: number;      // Ozone (μg/m³)
            so2: number;     // Sulphur dioxide (μg/m³)
            pm2_5: number;   // Fine particulate matter (μg/m³)
            pm10: number;    // Coarse particulate matter (μg/m³)
            nh3: number;     // Ammonia (μg/m³)
        };
        dt: number;  // Unix timestamp
    }>;
}

// This is a cleaner version for your components to use
export interface AirQualityData {
    aqi: number;
    location: string;
    pollutants: {
        pm2_5: number;
        pm10: number;
        no2: number;
        o3: number;
    };
    timestamp: Date;
}

// For location search results
export interface Location {
    name: string;
    country: string;
    state?: string;  // Optional (not all cities have states)
    lat: number;
    lon: number;
}

// Existing interfaces stay the same...

// Weather API Types
export interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
    dt: number;
}

export interface WeatherForecast {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            humidity: number;
        };
        weather: Array<{
            main: string;
            description: string;
            icon: string;
        }>;
        wind: {
            speed: number;
        };
    }>;
}
