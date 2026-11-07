const express = require('express');
const router = express.Router();
const { getPrayerTimes, getCalculationMethods } = require('../controllers/prayerTimesController');
const { validatePrayerTimesQuery } = require('../middleware/validateRequest');

// Methods list must come before parameterized or catch-all routes
router.get('/methods', getCalculationMethods);

// Main timetable endpoint: GET /api/prayer-times
router.get('/', validatePrayerTimesQuery, getPrayerTimes);

// Backward-compatible endpoint: GET /api/prayer-times/today
router.get('/today', validatePrayerTimesQuery, getPrayerTimes);

module.exports = router;
