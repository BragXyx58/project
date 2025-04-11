const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  denomination: String, 
  country: String,     
  year: Number,         
  material: String 
});

module.exports = mongoose.model('Coin', coinSchema);
