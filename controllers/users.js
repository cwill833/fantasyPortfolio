const User = require('../models/user');

module.exports = {
  index,
  new: newQuestions,
  create,
  show,
  stock,
  addstock,
  sDelete,
  pDelete,
  pEdit,
  save
};

function save(req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person=>{
    let port = person.portfolio.id(req.params.id)
    port.set(req.body)
    person.save(()=>{
      res.redirect(`/users/${req.params.id}`)
    })
  })
}

function pEdit(req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person=>{
    let port = person.portfolio.id(req.params.id)
    res.render('users/edit', {
      port,
      user: req.user,
      title: 'Portfolios'
    })
  })
}

function pDelete(req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person=>{
    person.portfolio.remove(req.params.id)
    person.save(()=>{
      res.redirect(`/users/index`)
    })
  })
}

function sDelete (req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person=>{
    let port = person.portfolio.id(req.params.id)
    port.stock.remove(req.params.idx)
    person.save(()=>{
      res.redirect(`/users/${port._id}`)
    })
  })
}

function addstock(req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person=>{
    let port = person.portfolio.id(req.params.id)
    port.stock.push(req.body)
    person.save(()=>{
      res.redirect(`/users/${port._id}`)
    })
  })
}

function stock(req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person=>{
    let port = person.portfolio.id(req.params.id)
    res.render('users/stock', {
      title: 'Portfolios',
      user: req.user,
      port
    })
  })
}

function show(req, res){
  let name = req.user.name
  //add request here
  User.findOne({name: name})
  .then(person=>{
    let port = person.portfolio.id(req.params.id)
    res.render('users/show', {
      title: 'Portfolios',
      user: req.user,
      port
    })
  })
}

function create(req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person =>{
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