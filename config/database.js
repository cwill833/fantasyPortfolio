const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stocks', {useNewUrlParser: true})

const db = mongoose.connection

db.on('connected', ()=>{
    console.log('Connected to MongoDB')
    });