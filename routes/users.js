var express = require('express');
var router = express.Router();
var userCtr = require('../controllers/users')

/* GET users listing. */
router.get('/index', userCtr.index);

module.exports = router;
