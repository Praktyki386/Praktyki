var express = require('express');
var session = require('express-session');
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
	clientID: '573206371038-nctb938nlkjqtqf1ou30ord5grc01r8h.apps.googleusercontent.com',
	clientSecret: 'V9HjVx1GmB6OheN1EfJ7s8Fe',
	callbackURL: "http://localhost:3000/auth/google/callback"
}, function(accessToken, refreshToken, profile, done) {
	return done(null, {
		id: profile.id,
		username: profile.displayName,
		photo: profile.photos.length ? profile.photos[0].value : null
	});
}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

app.use(session({
	secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());



app.get('/auth/google',
	passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.login']
	}));

app.get('/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login'
	}), function(req, res) {
		res.redirect('/');
	});


app.get('/', function(req, res) {
	var session = req.session;
	var username = 'unknown user, please <a href="/auth/google">login</a>';
	if (session.passport && session.passport.user && session.passport.user.username) {
		username = session.passport.user.username;
	}
	res.send('Hello ' + username + '. ' + '<a href="/user">Click here for json</a>');
});

app.get('/user', function(req, res) {
	var session = req.session;
	var user = null;
	if (session.passport && session.passport.user) {
		user = session.passport.user;
	}
	res.send({
		user: user
	});
});


app.listen(3000);
