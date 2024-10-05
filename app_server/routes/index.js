const express = require('express');
const router = express.Router();

/* Locations pages */
router.get('/', (req, res) => {
  res.render('index', { currentPath: req.path });
});
router.get('/location', (req, res) => {
  res.render('location', { currentPath: req.path });
});
router.get('/location/review/new', (req, res) => {
  res.render('review-new', { currentPath: req.path });
});

/* Other pages */
router.get('/about', (req, res) => {
  res.render('about', { currentPath: req.path });
});

module.exports = router;