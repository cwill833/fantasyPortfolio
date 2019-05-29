// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const stockSchema = new Schema({
//     name: String,
//     oPrice: Number,
//     yClose: Number,
//     volume: Number
// }, {
//     timestamps: true
// })

// const portfolioSchema = new Schema({
//     name: String,
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     risk: String,
//     timeF: String,
//     inv: Number,
//     stock: [stockSchema]
// }, {
//     timestamps: true
// })

// module.exports = mongoose.model('Portfolio', portfolioSchema);