const express      = require('express');
const router       = express.Router();
const Song         = require('../models/song');

// Grabbing all Songs
router.get('/', async (req, res) => { 
  const songs = await Song.find();
  res.render('songs/index', { songs: songs});
});

// New Song Form
router.get('/new', (req, res) => { 
  res.render('songs/form');
});

// Creating a Song
router.post('/', async (req, res) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre
  })
  try { 
    await song.save();
    res.status(201).redirect('/songs');
  } catch (error) { 
    console.log(error);
    res.redirect('/songs/new');
  }
});

module.exports = router;