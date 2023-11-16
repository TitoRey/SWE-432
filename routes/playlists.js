const express      = require('express');
const router       = express.Router();
const Playlist     = require('../models/playlist');
const Song         = require('../models/song');
const PlaylistSong = require('../models/playlistSong');

router.get('/', async (req, res) => { 
  const user = req.session.user._id;
  const playlists = await Playlist.find({user: user});
  res.render('playlists/index', { playlists: playlists});
});

// New Playlist
router.get('/new', (req, res) => { 
  res.render('playlists/new');
});

// Creating a Playlist
router.post('/', async (req, res) => {
  const playlist = new Playlist({
    title: req.body.title,
    description: req.body.description,
    user: req.session.user._id
  })
  try { 
    await playlist.save();
    res.status(201).redirect('/playlists');
  } catch (error) { 
    console.log(error);
    res.redirect('/playlists/new');
  }
});

router.get('/:id/add', async (req, res) => {
  const playlist = await Playlist.findById(req.params.id).populate('songs');
  const songs = await Song.find({_id: {$nin: playlist.songs.map(song => song._id) }})
  res.render('playlists/addSongs', { playlist: playlist, songs: songs});
})

router.get('/:id', async (req, res) => {
  const playlist = await Playlist.findById(req.params.id).populate('songs');
  const songs = playlist.songs;
  console.log(songs);
  res.render('playlists/show', { playlist: playlist, songs: songs});
})

router.post('/:playlistId/song/:songId', async (req, res) => {
  const playlistSong = new PlaylistSong({
    song: req.params.songId,
    playlist: req.params.playlistId
  })

  try {
    await playlistSong.save();
    res.status(201).redirect(`/playlists/${req.params.playlistId}/add`);
  } catch (error) {
    console.log(error);
    res.redirect('/users');
  }
})

router.get('/lookup', (req, res) => {
  res.render('playlists/lookup', { name: 'Tito'});
});

module.exports = router;