const {Schema, model, default: mongoose} = require('mongoose');

module.exports = mongoose.model('Media', Schema({name:String}))