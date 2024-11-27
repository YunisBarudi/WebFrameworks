const express = require('express');
const router = express.Router();
const ctrlFanclubs = require('../controllers/fanclubs');

// Games
router
  .route('/games')
  .get(ctrlFanclubs.gamesList)
  .post(ctrlFanclubs.gamesCreate);

router
  .route('/games/:gameid')
  .get(ctrlFanclubs.gamesReadOne)
  .put(ctrlFanclubs.gamesUpdateOne)
  .delete(ctrlFanclubs.gamesDeleteOne);

// Club News
router
  .route('/news')
  .get(ctrlFanclubs.newsList)
  .post(ctrlFanclubs.newsCreate);

router
  .route('/news/:newsid')
  .get(ctrlFanclubs.newsReadOne)
  .put(ctrlFanclubs.newsUpdateOne)
  .delete(ctrlFanclubs.newsDeleteOne);

module.exports = router;