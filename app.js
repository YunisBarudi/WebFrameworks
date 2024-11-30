require('./app_server/models/db'); // Ensure this is at the top to load models first
const apiRoutes = require('./app_api/routes/index');
const appRoutes = require('./app_server/routes/index'); // Add this line to include app routes
const passport = require('passport');
require('./app_api/config/passport'); // Add this line to include passport configuration
var fs = require('fs');
var http = require('http');
var https = require('https');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Use the API routes
app.use('/api', apiRoutes);

// Use the app routes
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.status || 500).json({ error: err.message });
  } else {
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;