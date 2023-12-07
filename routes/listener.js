const express      = require('express');
const router       = express.Router();
const Playlist     = require('../models/playlist');
const Song         = require('../models/song');

router.get('/', async(req, res) => {
  const songs = await Song.find();
  res.render('listeners/index2_listener', {songs: songs});
});

router.get('/index3_listener', async (req, res) => {
  try {

    const playlist = await Playlist.find();

    res.render('listeners/index3_listener', { playlist });
  } catch (error) {
    console.error('Error fetching playlist for index3_listener:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

module.exports = router;