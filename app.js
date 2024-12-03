require('./app_server/models/db'); // Ensure this is at the top to load models first
const apiRoutes = require('./app_api/routes/index');
const appRoutes = require('./app_server/routes/index'); 
const angularRoutes = require('./app_server/routes/angularRoutes');
// Add this line to include app routes
const passport = require('passport');

require('./app_api/config/passport'); 
var http = require('http');
var https = require('https');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'app_server', 'views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// Configure session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Log user information from session
app.use((req, res, next) => {
  if (req.session && req.session.user) {
    console.log('User information from session:', req.session.user);
  } else {
    console.log('No user information in session');
  }
  next();
});

// Use the API routes
app.use('/api', apiRoutes);

// Use the app routes
app.use('/', appRoutes);
//Angulat layout
app.use('/', angularRoutes);

// Serve Angular build files for /admin route
app.use('/admin', express.static(path.join(__dirname, 'public/dist/admin-panel/browser')));

// Fallback to index.html for Angular routes
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist/admin-panel/browser/index.html'));
});
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
var privateKey = fs.readFileSync('./sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(8000);
httpsServer.listen(443);
module.exports = app;
module.exports = app;