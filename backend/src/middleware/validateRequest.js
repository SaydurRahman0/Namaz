const ApiResponse = require('../utils/apiResponse');

function validatePrayerTimesQuery(req, res, next) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return ApiResponse.badRequest(res, 'Latitude and longitude are required.');
  }

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  if (isNaN(lat) || lat < -90 || lat > 90) {
    return ApiResponse.badRequest(res, 'Invalid latitude. Must be between -90 and 90.');
  }

  if (isNaN(lng) || lng < -180 || lng > 180) {
    return ApiResponse.badRequest(res, 'Invalid longitude. Must be between -180 and 180.');
  }

  if (req.query.method) {
    const method = parseInt(req.query.method, 10);
    if (isNaN(method) || method < 0 || method > 23) {
      return ApiResponse.badRequest(res, 'Invalid calculation method.');
    }
  }

  if (req.query.school) {
    const school = parseInt(req.query.school, 10);
    if (school !== 0 && school !== 1) {
      return ApiResponse.badRequest(res, 'Invalid school. Use 0 for Shafi\'i or 1 for Hanafi.');
    }
  }

  next();
}

module.exports = {
  validatePrayerTimesQuery,
};
