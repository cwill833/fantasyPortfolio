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
  save,
  refreash
};

// get last trade for stock
function refreash(req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person=>{
    let port = person.portfolio.id(req.body.port)
    let found = port.stock.id(req.body.stock)
    request(stockAPI + found.name + `&apikey=` + k, (err, responce, body)=>{
      let data = JSON.parse(body)
      found.lastTrade = data["Global Quote"]["05. price"]
      person.save(()=>{
        res.redirect(`/users/${port._id}`)
      })
    })
  })
}

// saves portfolio to db
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

// edit currently selected portfolio
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

// delete portfolio
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
// delete stock and does math to determine how much capital to put back
function sDelete (req, res){
  let name = req.user.name
  User.findOne({name: name})
  .then(person=>{
    let port = person.portfolio.id(req.params.id)
    let found = port.stock.id(req.params.idx)
    let math = (parseFloat((found.purPrice * Math.floor(found.investment / found.purPrice)).toFixed(2)) + parseFloat(((found.lastTrade - found.purPrice) *  Math.floor(found.investment / found.purPrice)).toFixed(2))).toFixed(2) 
    port.usedC -= math
    port.stock.remove(req.params.idx)
    person.save(()=>{
      res.redirect(`/users/${port._id}`)
    })
  })
}

// searches stock in API request then creates new stock and subtracts initial investment from money pool
function addstock(req, res){
  let name = req.user.name
  request(stockAPI + req.body.name + `&apikey=` + k, (err, responce, body)=>{
    const sData = JSON.parse(body)
    req.body.name = sData['Global Quote']['01. symbol']
    req.body.purPrice = sData['Global Quote']['05. price']
    req.body.lastTrade = sData['Global Quote']['05. price']
    req.body.volume = sData['Global Quote']['06. volume']
    const amountSpent = parseFloat(req.body.purPrice * Math.floor(req.body.investment / req.body.purPrice).toFixed(2))
    req.body.investment = amountSpent
    User.findOne({name: name})
    .then(person=>{
      let port = person.portfolio.id(req.params.id)
      port.stock.push(req.body)
      port.usedC += amountSpent
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

// brings up stock purchase form
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

// brings up to the selected porfolio
function show(req, res){
  let name = req.user.name
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

// creates a new portfolio
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

// landing page once you log in
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

// brings up questions page to create a portfolio
function newQuestions(req, res){
  res.render('users/create', {
    user: req.user,
    title: 'Portfolios'
  })
}