const express = require('express');
const router = express.Router();
const ctrlFanclubs = require('../controllers/fanclubs.js');
const ctrlOthers = require('../controllers/others.js');

/* Locations pages */
router.get('/', ctrlFanclubs.fanClubHome);
router.get('/yourfanclub', ctrlFanclubs.currentFanClubInfo);
router.get('/yourfanclub/event', ctrlFanclubs.addReview);

/* Other pages */
router.get('/aboutus', ctrlOthers.about);

module.exports = router;