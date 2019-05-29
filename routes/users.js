var express = require('express');
var router = express.Router();
var userCtr = require('../controllers/users')

/* GET users listing. */
router.get('/index', isLoggedIn, userCtr.index);

router.get('/new', isLoggedIn, userCtr.new)
router.get('/:id/stock/new', userCtr.stock)
router.get('/:id', isLoggedIn, userCtr.show)

router.post('/showadd', isLoggedIn, userCtr.create)
router.post('/:id', isLoggedIn, userCtr.addstock)

router.delete('/:id/stocks/:idx', isLoggedIn, userCtr.sDelete)

router.delete('/:id', isLoggedIn, userCtr.pDelete)




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}
module.exports = router;
