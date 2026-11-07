const aladhanService = require('../services/aladhanService');
const ApiResponse = require('../utils/apiResponse');

async function getPrayerTimes(req, res, next) {
  try {
    const data = await aladhanService.getPrayerTimes(req.query);
    return ApiResponse.success(res, data, 'Prayer times fetched successfully');
  } catch (err) {
    next(err);
  }
}

async function getCalculationMethods(req, res, next) {
  try {
    const methods = await aladhanService.getCalculationMethods();
    return ApiResponse.success(res, methods, 'Calculation methods fetched successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPrayerTimes,
  getCalculationMethods,
};
