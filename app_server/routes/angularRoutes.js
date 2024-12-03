const express = require('express');
const router = express.Router();

// Route to render layout-angular.pug
router.get('/admin', (req, res) => {
  res.render('layout-angular', { title: 'Admin Panel', user: req.user });
});

module.exports = router;