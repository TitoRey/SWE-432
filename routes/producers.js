const express      = require('express');
const router       = express.Router();
const User         = require('../models/user');
const Playlist     = require('../models/playlist');
const Song         = require('../models/song');
const PlaylistSong = require('../models/playlistSong');

router.get('/', async (req, res) => {
  const djs = await User.find(); // query for dj role
  res.render('producers/index1_producer', { djs });
});

router.get('/index2_producer', async (req, res) => {
  try {
    const songs = await Song.find();
    res.render('producers/index2_producer', { songs });
  } catch (error) {
    console.error('Error fetching songs list:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

router.get('/index3_producer', async (req, res) => {
  try {

    const playlist = await Playlist.find();

    res.render('producers/index3_producer', { playlist });
  } catch (error) {
    console.error('Error fetching playlist for index3:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

module.exports = router;