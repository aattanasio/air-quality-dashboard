import { useState } from 'react';
import { Wind, AlertCircle } from 'lucide-react';
import { useAirQuality } from './hooks/useAirQuality';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocationName } from './hooks/useLocationName';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AirQualityCard } from './components/AirQualityCard';
import { HealthRecommendation } from './components/HealthRecommendation';
import { LocationSearch } from './components/LocationSearch';

function App() {
  // User's current location from browser
  const { latitude: geoLatitude, longitude: geoLongitude, error: geoError, loading: geoLoading } = useGeolocation();

  // Selected location (starts with user's location, can be changed via search)
  const [selectedLat, setSelectedLat] = useState<number | null>(null);
  const [selectedLon, setSelectedLon] = useState<number | null>(null);
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');

  // Use selected location if available, otherwise use geolocation
  const lat = selectedLat ?? geoLatitude;
  const lon = selectedLon ?? geoLongitude;

  const { data, loading, error } = useAirQuality(lat, lon);
  const { locationName, loading: locationLoading } = useLocationName(lat, lon);

  // Display selected location name if available, otherwise use detected name
  const displayName = selectedLocationName || locationName;

  const handleLocationSelect = (latitude: number, longitude: number, name: string) => {
    setSelectedLat(latitude);
    setSelectedLon(longitude);
    setSelectedLocationName(name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Wind className="w-10 h-10 text-white" />
          <h1 className="text-4xl font-bold text-white text-center">
            Air Quality Dashboard
          </h1>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>

        {/* Loading state */}
        {(geoLoading || loading) && (
          <div className="bg-white rounded-lg p-12">
            <LoadingSpinner size="large" />
            <p className="text-center mt-4 text-gray-600">
              {geoLoading ? 'Getting your location...' : 'Loading air quality data...'}
            </p>
          </div>
        )}

        {/* Error state */}
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

        {/* Data loaded successfully */}
        {data && !loading && (
          <div className="space-y-6">
            <AirQualityCard
              aqi={data.list[0].main.aqi}
              location={selectedLocationName || (locationLoading ? 'Loading location...' : displayName)}
              timestamp={new Date(data.list[0].dt * 1000)}
            />

            <HealthRecommendation aqi={data.list[0].main.aqi} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
