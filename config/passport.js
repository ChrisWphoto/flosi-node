// config/passport.js


// load all the things we need
//var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
// load up the user model
var User = mongoose.model('User');
//var User       = require('../models/Users');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use(new FacebookStrategy({

          // pull in our app id and secret from our auth.js file
          clientID        : configAuth.facebookAuth.clientID,
          clientSecret    : configAuth.facebookAuth.clientSecret,
          callbackURL     : configAuth.facebookAuth.callbackURL,
          profileFields: ['id', 'displayName', 'email', 'photos']
      },
        function(accessToken, refreshToken, profile, done) {
          console.log(profile.id, profile.displayName, profile.emails[0].value,
            profile.photos[0].value);
      User.findOne({ facebookId: profile.id }, function (err, user) {
        console.log("done");
        return done(err, user);
      });
    }
  ));

};
