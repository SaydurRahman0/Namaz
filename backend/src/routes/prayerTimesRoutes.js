const express = require('express');
const router = express.Router();
const { getToday, getMonthly } = require('../controllers/prayerTimesController');
const { validatePrayerTimesQuery } = require('../middleware/validateRequest');

router.get('/today', validatePrayerTimesQuery, getToday);
router.get('/monthly', validatePrayerTimesQuery, getMonthly);

module.exports = router;
