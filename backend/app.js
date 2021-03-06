var express = require('express');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var configDB = require('./config/database.js');

var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'MFQSMsgeL2uLZxD-UyUSVxdA' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// this should change place where express is looking for index.ejs etc.
var _dirname="../frontend/app";
var path = require("path");
app.set('views', path.join( _dirname,'/views')); 
// and this ... fixed bower components loading
app.use(express.static("../frontend" + '/app'));
app.use('/bower_components',  express.static("../frontend/app" + '/bower_components'));

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The listening on port ' + port);