const mongoose = require('mongoose');

const playlistSongSchema = new mongoose.Schema({
  song: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true
  },
  playlist: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Playlist',
    required: true
  }
})

module.exports = mongoose.model('PlaylistSong', playlistSongSchema);