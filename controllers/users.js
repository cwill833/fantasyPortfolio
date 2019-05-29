const User = require('../models/user');

module.exports = {
  index,
  new: newQuestions,
  create
};

function create(req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person =>{
    console.log(person)
    console.log(req.body)
    person.portfolio.push(req.body)
    person.save(()=>{
      res.render('users/showadd',{
        title: 'Portfolios',
        port: req.body,
        user: req.user,
        person
      })
    })
  })
}

function index(req, res, next) {
  let name = req.user.name
  User.findOne({name: name})
    .then(person=>{
      res.render('users/index', {
        title: 'Portfolios',
        user: req.user,
        person
      })
    });
}

function newQuestions(req, res){
  console.log(req.user)
  res.render('users/create', {
    user: req.user,
    title: 'Portfolios'
  })
}