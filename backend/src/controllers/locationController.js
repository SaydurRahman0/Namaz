const geocodingService = require('../services/geocodingService');
const ApiResponse = require('../utils/apiResponse');

async function searchCities(req, res, next) {
  try {
    const { query } = req.query;
    if (!query || query.trim().length < 2) {
      return ApiResponse.badRequest(res, 'Search query must be at least 2 characters long.');
    }
    const results = await geocodingService.searchCities(query);
    return ApiResponse.success(res, results, 'Cities searched successfully');
  } catch (err) {
    next(err);
  }
}

async function reverseGeocode(req, res, next) {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return ApiResponse.badRequest(res, 'Latitude and longitude are required for reverse geocoding.');
    }
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (isNaN(lat) || lat < -90 || lat > 90 || isNaN(lng) || lng < -180 || lng > 180) {
      return ApiResponse.badRequest(res, 'Invalid coordinates for reverse geocoding.');
    }

    const result = await geocodingService.reverseGeocode(lat, lng);
    return ApiResponse.success(res, result, 'Location resolved successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  searchCities,
  reverseGeocode,
};

