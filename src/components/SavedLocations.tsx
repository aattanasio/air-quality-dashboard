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
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gray-100 rounded-xl">
                        <Heart className="w-5 h-5 text-gray-400" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Saved Locations</h2>
                </div>
                <p className="text-gray-500 text-sm text-center py-6 leading-relaxed">
                    No saved locations yet. Search for a city and save it to quickly check its air quality later.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-red-50 rounded-xl">
                    <Heart className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Saved Locations</h2>
                <span className="px-2 py-0.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-full">{savedLocations.length}</span>
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
                flex items-center justify-between p-3.5 rounded-xl border-2 shadow-sm
                transition-all duration-200
                ${isActive
                                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-md'
                                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                }
              `}
                        >
                            <button
                                onClick={() => onSelectLocation(location.lat, location.lon, locationName)}
                                className="flex items-center gap-3 flex-1 text-left"
                            >
                                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    <MapPin className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                                </div>
                                <div>
                                    <p className={`font-bold text-sm ${isActive ? 'text-blue-900' : 'text-gray-800'}`}>
                                        {location.name}
                                    </p>
                                    <p className="text-xs text-gray-500 font-medium">
                                        {location.state && `${location.state}, `}{location.country}
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={() => onRemoveLocation(location.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
