import { useState, useEffect } from 'react';
import { openWeatherApi } from '../services/openWeatherApi';
import type { AirQualityResponse } from '../types/airQuality';

export function useForecast(lat: number | null, lon: number | null) {
    const [data, setData] = useState<AirQualityResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (lat === null || lon === null) {
            return;
        }

        const fetchForecast = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await openWeatherApi.getForecast(lat, lon);
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch forecast data');
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, [lat, lon]);

    return { data, loading, error };
}
