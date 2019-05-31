const mongoose = require('mongoose')
// const Portfolio = require('./portfolio')
const Schema = mongoose.Schema

const stockSchema = new Schema({
  name: String,
  oPrice: Number,
  yClose: Number,
  volume: Number,
  date: {
    type: Date,
    default: Date.now
},
}, {
  timestamps: true
})

const portfolioSchema = new Schema({
  name: String,
  date: {
      type: Date,
      default: Date.now
  },
  risk: {
    type: String,
    enum: ['High', 'Low']
  },
  timeF: {
    type: String,
    enum: ['Short', 'Long']
  },
  inv: {
    type: Number,
    default: 0,
  },
  stock: [stockSchema]
}, {
  timestamps: true
})

var userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    portfolio: [portfolioSchema]
},
{
  timestamps: true
});
  

module.exports = mongoose.model('User', userSchema);