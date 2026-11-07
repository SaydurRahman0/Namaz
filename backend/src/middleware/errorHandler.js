const ApiResponse = require('../utils/apiResponse');

function errorHandler(err, req, res, _next) {
  console.error(`[Error] ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  if (err.name === 'ValidationError') {
    return ApiResponse.badRequest(res, err.message);
  }

  if (err.response) {
    // External API error (axios)
    const status = err.response.status || 502;
    const message = status === 429
      ? 'Too many requests to prayer times service. Please try again later.'
      : 'Unable to fetch prayer times. Please try again.';
    return ApiResponse.error(res, message, status);
  }

  if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
    return ApiResponse.error(res, 'Request timed out. Please try again.', 504);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return ApiResponse.error(res, message, statusCode);
}

module.exports = errorHandler;
