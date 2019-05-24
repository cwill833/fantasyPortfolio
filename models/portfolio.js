const mongoose = require('mongoose')


var portfolioSchema = new mongoose.Schema({
    name: String,
    stock: String,
    closePrice: Number
}, {
    timestamps: true
})