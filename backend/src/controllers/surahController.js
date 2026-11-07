const ApiResponse = require('../utils/apiResponse');

// Placeholder — data will be added in Phase 05
const surahs = [];

function getAll(req, res) {
  return ApiResponse.success(res, surahs);
}

module.exports = { getAll };
