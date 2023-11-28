const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    require: true
  },
  duration: { 
    type: Number
  }
})

module.exports = mongoose.model('Song', songSchema);