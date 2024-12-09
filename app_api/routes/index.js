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
router
  .route('/games/club/:clubId')
  .get(ctrlFanclubs.gamesListByClub);

// Clubs
router
  .route('/clubs')
  .get(ctrlFanclubs.clubsList);

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
router
  .route('/news/club/:clubId')
  .get(ctrlFanclubs.newsListByClub);

// Fans
router
  .route('/fans')
  .post(ctrlFanclubs.fansCreate);

// Login
router
  .route('/login')
  .post(ctrlFanclubs.login);

// Logout
router
  .route('/logout')
  .get(ctrlFanclubs.logout);


module.exports = router;