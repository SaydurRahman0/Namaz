import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

/**
 * Centralized Axios instance configured with configurable base URL and timeout.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Centralized response and error interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Unable to connect to the server. Please check your connection.';
    return Promise.reject(new Error(message));
  }
);

/**
 * System and Health API endpoints
 */
export const systemAPI = {
  checkHealth: () => api.get('/health'),
};

/**
 * Prayer Times API endpoints
 */
export const prayerTimesAPI = {
  getTimes: (params) => api.get('/prayer-times', { params }),
  getToday: (params) => api.get('/prayer-times/today', { params }),
  getMethods: () => api.get('/prayer-times/methods'),
};

/**
 * Location and Geocoding API endpoints
 */
export const locationAPI = {
  search: (query) => api.get('/location/search', { params: { query } }),
  reverse: (latitude, longitude) =>
    api.get('/location/reverse', { params: { latitude, longitude } }),
};

/**
 * Dua Library API endpoints
 */
export const duaAPI = {
  getAll: (params) => api.get('/duas', { params }),
  getById: (id) => api.get(`/duas/${id}`),
};

/**
 * Surah API endpoints
 */
export const surahAPI = {
  getAll: () => api.get('/surahs'),
};

/**
 * Prayer Guide API endpoints
 */
export const prayerGuideAPI = {
  getAll: () => api.get('/prayer-guide'),
  getById: (id) => api.get(`/prayer-guide/${id}`),
};

export default api;
