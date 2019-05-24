var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Stock Picker APP',
    user: req.user
 });
 
});

//Make a rout for the auth
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));


// for success or fail
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users/index',
    failureRedirect : '/'
  }
));

//to log out
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
