import type { AirQualityResponse, Location } from '../types/airQuality';
import { API_CONFIG } from '../constants/aqiThresholds';

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Base function to make API requests
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Service object with all API methods
export const openWeatherApi = {
    /**
     * Get current air quality for a location
     * @param lat - Latitude
     * @param lon - Longitude
     * @returns Air quality data
     */
    async getAirQuality(lat: number, lon: number): Promise<AirQualityResponse> {
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AIR_POLLUTION}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        return fetchFromAPI<AirQualityResponse>(url);
    },

    /**
     * Get 5-day air quality forecast
     * @param lat - Latitude
     * @param lon - Longitude
     * @returns Forecast data
     */
    async getForecast(lat: number, lon: number): Promise<AirQualityResponse> {
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FORECAST}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        return fetchFromAPI<AirQualityResponse>(url);
    },

    /**
     * Search for locations by name
     * @param query - City name to search
     * @returns Array of matching locations
     */
    async searchLocation(query: string): Promise<Location[]> {
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GEOCODING}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
        return fetchFromAPI<Location[]>(url);
    },

    /**
   * Get location name from coordinates (reverse geocoding)
   * @param lat - Latitude
   * @param lon - Longitude
   * @returns Location information
   */
    async reverseGeocode(lat: number, lon: number): Promise<Location[]> {
        const url = `${API_CONFIG.BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
        return fetchFromAPI<Location[]>(url);
    }
};
