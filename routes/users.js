var express = require('express');
var router = express.Router();
var userCtr = require('../controllers/users')

/* GET users listing. */
router.get('/index', isLoggedIn, userCtr.index);

router.get('/new', isLoggedIn, userCtr.new)

router.post('/showadd', isLoggedIn, userCtr.create)





function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}
module.exports = router;
