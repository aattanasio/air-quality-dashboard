import { useState, useEffect } from 'react';

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
    loading: boolean;
}

/**
 * Custom hook to get user's current location using browser Geolocation API
 * @returns Object containing coordinates, loading state, and error
 */
export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            setState({
                latitude: null,
                longitude: null,
                error: 'Geolocation is not supported by your browser',
                loading: false,
            });
            return;
        }

        // Success callback
        const onSuccess = (position: GeolocationPosition) => {
            setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                loading: false,
            });
        };

        // Error callback
        const onError = (error: GeolocationPositionError) => {
            setState({
                latitude: null,
                longitude: null,
                error: error.message,
                loading: false,
            });
        };

        // Request user's location
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []); // Empty array = run only once when component mounts

    return state;
}
