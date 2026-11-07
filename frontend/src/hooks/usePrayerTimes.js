import { useState, useEffect, useCallback, useRef } from 'react';
import { prayerTimesAPI } from '../services/api';

const memoryCache = new Map();

export function usePrayerTimes({ location, method = 1, school = 1, date = null }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const activeRequestRef = useRef(0);

  const fetchTimes = useCallback(
    async (force = false) => {
      if (!location || location.latitude === undefined || location.longitude === undefined) {
        setData(null);
        setIsLoading(false);
        setError(null);
        return;
      }

      const lat = parseFloat(location.latitude).toFixed(4);
      const lng = parseFloat(location.longitude).toFixed(4);
      const targetDate = date || '';
      const cacheKey = `${lat}:${lng}:${targetDate}:${method}:${school}`;

      if (!force && memoryCache.has(cacheKey)) {
        setData(memoryCache.get(cacheKey));
        setError(null);
        setIsLoading(false);
        return;
      }

      const requestId = ++activeRequestRef.current;
      setIsLoading(true);
      setError(null);

      try {
        const params = {
          latitude: location.latitude,
          longitude: location.longitude,
          method,
          school,
        };
        if (targetDate) {
          params.date = targetDate;
        }

        const response = await prayerTimesAPI.getTimes(params);

        // Discard if a newer request was dispatched in the meantime
        if (requestId !== activeRequestRef.current) return;

        if (response && response.data) {
          memoryCache.set(cacheKey, response.data);
          setData(response.data);
          setError(null);
        } else {
          throw new Error('Incomplete data received from server');
        }
      } catch (err) {
        if (requestId !== activeRequestRef.current) return;
        setError(err.message || 'Failed to fetch prayer times. Please check your connection.');
        setData(null);
      } finally {
        if (requestId === activeRequestRef.current) {
          setIsLoading(false);
        }
      }
    },
    [location, method, school, date]
  );

  useEffect(() => {
    fetchTimes();
  }, [fetchTimes]);

  const refetch = useCallback(() => {
    return fetchTimes(true);
  }, [fetchTimes]);

  return {
    data,
    timings: data?.timings || null,
    gregorianDate: data?.date?.gregorian || null,
    hijriDate: data?.date?.hijri || null,
    meta: data?.meta || null,
    isLoading,
    error,
    refetch,
  };
}

