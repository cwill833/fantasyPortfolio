const User = require('../models/user');

module.exports = {
  index,
  new: newQuestions
};

function index(req, res, next) {
    console.log(req.user)
    res.render('users/index', {
        title: 'Portfolios',
        user: req.user
    });
}

function newQuestions(req, res){
  console.log(req.user)
  res.render('users/create', {
    user: req.user,
    title: 'Portfolios'
  })
}