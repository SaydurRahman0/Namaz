const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/surahController');

router.get('/', getAll);

module.exports = router;
