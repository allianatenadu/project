const express = require('express');
const ServiceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/', ServiceController.getServices);

module.exports = router;