const mongoose = require('mongoose')
const Portfolio = require('./portfolio')


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    portfolio: [Portfolio]
},
{
  timestamps: true
});
  

module.exports = mongoose.model('User', userSchema);