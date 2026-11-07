const axios = require('axios');
const cacheService = require('./cacheService');
const config = require('../config');

const geocodingClient = axios.create({
  timeout: 8000,
  headers: {
    'User-Agent': 'IslamicPrayerGuide/1.0 (educational prayer timetable companion)',
    'Accept': 'application/json',
  },
});

async function searchCities(query) {
  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    return [];
  }

  const cleanQuery = query.trim().toLowerCase();
  const cacheKey = `geo:search:${cleanQuery}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      cleanQuery
    )}&format=json&limit=6&addressdetails=1&accept-language=en`;

    const response = await geocodingClient.get(url);
    const results = (response.data || []).map((item) => {
      const address = item.address || {};
      const city =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.state_district ||
        address.state ||
        item.display_name.split(',')[0].trim();
      const country = address.country || '';

      return {
        id: item.place_id ? String(item.place_id) : `${item.lat},${item.lon}`,
        city,
        country,
        displayName: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      };
    });

    cacheService.set(cacheKey, results, config.cacheTTL.static);
    return results;
  } catch (err) {
    // If external geocoding service is unavailable or rate limited, gracefully handle
    return [];
  }
}

async function reverseGeocode(latitude, longitude) {
  const latNum = parseFloat(latitude);
  const lngNum = parseFloat(longitude);

  const cacheKey = `geo:reverse:${latNum.toFixed(3)}:${lngNum.toFixed(3)}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latNum}&lon=${lngNum}&format=json&accept-language=en`;
    const response = await geocodingClient.get(url);
    const item = response.data || {};
    const address = item.address || {};

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.state_district ||
      address.state ||
      'Current Location';
    const country = address.country || '';

    const result = {
      city,
      country,
      displayName: item.display_name || `${city}, ${country}`.trim(),
      latitude: latNum,
      longitude: lngNum,
    };

    cacheService.set(cacheKey, result, config.cacheTTL.static);
    return result;
  } catch (err) {
    return {
      city: 'Detected Location',
      country: '',
      displayName: `${latNum.toFixed(4)}, ${lngNum.toFixed(4)}`,
      latitude: latNum,
      longitude: lngNum,
    };
  }
}

module.exports = {
  searchCities,
  reverseGeocode,
};

