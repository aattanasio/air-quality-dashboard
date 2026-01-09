import { useState, useRef, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { openWeatherApi } from '../services/openWeatherApi';
import type { Location } from '../types/airQuality';

interface LocationSearchProps {
    onLocationSelect: (lat: number, lon: number, locationName: string) => void;
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = async (searchQuery: string) => {
        setQuery(searchQuery);

        // Don't search if query is too short
        if (searchQuery.length < 2) {
            setResults([]);
            setShowResults(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const locations = await openWeatherApi.searchLocation(searchQuery);
            setResults(locations);
            setShowResults(true);
        } catch (err) {
            setError('Failed to search locations');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectLocation = (location: Location) => {
        const locationName = location.state
            ? `${location.name}, ${location.state}, ${location.country}`
            : `${location.name}, ${location.country}`;

        onLocationSelect(location.lat, location.lon, locationName);

        // Clear search after selection
        setQuery('');
        setResults([]);
        setShowResults(false);
    };

    return (
        <div className="relative" ref={searchRef}>
            {/* Search input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-50 rounded-lg">
                    <Search className="w-4 h-4 text-blue-600" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full pl-14 pr-12 py-4 border-2 border-gray-200 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400"
                />
                {loading && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" />
                )}
            </div>

            {/* Error message */}
            {error && (
                <div className="mt-2 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Search results dropdown */}
            {showResults && results.length > 0 && (
                <div className="absolute z-50 w-full mt-3 bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-2xl max-h-64 overflow-y-auto">
                    {results.map((location, index) => (
                        <button
                            key={`${location.name}-${location.lat}-${location.lon}-${index}`}
                            onClick={() => handleSelectLocation(location)}
                            className="w-full px-5 py-3.5 text-left hover:bg-blue-50 transition-all border-b border-gray-100 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl"
                        >
                            <p className="font-bold text-gray-900">{location.name}</p>
                            <p className="text-sm text-gray-600 font-medium">
                                {location.state && `${location.state}, `}{location.country}
                            </p>
                        </button>
                    ))}
                </div>
            )}

            {/* No results message */}
            {showResults && results.length === 0 && !loading && query.length >= 2 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
                    No locations found for "{query}"
                </div>
            )}
        </div>
    );
}
