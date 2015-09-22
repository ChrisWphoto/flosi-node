var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'flosi-api' });
});

var mongoose = require('mongoose');
var User = mongoose.model('User');

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

//Check if user was invited and send back match
//if no match save user name and email as new user
//@needs work
router.put('/register', function(req,res,next){
  User.findOne({friendName: req.body.username}, function (err, match) {
    if (err) return next(err);
    if (match) res.json(match);
    else {
      var user = new User(req.body);
      user.save(function (err,user) {
        if(err) return next(err);
        res.json(user);
      });
    }
  });
});

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
