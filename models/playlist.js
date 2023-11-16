const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    }
  ]
})

module.exports = mongoose.model('Playlist', playlistSchema);