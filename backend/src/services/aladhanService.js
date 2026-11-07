const axios = require('axios');
const config = require('../config');
const cacheService = require('./cacheService');
const { normalizeToDmy, dmyToIso } = require('../utils/dateHelper');

const aladhanClient = axios.create({
  baseURL: config.aladhanApiUrl,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

function buildCacheKey(prefix, params) {
  const parts = [prefix];
  const sortedKeys = Object.keys(params).sort();
  for (const key of sortedKeys) {
    parts.push(`${key}:${params[key]}`);
  }
  return parts.join(':');
}

function cleanTime(timeStr) {
  if (!timeStr) return '';
  // e.g. "04:50 (BST)" or "04:50" -> "04:50"
  return timeStr.split(' ')[0].trim();
}

function normalizePrayerResponse(apiData) {
  const { timings, date, meta } = apiData;

  const hijriMonthEn = date.hijri?.month?.en || '';
  const hijriMonthAr = date.hijri?.month?.ar || '';
  const hijriDay = date.hijri?.day || '';
  const hijriYear = date.hijri?.year || '';
  const hijriDesignation = date.hijri?.designation?.abbreviated || 'AH';

  const gregorianReadable = date.readable || '';
  const gregorianIso = date.gregorian?.date ? dmyToIso(date.gregorian.date) : '';

  return {
    date: {
      gregorian: {
        date: gregorianIso,
        readable: gregorianReadable,
        day: date.gregorian?.day || '',
        month: date.gregorian?.month?.en || '',
        year: date.gregorian?.year || '',
        weekday: date.gregorian?.weekday?.en || '',
      },
      hijri: {
        date: date.hijri?.date || '',
        day: String(hijriDay),
        year: String(hijriYear),
        month: {
          en: hijriMonthEn,
          ar: hijriMonthAr,
          number: date.hijri?.month?.number || 1,
        },
        formatted: `${hijriDay} ${hijriMonthEn} ${hijriYear} ${hijriDesignation}`.trim(),
        formattedAr: `${hijriDay} ${hijriMonthAr} ${hijriYear} هـ`.trim(),
      },
    },
    timings: {
      fajr: cleanTime(timings.Fajr),
      sunrise: cleanTime(timings.Sunrise),
      dhuhr: cleanTime(timings.Dhuhr),
      asr: cleanTime(timings.Asr),
      maghrib: cleanTime(timings.Maghrib),
      isha: cleanTime(timings.Isha),
    },
    meta: {
      latitude: meta.latitude,
      longitude: meta.longitude,
      timezone: meta.timezone,
      method: {
        id: meta.method?.id ?? 1,
        name: meta.method?.name || 'University of Islamic Sciences, Karachi',
      },
      school: {
        id: meta.school === 'HANAFI' ? 1 : 0,
        name: meta.school === 'HANAFI' ? 'Hanafi' : 'Shafi\'i',
      },
    },
  };
}

async function getPrayerTimes(params) {
  const { latitude, longitude, date, method = 1, school = 1 } = params;

  const latNum = parseFloat(latitude);
  const lngNum = parseFloat(longitude);
  const methodNum = parseInt(method, 10) || 1;
  const schoolNum = parseInt(school, 10) === 0 ? 0 : 1;

  const dmyDate = normalizeToDmy(date);

  const cacheKey = buildCacheKey('prayer', {
    date: dmyDate,
    lat: latNum.toFixed(4),
    lng: lngNum.toFixed(4),
    method: methodNum,
    school: schoolNum,
  });

  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await aladhanClient.get(`/timings/${dmyDate}`, {
      params: {
        latitude: latNum,
        longitude: lngNum,
        method: methodNum,
        school: schoolNum,
      },
    });

    if (!response.data || !response.data.data) {
      throw new Error('Invalid response structure received from AlAdhan API');
    }

    const normalized = normalizePrayerResponse(response.data.data);
    cacheService.set(cacheKey, normalized, config.cacheTTL.prayerTimes);
    return normalized;
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      const apiMsg = err.response.data?.data || err.response.data?.message || err.message;
      const error = new Error(`AlAdhan API error (${status}): ${apiMsg}`);
      error.statusCode = status >= 400 && status < 500 ? status : 502;
      throw error;
    } else if (err.code === 'ECONNABORTED') {
      const error = new Error('AlAdhan API request timed out. Please try again.');
      error.statusCode = 504;
      throw error;
    }
    throw err;
  }
}

async function getCalculationMethods() {
  const cacheKey = 'methods:all';
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await aladhanClient.get('/methods');
    const rawMethods = response.data?.data || {};

    const methodsList = Object.entries(rawMethods).map(([key, item]) => ({
      id: item.id,
      code: key,
      name: item.name,
      params: item.params,
    })).sort((a, b) => a.id - b.id);

    cacheService.set(cacheKey, methodsList, config.cacheTTL.static);
    return methodsList;
  } catch (err) {
    // Return verified fallback methods list if network fails temporarily
    const fallbackMethods = [
      { id: 1, code: 'KARACHI', name: 'University of Islamic Sciences, Karachi' },
      { id: 2, code: 'ISNA', name: 'Islamic Society of North America (ISNA)' },
      { id: 3, code: 'MWL', name: 'Muslim World League' },
      { id: 4, code: 'MAKKAH', name: 'Umm Al-Qura University, Makkah' },
      { id: 5, code: 'EGYPT', name: 'Egyptian General Authority of Survey' },
      { id: 7, code: 'TEHRAN', name: 'Institute of Geophysics, University of Tehran' },
      { id: 8, code: 'GULF', name: 'Gulf Region' },
      { id: 9, code: 'KUWAIT', name: 'Kuwait' },
      { id: 10, code: 'QATAR', name: 'Qatar' },
      { id: 11, code: 'SINGAPORE', name: 'Majlis Ugama Islam Singapura, Singapore' },
      { id: 12, code: 'FRANCE', name: 'Union Des Organisations Islamiques De France' },
      { id: 13, code: 'TURKEY', name: 'Diyanet İşleri Başkanlığı, Turkey' },
      { id: 14, code: 'RUSSIA', name: 'Spiritual Administration of Muslims of Russia' },
      { id: 15, code: 'MOONSIGHTING', name: 'Moonsighting Committee Worldwide' },
    ];
    return fallbackMethods;
  }
}

module.exports = {
  getPrayerTimes,
  getCalculationMethods,
};
