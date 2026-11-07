import { createContext, useContext, useState, useCallback } from 'react';
import { DEFAULT_METHOD, DEFAULT_SCHOOL } from '../utils/constants';
import { locationAPI } from '../services/api';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  // Read saved location from localStorage. If none, null so user is prompted.
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('prayerLocation');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [method, setMethod] = useState(() => {
    try {
      const saved = localStorage.getItem('calculationMethod');
      return saved ? parseInt(saved, 10) : DEFAULT_METHOD;
    } catch {
      return DEFAULT_METHOD;
    }
  });

  const [school, setSchool] = useState(() => {
    try {
      const saved = localStorage.getItem('asrSchool');
      return saved ? parseInt(saved, 10) : DEFAULT_SCHOOL;
    } catch {
      return DEFAULT_SCHOOL;
    }
  });

  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionError, setDetectionError] = useState(null);

  // Manual location selection
  const selectLocation = useCallback((newLocation) => {
    if (!newLocation || newLocation.latitude === undefined || newLocation.longitude === undefined) {
      return;
    }

    const sanitized = {
      city: newLocation.city || 'Custom Location',
      country: newLocation.country || '',
      displayName: newLocation.displayName || newLocation.city || 'Custom Location',
      latitude: parseFloat(newLocation.latitude),
      longitude: parseFloat(newLocation.longitude),
      timezone: newLocation.timezone || '',
    };

    setLocation(sanitized);
    setDetectionError(null);
    try {
      localStorage.setItem('prayerLocation', JSON.stringify(sanitized));
    } catch (e) {
      console.warn('Could not persist prayerLocation to localStorage:', e);
    }
  }, []);

  // Automatic browser geolocation detection
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setDetectionError('Geolocation is not supported by your browser. Please search for your city manually.');
      return Promise.reject(new Error('Geolocation not supported'));
    }

    setIsDetecting(true);
    setDetectionError(null);

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocode via backend to get accurate city & country name
            const response = await locationAPI.reverse(latitude, longitude);
            const resolvedData = response.data || {};

            const detectedLocation = {
              city: resolvedData.city || 'Detected Location',
              country: resolvedData.country || '',
              displayName: resolvedData.displayName || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
              latitude,
              longitude,
            };

            selectLocation(detectedLocation);
            setIsDetecting(false);
            resolve(detectedLocation);
          } catch {
            // Fallback to raw coordinates if reverse geocoding is unavailable
            const fallbackLocation = {
              city: 'Detected Coordinates',
              country: '',
              displayName: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
              latitude,
              longitude,
            };
            selectLocation(fallbackLocation);
            setIsDetecting(false);
            resolve(fallbackLocation);
          }
        },
        (error) => {
          setIsDetecting(false);
          let message = 'Unable to retrieve your location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location permission was denied. Please allow location access in your browser or search for your city manually.';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information is currently unavailable from your device. Please search manually.';
              break;
            case error.TIMEOUT:
              message = 'Location detection request timed out. Please try again or search manually.';
              break;
            default:
              message = error.message || 'An unknown error occurred while detecting location.';
          }
          setDetectionError(message);
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  }, [selectLocation]);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setDetectionError(null);
    try {
      localStorage.removeItem('prayerLocation');
    } catch (e) {
      console.warn('Could not remove prayerLocation from localStorage:', e);
    }
  }, []);

  const updateMethod = useCallback((newMethod) => {
    const val = parseInt(newMethod, 10);
    setMethod(val);
    try {
      localStorage.setItem('calculationMethod', String(val));
    } catch (e) {
      console.warn('Could not persist calculationMethod:', e);
    }
  }, []);

  const updateSchool = useCallback((newSchool) => {
    const val = parseInt(newSchool, 10);
    setSchool(val);
    try {
      localStorage.setItem('asrSchool', String(val));
    } catch (e) {
      console.warn('Could not persist asrSchool:', e);
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        hasLocation: Boolean(location && location.latitude !== undefined && location.longitude !== undefined),
        method,
        school,
        isDetecting,
        detectionError,
        detectLocation,
        selectLocation,
        clearLocation,
        updateMethod,
        updateSchool,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
