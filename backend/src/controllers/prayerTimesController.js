const aladhanService = require('../services/aladhanService');
const ApiResponse = require('../utils/apiResponse');

async function getToday(req, res, next) {
  try {
    const data = await aladhanService.getTodayTimes(req.query);
    return ApiResponse.success(res, data, 'Prayer times fetched successfully');
  } catch (err) {
    next(err);
  }
}

async function getMonthly(req, res, next) {
  try {
    const data = await aladhanService.getMonthlyTimes(req.query);
    return ApiResponse.success(res, data, 'Monthly prayer times fetched successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { getToday, getMonthly };
