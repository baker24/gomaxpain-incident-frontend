'use client'
import { useEffect, useRef, useState } from "react";

interface IncidentPopupProps {
  incident: any;
  isOpen: boolean;
  onClose: () => void;
}

interface WeatherData {
  temperature?: {
    value?: number;
    degrees?: number;
    unit: string;
  };
  humidity?: {
    value: number;
  };
  windSpeed?: {
    value: number;
    unit: string;
  };
  weatherCode?: string;
  condition?: string;
}

export default function IncidentPopup({ incident, isOpen, onClose }: IncidentPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close popup with Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Fetch weather data when popup opens
  useEffect(() => {
    const fetchWeather = async () => {
      if (!isOpen || !incident?.latitude || !incident?.longitude) {
        return;
      }

      setWeatherLoading(true);
      setWeatherError(null);
      setWeatherData(null);

      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          throw new Error('Weather API key not configured');
        }

        const url = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${apiKey}&location.latitude=${incident.latitude}&location.longitude=${incident.longitude}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        
        // Parse the weather data based on Google Weather API response structure
        const weather: WeatherData = {
          temperature: data.temperature || data.values?.temperature,
          humidity: data.humidity || data.values?.humidity,
          windSpeed: data.windSpeed || data.values?.windSpeed,
          weatherCode: data.weatherCode,
          condition: data.condition || data.values?.weatherCondition.description
        };
        console.log("weather", weather);

        setWeatherData(weather);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeatherError(error instanceof Error ? error.message : 'Failed to fetch weather data');
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [isOpen, incident?.latitude, incident?.longitude]);

  if (!isOpen || !incident) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={popupRef}
        className="bg-background border border-primary/20 rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/20">
          <h2 className="text-xl font-semibold text-primary font-mono">
            Incident Details
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-primary/5 rounded-md"
            aria-label="Close popup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Incident Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Incident ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
                  Incident ID
                </label>
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-md">
                  <code className="text-sm text-foreground font-mono break-all">
                    {incident.id}
                  </code>
                </div>
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
                  Event Type
                </label>
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-md">
                  <span className="text-sm text-foreground font-mono">
                    {incident.event}
                  </span>
                </div>
              </div>

              {/* Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
                    City
                  </label>
                  <div className="p-3 bg-primary/5 border border-primary/10 rounded-md">
                    <span className="text-sm text-foreground font-mono">
                      {incident.city || 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
                    Intersection
                  </label>
                  <div className="p-3 bg-primary/5 border border-primary/10 rounded-md">
                    <span className="text-sm text-foreground font-mono">
                      {incident.intersection || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coordinates */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
                  Coordinates
                </label>
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-md">
                  <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                    <div>
                      <span className="text-primary/60">Latitude:</span>
                      <br />
                      <span className="text-foreground">{incident.latitude}</span>
                    </div>
                    <div>
                      <span className="text-primary/60">Longitude:</span>
                      <br />
                      <span className="text-foreground">{incident.longitude}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Created At */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
                  Created At
                </label>
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-md">
                  <span className="text-sm text-foreground font-mono">
                    {formatDate(incident.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Weather Information */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
                Current Weather
              </label>
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-md h-full">
                {weatherLoading ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading weather data...
                  </div>
                ) : weatherError ? (
                  <div className="text-sm text-red-400 font-mono">
                    {weatherError}
                  </div>
                ) : weatherData ? (
                  <div className="space-y-4">
                    {weatherData.temperature && (
                      <div>
                        <div className="text-xs text-primary/60 font-mono mb-1">Temperature</div>
                        <div className="text-2xl text-foreground font-mono">
                          {weatherData.temperature.degrees || weatherData.temperature.value}°{weatherData.temperature.unit || 'C'}
                        </div>
                      </div>
                    )}
                    {weatherData.condition && (
                      <div>
                        <div className="text-xs text-primary/60 font-mono mb-1">Condition</div>
                        <div className="text-sm text-foreground font-mono capitalize">
                          {weatherData.condition}
                        </div>
                      </div>
                    )}
                    {weatherData.humidity && (
                      <div>
                        <div className="text-xs text-primary/60 font-mono mb-1">Humidity</div>
                        <div className="text-lg text-foreground font-mono">
                          {weatherData.humidity.value}%
                        </div>
                      </div>
                    )}
                    {weatherData.windSpeed && (
                      <div>
                        <div className="text-xs text-primary/60 font-mono mb-1">Wind Speed</div>
                        <div className="text-lg text-foreground font-mono">
                          {weatherData.windSpeed.value} {weatherData.windSpeed.unit || 'km/h'}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground font-mono">
                    No weather data available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-primary/20">
            <button
              onClick={() => {
                const url = `https://www.google.com/maps?q=${incident.latitude},${incident.longitude}`;
                window.open(url, '_blank');
              }}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-mono text-sm transition-colors"
            >
              View on Google Maps
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-primary/20 text-primary hover:bg-primary/5 rounded-md font-mono text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
