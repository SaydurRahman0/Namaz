const express = require('express');
const router = express.Router();
const { searchCities, reverseGeocode } = require('../controllers/locationController');

router.get('/search', searchCities);
router.get('/reverse', reverseGeocode);

module.exports = router;

