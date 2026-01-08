import { useState, useEffect } from 'react';
import { openWeatherApi } from '../services/openWeatherApi';
import type { WeatherData } from '../types/airQuality';

export function useWeather(lat: number | null, lon: number | null) {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (lat === null || lon === null) {
            return;
        }

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await openWeatherApi.getCurrentWeather(lat, lon);
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lon]);

    return { data, loading, error };
}
