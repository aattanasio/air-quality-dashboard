import { useState } from 'react';
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
        <div className="relative">
            {/* Search input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {results.map((location, index) => (
                        <button
                            key={`${location.name}-${location.lat}-${location.lon}-${index}`}
                            onClick={() => handleSelectLocation(location)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                            <p className="font-medium text-gray-800">{location.name}</p>
                            <p className="text-sm text-gray-500">
                                {location.state && `${location.state}, `}{location.country}
                            </p>
                        </button>
                    ))}
                </div>
            )}

            {/* No results message */}
            {showResults && results.length === 0 && !loading && query.length >= 2 && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
                    No locations found for "{query}"
                </div>
            )}
        </div>
    );
}
