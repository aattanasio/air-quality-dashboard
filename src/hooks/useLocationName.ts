import { useState, useEffect } from 'react';
import { openWeatherApi } from '../services/openWeatherApi';

/**
 * Custom hook to get location name from coordinates
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns Location name string and loading state
 */
export function useLocationName(lat: number | null, lon: number | null) {
    const [locationName, setLocationName] = useState<string>('Your Location');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (lat === null || lon === null) {
            return;
        }

        const fetchLocationName = async () => {
            setLoading(true);

            try {
                const locations = await openWeatherApi.reverseGeocode(lat, lon);

                if (locations.length > 0) {
                    const location = locations[0];
                    // Format: "City, Country" or "City, State, Country"
                    const name = location.state
                        ? `${location.name}, ${location.state}, ${location.country}`
                        : `${location.name}, ${location.country}`;

                    setLocationName(name);
                }
            } catch (error) {
                console.error('Failed to fetch location name:', error);
                setLocationName('Unknown Location');
            } finally {
                setLoading(false);
            }
        };

        fetchLocationName();
    }, [lat, lon]);

    return { locationName, loading };
}
