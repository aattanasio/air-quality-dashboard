import { Wind, AlertCircle } from 'lucide-react';
import { useAirQuality } from './hooks/useAirQuality';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocationName } from './hooks/useLocationName';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AirQualityCard } from './components/AirQualityCard';
import { HealthRecommendation } from './components/HealthRecommendation';

function App() {
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
  const { data, loading, error } = useAirQuality(latitude, longitude);
  const { locationName, loading: locationLoading } = useLocationName(latitude, longitude);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with icon */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Wind className="w-10 h-10 text-white" />
          <h1 className="text-4xl font-bold text-white text-center">
            Air Quality Dashboard
          </h1>
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
        {(geoError || error) && (
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
              location={locationLoading ? 'Loading location...' : locationName}
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
