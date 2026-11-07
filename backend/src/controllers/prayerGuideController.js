const ApiResponse = require('../utils/apiResponse');

// Placeholder — data will be added in Phase 04
const prayerGuides = [];

function getAll(req, res) {
  return ApiResponse.success(res, prayerGuides);
}

function getById(req, res) {
  const guide = prayerGuides.find(g => g.id === req.params.id);
  if (!guide) {
    return ApiResponse.notFound(res, 'Prayer guide not found');
  }
  return ApiResponse.success(res, guide);
}

module.exports = { getAll, getById };
