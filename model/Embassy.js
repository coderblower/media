const {Schema, model, default: mongoose} = require('mongoose');

module.exports = mongoose.model('Media', Schema({title:String, address:String, phone:String, fax:String, website:String, name:String}))