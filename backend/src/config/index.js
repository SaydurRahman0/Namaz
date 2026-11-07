require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  aladhanApiUrl: process.env.ALADHAN_API_URL || 'https://api.aladhan.com/v1',
  cacheTTL: {
    prayerTimes: parseInt(process.env.CACHE_TTL_PRAYER_TIMES, 10) || 3600,
    static: parseInt(process.env.CACHE_TTL_STATIC, 10) || 86400,
  },
};
