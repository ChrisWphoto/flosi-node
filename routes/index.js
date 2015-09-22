var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'flosi-api' });
});

var mongoose = require('mongoose');
var User = mongoose.model('User');

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
  console.log('posting' + req.body.username);

  user.save(function (err,user) {
    if(err)return next(err);
    res.json(user);
  });
});

//Has user been invited? Search for usernmae in friendName
router.put('/register', function (req,res,next) {
  console.log('register looking for: '+ req);
  User.findOne({friendName: req.body.username}, function (err, match) {
    if(err)return next(err);
    if(!match) return next(new Error("username does not exist in any friendName"));
    res.json(match);
  });
});


module.exports = router;
