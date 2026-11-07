const express = require('express');
const router = express.Router();

const prayerTimesRoutes = require('./prayerTimesRoutes');
const duaRoutes = require('./duaRoutes');
const surahRoutes = require('./surahRoutes');
const prayerGuideRoutes = require('./prayerGuideRoutes');
const locationRoutes = require('./locationRoutes');

router.use('/prayer-times', prayerTimesRoutes);
router.use('/location', locationRoutes);
router.use('/duas', duaRoutes);
router.use('/surahs', surahRoutes);
router.use('/prayer-guide', prayerGuideRoutes);

module.exports = router;
