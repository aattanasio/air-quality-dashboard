import { useState } from 'react';
import { Wind, AlertCircle, Gauge, TrendingUp, CloudSun } from 'lucide-react';
import { useAirQuality } from './hooks/useAirQuality';
import { useGeolocation } from './hooks/useGeolocation';
import { useLocationName } from './hooks/useLocationName';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useForecast } from './hooks/useForecast';
import { useWeather } from './hooks/useWeather';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AirQualityCard } from './components/AirQualityCard';
import { HealthRecommendation } from './components/HealthRecommendation';
import { LocationSearch } from './components/LocationSearch';
import { SavedLocations } from './components/SavedLocations';
import { PollutantDetails } from './components/PollutantDetails';
import { AirQualityForecast } from './components/AirQualityForecast';
import { WeatherCard } from './components/WeatherCard';
import { Tabs } from './components/Tabs';


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
  const [activeTab, setActiveTab] = useState('current');

  const lat = selectedLat ?? geoLatitude;
  const lon = selectedLon ?? geoLongitude;

  const { data, loading, error } = useAirQuality(lat, lon);
  const { locationName, loading: locationLoading } = useLocationName(lat, lon);
  const { data: forecastData, loading: forecastLoading } = useForecast(lat, lon);
  const { data: weatherData, loading: weatherLoading } = useWeather(lat, lon);

  const displayName = selectedLocationName || locationName;

  const handleLocationSelect = (latitude: number, longitude: number, name: string) => {
    setSelectedLat(latitude);
    setSelectedLon(longitude);
    setSelectedLocationName(name);
    setActiveTab('current');
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

  const tabs = [
    { id: 'current', label: 'Air Quality', icon: <Gauge className="w-4 h-4" /> },
    { id: 'forecast', label: '5-Day Forecast', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'weather', label: 'Weather', icon: <CloudSun className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 lg:p-8 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-6xl mx-auto relative">
        {/* Enhanced header with glassmorphism effect */}
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Wind className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight pb-1">
                Air Quality Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">Real-time air quality monitoring and forecasts</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>

        {(geoLoading || loading) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-12">
            <LoadingSpinner size="large" />
            <p className="text-center mt-4 text-gray-600 font-medium">
              {geoLoading ? 'Getting your location...' : 'Loading air quality data...'}
            </p>
          </div>
        )}

        {(geoError || error) && !data && (
          <div className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              </div>
              <p className="text-red-800 font-medium">
                {geoError || error}
              </p>
            </div>
          </div>
        )}

        {data && !loading && (
          <div className="space-y-6">
            {/* Tabs navigation */}
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab content */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Main content area */}
              <div className="flex-1 space-y-6">
                {/* Current Air Quality Tab */}
                {activeTab === 'current' && (
                  <>
                    <AirQualityCard
                      aqi={data.list[0].main.aqi}
                      location={selectedLocationName || (locationLoading ? 'Loading location...' : displayName)}
                      timestamp={new Date(data.list[0].dt * 1000)}
                      isSaved={isCurrentLocationSaved}
                      onToggleSave={handleSaveLocation}
                    />

                    <HealthRecommendation aqi={data.list[0].main.aqi} />

                    <PollutantDetails pollutants={data.list[0].components} />
                  </>
                )}

                {/* 5-Day Forecast Tab */}
                {activeTab === 'forecast' && (
                  <>
                    {forecastLoading ? (
                      <div className="bg-white rounded-lg p-12">
                        <LoadingSpinner size="large" />
                        <p className="text-center mt-4 text-gray-600">Loading forecast data...</p>
                      </div>
                    ) : forecastData ? (
                      <AirQualityForecast forecastData={forecastData.list} />
                    ) : (
                      <div className="bg-white rounded-lg p-12 text-center">
                        <p className="text-gray-600">No forecast data available</p>
                      </div>
                    )}
                  </>
                )}

                {/* Weather Tab */}
                {activeTab === 'weather' && weatherData && !weatherLoading && (
                  <div className="grid grid-cols-1 gap-6">
                    <WeatherCard weather={weatherData} />

                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Weather & Air Quality Correlation
                      </h3>
                      <div className="space-y-4 text-sm text-gray-600">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="font-bold text-gray-900 min-w-[80px]">Wind:</span>
                          <p className="leading-relaxed">
                            {weatherData.wind.speed > 5
                              ? 'Strong winds help disperse pollutants, improving air quality.'
                              : 'Light winds may allow pollutants to accumulate.'}
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="font-bold text-gray-900 min-w-[80px]">Humidity:</span>
                          <p className="leading-relaxed">
                            {weatherData.main.humidity > 70
                              ? 'High humidity can increase particulate matter concentration.'
                              : 'Moderate humidity levels are favorable for air quality.'}
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="font-bold text-gray-900 min-w-[80px]">Temperature:</span>
                          <p className="leading-relaxed">
                            Current temperature of {Math.round(weatherData.main.temp)}°C
                            {weatherData.main.temp > 30
                              ? ' may increase ground-level ozone formation.'
                              : ' is within normal range for air quality.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Saved locations sidebar - visible on all tabs */}
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

        {/* Credits Footer */}
        <footer className="mt-12 backdrop-blur-sm bg-white/70 rounded-2xl shadow-lg border border-white/50 p-6">
          <div className="text-center space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Credits</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600">
              <span>Data provided by</span>
              <a
                href="https://openweathermap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                OpenWeather API
              </a>
            </div>
            <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
              Developed by Asja Attanasio • {new Date().getFullYear()}
            </div>
          </div>
        </footer>

      </div>

      <style>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }

      .animate-slideInUp {
        animation: slideInUp 0.6s ease-out forwards;
      }

      .animate-slideInLeft {
        animation: slideInLeft 0.6s ease-out forwards;
      }

      .animate-scaleIn {
        animation: scaleIn 0.5s ease-out forwards;
      }
    `}</style>
    </div>
  );
}

export default App;
