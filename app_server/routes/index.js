
const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/fanclubs.js');
const ctrlOthers = require('../controllers/others.js');
/* Locations pages */
router.get('/', ctrlLocations.fanClubHome);
router.get('/yourfanclub', ctrlLocations.currentFanClubInfo);
router.get('/yourfanclub/event', ctrlLocations.addReview);
/* Other pages */
router.get('/aboutus', ctrlOthers.about);
module.exports = router;