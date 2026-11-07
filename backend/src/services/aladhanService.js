const axios = require('axios');
const config = require('../config');
const cacheService = require('./cacheService');

const aladhanClient = axios.create({
  baseURL: config.aladhanApiUrl,
  timeout: 10000,
});

function buildCacheKey(prefix, params) {
  const parts = [prefix];
  const sortedKeys = Object.keys(params).sort();
  for (const key of sortedKeys) {
    parts.push(`${key}:${params[key]}`);
  }
  return parts.join(':');
}

function transformPrayerTimes(apiData) {
  const { timings, date, meta } = apiData;

  return {
    date: {
      gregorian: date.readable,
      hijri: `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`,
      hijriBn: `${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year} হিজরি`,
      weekday: date.gregorian.weekday.en,
    },
    prayers: {
      fajr: { name: 'Fajr', time: timings.Fajr.split(' ')[0] },
      sunrise: { name: 'Sunrise', time: timings.Sunrise.split(' ')[0] },
      dhuhr: { name: 'Dhuhr', time: timings.Dhuhr.split(' ')[0] },
      asr: { name: 'Asr', time: timings.Asr.split(' ')[0] },
      maghrib: { name: 'Maghrib', time: timings.Maghrib.split(' ')[0] },
      isha: { name: 'Isha', time: timings.Isha.split(' ')[0] },
    },
    meta: {
      method: {
        id: meta.method.id,
        name: meta.method.name,
      },
      school: meta.school,
      timezone: meta.timezone,
      latitude: meta.latitude,
      longitude: meta.longitude,
    },
  };
}

async function getTodayTimes(params) {
  const { latitude, longitude, method = 1, school = 1 } = params;

  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const cacheKey = buildCacheKey('prayer', {
    date: dateStr,
    lat: parseFloat(latitude).toFixed(4),
    lng: parseFloat(longitude).toFixed(4),
    method,
    school,
  });

  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const response = await aladhanClient.get(`/timings/${dateStr}`, {
    params: {
      latitude,
      longitude,
      method,
      school,
    },
  });

  const transformed = transformPrayerTimes(response.data.data);
  cacheService.set(cacheKey, transformed, config.cacheTTL.prayerTimes);

  return transformed;
}

async function getMonthlyTimes(params) {
  const { latitude, longitude, method = 1, school = 1, year, month } = params;

  const targetYear = year || new Date().getFullYear();
  const targetMonth = month || new Date().getMonth() + 1;

  const cacheKey = buildCacheKey('calendar', {
    year: targetYear,
    month: targetMonth,
    lat: parseFloat(latitude).toFixed(4),
    lng: parseFloat(longitude).toFixed(4),
    method,
    school,
  });

  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const response = await aladhanClient.get(`/calendar/${targetYear}/${targetMonth}`, {
    params: {
      latitude,
      longitude,
      method,
      school,
    },
  });

  const transformed = response.data.data.map(transformPrayerTimes);
  cacheService.set(cacheKey, transformed, config.cacheTTL.prayerTimes * 6);

  return transformed;
}

module.exports = {
  getTodayTimes,
  getMonthlyTimes,
};
