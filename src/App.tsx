import { useState, useEffect } from 'react';
import { Wind, AlertCircle } from 'lucide-react';
import { useAirQuality } from './hooks/useAirQuality';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocationName } from './hooks/useLocationName';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AirQualityCard } from './components/AirQualityCard';
import { HealthRecommendation } from './components/HealthRecommendation';
import { LocationSearch } from './components/LocationSearch';
import { SavedLocations } from './components/SavedLocations';
import { PollutantDetails } from './components/PollutantDetails';

interface SavedLocation {
  id: string;
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  savedAt: number;
}

function App() {
  const { latitude: geoLatitude, longitude: geoLongitude, error: geoError, loading: geoLoading } = useGeolocation();

  const [selectedLat, setSelectedLat] = useState<number | null>(null);
  const [selectedLon, setSelectedLon] = useState<number | null>(null);
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');

  const [savedLocations, setSavedLocations] = useLocalStorage<SavedLocation[]>('savedLocations', []);

  const lat = selectedLat ?? geoLatitude;
  const lon = selectedLon ?? geoLongitude;

  const { data, loading, error } = useAirQuality(lat, lon);
  const { locationName, loading: locationLoading } = useLocationName(lat, lon);

  const displayName = selectedLocationName || locationName;

  const handleLocationSelect = (latitude: number, longitude: number, name: string) => {
    setSelectedLat(latitude);
    setSelectedLon(longitude);
    setSelectedLocationName(name);
  };

  const handleSaveLocation = () => {
    if (lat === null || lon === null) return;

    // Check if already saved
    const existingLocation = savedLocations.find(
      loc => loc.lat === lat && loc.lon === lon
    );

    if (existingLocation) {
      // Remove if already saved
      setSavedLocations(savedLocations.filter(loc => loc.id !== existingLocation.id));
    } else {
      // Add if not saved
      const newLocation: SavedLocation = {
        id: `${lat}-${lon}-${Date.now()}`,
        name: displayName.split(',')[0].trim(),
        country: displayName.split(',').slice(-1)[0].trim(),
        state: displayName.split(',').length > 2 ? displayName.split(',')[1].trim() : undefined,
        lat,
        lon,
        savedAt: Date.now()
      };

      setSavedLocations([...savedLocations, newLocation]);
    }
  };


  const handleRemoveLocation = (id: string) => {
    setSavedLocations(savedLocations.filter(loc => loc.id !== id));
  };

  // Check if current location is saved
  const isCurrentLocationSaved = savedLocations.some(
    loc => loc.lat === lat && loc.lon === lon
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Wind className="w-10 h-10 text-white" />
          <h1 className="text-4xl font-bold text-white text-center">
            Air Quality Dashboard
          </h1>
        </div>

        <div className="mb-6">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>

        {(geoLoading || loading) && (
          <div className="bg-white rounded-lg p-12">
            <LoadingSpinner size="large" />
            <p className="text-center mt-4 text-gray-600">
              {geoLoading ? 'Getting your location...' : 'Loading air quality data...'}
            </p>
          </div>
        )}

        {(geoError || error) && !data && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-800">
                {geoError || error}
              </p>
            </div>
          </div>
        )}

        {data && !loading && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1 space-y-6">
                <AirQualityCard
                  aqi={data.list[0].main.aqi}
                  location={selectedLocationName || (locationLoading ? 'Loading location...' : displayName)}
                  timestamp={new Date(data.list[0].dt * 1000)}
                  isSaved={isCurrentLocationSaved}
                  onToggleSave={handleSaveLocation}
                />

                <HealthRecommendation aqi={data.list[0].main.aqi} />

                <PollutantDetails
                  pollutants={data.list[0].components}
                />
              </div>

              {/* Saved locations sidebar */}
              <div className="w-full lg:w-80">
                <SavedLocations
                  savedLocations={savedLocations}
                  onSelectLocation={handleLocationSelect}
                  onRemoveLocation={handleRemoveLocation}
                  currentLocation={{ lat, lon }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
