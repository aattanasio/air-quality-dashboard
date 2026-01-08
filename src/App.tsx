import { useAirQuality } from './hooks/useAirQuality';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  // Test geolocation hook
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();

  // Test air quality hook (only when we have coordinates)
  const { data, loading, error } = useAirQuality(latitude, longitude);

  // Test localStorage hook
  const [visitCount, setVisitCount] = useLocalStorage('visitCount', 0);

  // Increment visit count on first render
  if (visitCount === 0) {
    setVisitCount(1);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Testing Custom Hooks
        </h1>

        {/* Geolocation test */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">Geolocation Hook</h2>
          {geoLoading && <p className="text-blue-600">Getting your location...</p>}
          {geoError && <p className="text-red-600">Error: {geoError}</p>}
          {latitude && longitude && (
            <p className="text-green-600">
              Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </p>
          )}
        </div>

        {/* Air quality test */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">Air Quality Hook</h2>
          {loading && <p className="text-blue-600">Loading air quality data...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {data && (
            <div className="text-green-600">
              <p>AQI: {data.list[0].main.aqi}</p>
              <p>PM2.5: {data.list[0].components.pm2_5.toFixed(2)} μg/m³</p>
            </div>
          )}
        </div>

        {/* localStorage test */}
        <div>
          <h2 className="text-xl font-semibold mb-2">LocalStorage Hook</h2>
          <p className="text-gray-700">
            You've visited this page {visitCount} time(s)
          </p>
          <button
            onClick={() => setVisitCount(visitCount + 1)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment Count
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
