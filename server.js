var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config.js');

var app = express();

app.use(session({secret: 'Plz help me'}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: config.facebookID,
  clientSecret: config.facebookSecret,
  callbackURL: config.domain
}, function(token,refreshToken,profile,done) {
  return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',passport.authenticate('facebook', {
	successRedirect: '/',
	failureRedirect: '/login'
}), function(req, res) {
	console.log(req.session);
});
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req,res,next) {
  res.json(req.user);
});



app.listen(3000, function() {
  console.log('Here');
});
