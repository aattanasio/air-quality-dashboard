import { Heart, Trash2, MapPin } from 'lucide-react';
import type { Location } from '../types/airQuality';

interface SavedLocation extends Location {
    id: string;
    savedAt: number;
}

interface SavedLocationsProps {
    savedLocations: SavedLocation[];
    onSelectLocation: (lat: number, lon: number, name: string) => void;
    onRemoveLocation: (id: string) => void;
    currentLocation: { lat: number | null; lon: number | null };
}

export function SavedLocations({
    savedLocations,
    onSelectLocation,
    onRemoveLocation,
    currentLocation
}: SavedLocationsProps) {
    if (savedLocations.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-semibold text-gray-800">Saved Locations</h2>
                </div>
                <p className="text-gray-500 text-sm text-center py-4">
                    No saved locations yet. Search for a city and save it to quickly check its air quality later.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-800">Saved Locations</h2>
                <span className="text-sm text-gray-500">({savedLocations.length})</span>
            </div>

            <div className="space-y-2">
                {savedLocations.map((location) => {
                    const locationName = location.state
                        ? `${location.name}, ${location.state}, ${location.country}`
                        : `${location.name}, ${location.country}`;

                    const isActive =
                        currentLocation.lat === location.lat &&
                        currentLocation.lon === location.lon;

                    return (
                        <div
                            key={location.id}
                            className={`
                flex items-center justify-between p-3 rounded-lg border
                transition-all
                ${isActive
                                    ? 'bg-blue-50 border-blue-300'
                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                }
              `}
                        >
                            <button
                                onClick={() => onSelectLocation(location.lat, location.lon, locationName)}
                                className="flex items-center gap-2 flex-1 text-left"
                            >
                                <MapPin className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                <div>
                                    <p className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-800'}`}>
                                        {location.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {location.state && `${location.state}, `}{location.country}
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={() => onRemoveLocation(location.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Remove location"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
