const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Fan = mongoose.model('Fan');
const { comparePassword } = require('../utils/passwordUtils');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    console.log('Passport strategy called');
    const fan = await Fan.findOne({ email });
    if (!fan) {
      console.log('Incorrect email');
      return done(null, false, { message: 'Incorrect email.' });
    }
    const isMatch = await comparePassword(password, fan.password);
    if (!isMatch) {
      console.log('Incorrect password');
      return done(null, false, { message: 'Incorrect password.' });
    }
    console.log('Authentication successful');
    return done(null, fan);
  } catch (err) {
    console.log('Error in passport strategy:', err);
    return done(err);
  }
}));

passport.serializeUser((fan, done) => {
  done(null, fan.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const fan = await Fan.findById(id);
    done(null, fan);
  } catch (err) {
    done(err);
  }
});