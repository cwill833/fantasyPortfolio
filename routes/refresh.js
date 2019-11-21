const express = require('express');
const router = express.Router();
const userCtr = require('../controllers/users')

router.post('/', isLoggedIn, userCtr.refreash)

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router