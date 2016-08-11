var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Is it working?');
});

app.listen(3000, function () {
  console.log('Express app listening on port 3000!');
});




var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: '573206371038-nctb938nlkjqtqf1ou30ord5grc01r8h.apps.googleusercontent.com',
    clientSecret: 'V9HjVx1GmB6OheN1EfJ7s8Fe',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
  }
));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
