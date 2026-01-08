import { useState, useEffect } from 'react';
import { openWeatherApi } from '../services/openWeatherApi';
import type { AirQualityResponse } from '../types/airQuality';

/**
 * Custom hook to fetch air quality data for a location
 * @param lat - Latitude (null if location not selected)
 * @param lon - Longitude (null if location not selected)
 * @returns Object containing data, loading state, and error
 */
export function useAirQuality(lat: number | null, lon: number | null) {
    const [data, setData] = useState<AirQualityResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Don't fetch if coordinates are missing
        if (lat === null || lon === null) {
            return;
        }

        // Define async function inside useEffect
        const fetchAirQuality = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await openWeatherApi.getAirQuality(lat, lon);
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch air quality data');
            } finally {
                setLoading(false);
            }
        };

        fetchAirQuality();
    }, [lat, lon]); // Re-run when coordinates change

    return { data, loading, error };
}
