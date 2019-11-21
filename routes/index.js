const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Fantasy Portfolio APP',
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
