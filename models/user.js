const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stockSchema = new Schema({
  name: String,
  purPrice: Number,
  lastTrade: Number,
  volume: Number,
  investment: Number,
  date: {
    type: Date,
    default: new Date
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
  usedC: {
    type: Number,
    default: 0
  },
  stock: [stockSchema]
}, {
  timestamps: true
})

const userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    portfolio: [portfolioSchema]
},
{
  timestamps: true
});
  

module.exports = mongoose.model('User', userSchema);