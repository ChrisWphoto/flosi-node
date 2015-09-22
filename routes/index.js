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
    //console.log('get request users: ' + users);
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
  console.log('register looking for: '+ req.body.username);
  User.findOne({friendName: req.body.username}, function (err, match) {
    if(err){
      console.log('error in findOne');
      return next(err);
    }
    if(!match) {
      console.log('no match found in register route');
      return next(new Error("username does not exist in any friendName"));
    }
    console.log('sending something '+ match.username);
    res.json(match);

  });
});


module.exports = router;
