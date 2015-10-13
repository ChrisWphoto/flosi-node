var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'flosi-api' });
});

var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
//get all users
router.get('/users', function (req,res,next) {
  console.log('Getting all Users /users');
  User.find(function (err, users) {
    if(err) return next(err);
    res.json(users);

  });
});

//posting new users
router.post('/users', function (req,res,next) {
  var user = new User(req.body);
  console.log('posting /users ' + req.body.username);

  user.save(function (err,user) {
    if(err)return next(err);
    res.json(user);
  });
});

//send to facebook and request email + profile info
router.get('/auth/facebook', passport.authenticate('facebook',
  { scope : 'email,public_profile' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/users',
        failureRedirect : '/'
    }));

//Check if user was invited and send back match
//if no match save user name and email as new user
router.put('/register', function(req,res,next){
  User.findOne({friendName: req.body.username}, function (err, match) {
    if (err) {
      console.log('error ' + err);
      return next(err);
    }
    if (match){
      console.log('match ' + match);
       res.json(match);
     }
    else {saveUser(req.body, res);}
  });
});

//General method for saving a user object to mongo
var saveUser = function(userInfo, res){
    var user = new User(userInfo);
    user.save(function (err,user) {
      if(err) {
        console.log('error ' + err);
        return next(err);
      }
      console.log('Saving New User ' + user);
      res.json(user);
    });
};

//Plus 1 to users complted task
router.put('/taskCompleted', function (req,res,next) {
  console.log('upBoating a Task for ' + req.body.username);
  User.findOne({username: req.body.username}, function (err, match) {
    if(err){
      console.log('error in findOne upvote');
      return next(err);
    }
    if (match){
    match.complete(function(err, user) {
      console.log('calling complete: ' + user.taskCompleted);
      if (err){return next(err);}
      res.json(user);
    });
  } else {console.log('cannot upvote null')}
  });
});


module.exports = router;
