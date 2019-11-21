const User = require('../models/user');
const request = require('request')
const stockAPI = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='
const k = process.env.ALPHA_TOKEN

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
    let found = port.stock.id(req.params.idx)
    port.usedC -= parseInt(found.investment)
    port.stock.remove(req.params.idx)
    person.save(()=>{
      res.redirect(`/users/${port._id}`)
    })
  })
}

function addstock(req, res){
  let name = req.user.name
  
  request(stockAPI + req.body.name + `&apikey=` + k, (err, responce, body)=>{
    const sData = JSON.parse(body)
    const symbol = sData['Global Quote']['01. symbol']
    const open = sData['Global Quote']['02. open']
    const yestClose = sData['Global Quote']['08. previous close']
    const vol = sData['Global Quote']['06. volume']
    User.findOne({name: name})
    .then(person=>{
      let port = person.portfolio.id(req.params.id)
      port.stock.push(req.body)
      let lastStock = port.stock[port.stock.length - 1]
      port.usedC += parseInt(req.body.investment)
      lastStock.name = symbol
      lastStock.oPrice = open
      lastStock.yClose = yestClose
      lastStock.volume = vol
      person.save(()=>{
        res.render(`users/show`, {
          title: 'Portfolios',
          user: req.user,
          port
        })
      })
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
  User.findOne({name: name})
  .then(person=>{
    let port = person.portfolio.id(req.params.id)
    res.render('users/show', {
      title: 'Portfolios',
      user: req.user,
      port,
      sData: false
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
        title: 'portfolios',
        user: req.user,
        person
      })
    });
}

function newQuestions(req, res){
  res.render('users/create', {
    user: req.user,
    title: 'Portfolios'
  })
}

