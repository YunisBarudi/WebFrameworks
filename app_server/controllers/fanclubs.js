const axios = require('axios');
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://your-production-url.com';
};

const _renderHomepage = function(req, res, games, clubs) {
  res.render('fanclub-home', {
    title: 'FanClub Connects',
    games: games,
    clubs: clubs || [],
    user: req.user // Pass the user to the layout
  });
};

const fanClubHome = function(req, res) {
  const gamesUrl = `${apiOptions.server}/api/games`;
  const clubsUrl = `${apiOptions.server}/api/clubs`;

  Promise.all([axios.get(gamesUrl), axios.get(clubsUrl)])
    .then(([gamesResponse, clubsResponse]) => {
      _renderHomepage(req, res, gamesResponse.data, clubsResponse.data);
    })
    .catch(error => {
      console.error(error);
      res.render('error', {
        message: 'Error fetching data',
        error
      });
    });
};

const _renderEventsPage = function(req, res, futureGames, news) {
  res.render('fanclub-events', {
    title: 'Your Fanclub Information',
    futureGames,
    news,
    user: req.user // Pass the user to the layout
  });
};

const currentFanClubInfo = function(req, res) {
  const clubId = req.session.user.club;
  const gamesUrl = `${apiOptions.server}/api/games/club/${clubId}`;
  const newsUrl = `${apiOptions.server}/api/news/club/${clubId}`;

  Promise.all([axios.get(gamesUrl), axios.get(newsUrl)])
    .then(([gamesResponse, newsResponse]) => {
      _renderEventsPage(req, res, gamesResponse.data, newsResponse.data);
    })
    .catch(error => {
      console.error(error);
      res.render('error', {
        message: 'Error fetching data',
        error
      });
    });
};

const addReview = function(req, res) {
  res.render('fanclub-review-form', { title: 'Add review', user: req.user }); // Pass the user to the layout
};

module.exports = {
  fanClubHome,
  currentFanClubInfo,
  addReview
};