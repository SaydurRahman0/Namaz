import { createContext, useContext, useState } from 'react';
import { DEFAULT_LOCATION, DEFAULT_METHOD, DEFAULT_SCHOOL } from '../utils/constants';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('prayerLocation');
    return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
  });

  const [method, setMethod] = useState(() => {
    const saved = localStorage.getItem('calculationMethod');
    return saved ? parseInt(saved, 10) : DEFAULT_METHOD;
  });

  const [school, setSchool] = useState(() => {
    const saved = localStorage.getItem('asrSchool');
    return saved ? parseInt(saved, 10) : DEFAULT_SCHOOL;
  });

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('prayerLocation', JSON.stringify(newLocation));
  };

  const updateMethod = (newMethod) => {
    setMethod(newMethod);
    localStorage.setItem('calculationMethod', String(newMethod));
  };

  const updateSchool = (newSchool) => {
    setSchool(newSchool);
    localStorage.setItem('asrSchool', String(newSchool));
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        method,
        school,
        updateLocation,
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
