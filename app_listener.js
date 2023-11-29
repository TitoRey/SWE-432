const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname);

// I create the Song db
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  duration: Number,
  genre: String
});
const Song = mongoose.model('Song', songSchema);

// I create the listener db
const listenerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String
});
const listener = mongoose.model('listener', listenerSchema);

// I create the Playlist db
const playlistSchema = new mongoose.Schema({
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
  title: String,
  duration: Number,
  artist: String
});

const Playlist = mongoose.model('Playlist', playlistSchema);

mongoose.connect('mongodb://127.0.0.1:27017/iteration5', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('MongoDB connected successfully');
    const songsCount = await Song.countDocuments();
    const listenersCount = await listener.countDocuments();

    if (songsCount === 0 && listenersCount === 0) {

      return Promise.all([
        Song.insertMany([
            { title: 'Techno Vibes', artist: 'Mandragora', duration: 2.5, genre: 'Psychedelic Techno' },
            { title: 'Rhythmic Resonance', artist: 'Trym', duration: 2.0, genre: 'Industrial Techno' },
            { title: 'Synthetic Serenity', artist: 'Nina Kraviz', duration: 2.3, genre: 'Minimal Techno' },
            { title: 'Electronic Euphoria', artist: 'Charlotte de Witte', duration: 2.1, genre: 'Dark Techno' },
            { title: 'Bass Beat', artist: 'Adam Beyer', duration: 1.8, genre: 'Drumcode Techno' },
            { title: 'Pulsating Patterns', artist: 'Amelie Lens', duration: 2.2, genre: 'Melodic Techno' },
            { title: 'Industrial Intensity', artist: 'Chris Liebing', duration: 2.4, genre: 'Hard Techno' },
            { title: 'Techno Trance', artist: 'Beat Bouncer', duration: 2.2, genre: 'Trance Techno' },
            { title: 'Techno Groove', artist: 'Joseph Capriati', duration: 2.3, genre: 'Funky Techno' },
            { title: 'Ethereal Echoes', artist: 'Ben Klock', duration: 2.0, genre: 'Dub Techno' },
            { title: 'Rave Revolution', artist: 'Carl Cox', duration: 2.1, genre: 'Acid Techno' },
            { title: 'Hypnotic Harmony', artist: 'Dixon', duration: 1.9, genre: 'Deep Techno' },
            { title: 'Transcendent Techno', artist: 'Len Faki', duration: 2.2, genre: 'Progressive Techno' },
            { title: 'Spectral Synthesis', artist: 'Jeff Mills', duration: 2.5, genre: 'Detroit Techno' },
            { title: 'Cybernetic Circuit', artist: 'Rebekah', duration: 2.3, genre: 'Tech House' },
            { title: 'Robotic Rhythms', artist: 'UMEK', duration: 2.1, genre: 'Robotic Techno' },
            { title: 'Astral Alignment', artist: 'Alan Fitzpatrick', duration: 2.4, genre: 'Tech Trance' },
            { title: 'Techno Twilight', artist: 'Amotik', duration: 2.0, genre: 'Experimental Techno' },
            { title: 'Synthwave Symphony', artist: 'Vaporwave Voyager', duration: 2.3, genre: 'Synthwave Techno' },
            { title: 'Techno Fusion', artist: 'Charlotte de Witte', duration: 2.2, genre: 'Industrial Techno' },
            { title: 'Neon Nights', artist: 'Amelie Lens', duration: 2.1, genre: 'Melodic Techno' },
            { title: 'Circuit Breaker', artist: 'Perc', duration: 2.3, genre: 'Dark Techno' },
            { title: 'Vortex Vibes', artist: 'Nina Kraviz', duration: 2.4, genre: 'Minimal Techno' },
            { title: 'Machine Mind', artist: 'Adam Beyer', duration: 2.0, genre: 'Driving Techno' },
            { title: 'Technotronic', artist: 'Umek', duration: 2.1, genre: 'Energetic Techno' },
            { title: 'Digital Dreams', artist: 'Richie Hawtin', duration: 2.5, genre: 'Ambient Techno' },
            { title: 'Synthetic Serenity', artist: 'Maceo Plex', duration: 2.2, genre: 'Electronica Techno' },
            { title: 'Gravity Groove', artist: 'Pan-Pot', duration: 2.3, genre: 'Progressive Techno' },
            { title: 'Dimensional Drift', artist: 'Joseph Capriati', duration: 2.1, genre: 'Psychedelic Techno' },
            { title: 'Magnetic Motion', artist: 'Dax J', duration: 2.4, genre: 'Hard Techno' },
            { title: 'Analog Awakening', artist: 'Chris Liebing', duration: 2.2, genre: 'Analog Techno' },
            { title: 'Techno Tesseract', artist: 'Alan Fitzpatrick', duration: 2.3, genre: 'Hypnotic Techno' },
            { title: 'Abyssal Beats', artist: 'Sam Paganini', duration: 2.0, genre: 'Techno Noir' },
            { title: 'Rhythmic Resonance', artist: 'Enrico Sangiuliano', duration: 2.1, genre: 'Techno Rave' }

        ]),
        listener.insertMany([
          { name: 'Carolina Torrente', description: 'Carolina Torrente is a Latin and tropical music specialist, known for her ability to transport audiences to exotic destinations through her vibrant and rhythmic mixes. Her passion for music and cultural diversity shines through in every performance.' },
          { name: 'Isabella Luna', description: 'Isabella Luna, the enchantress of electronic beats, creates sonic landscapes that take listeners on a cosmic journey. Her passion for pushing musical boundaries and experimenting with sounds results in a truly immersive and mind-bending experience.' },
          { name: 'Javier Cruz', description: 'Javier Cruz, the maestro of classical and orchestral mixes, brings a touch of sophistication to every event. His seamless transitions and carefully curated playlists showcase the timeless beauty of classical compositions, making each performance a musical masterpiece.' },
          { name: 'Sophia Reyes', description: 'Sophia Reyes, a versatile client with a penchant for diverse genres, weaves together eclectic sets that cater to a wide range of musical tastes. Whether its hip- hop, jazz, or indie, Sophias mixes are a testament to her love for all things musical.' }
        ])
      ]);
    }
  })
  .then(() => {
    console.log('Data inserted successfully in MongoDB');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting/inserting data in MongoDB:', err);
  });






app.get('/', (req, res) => {
  res.render('index_listener');
});


app.post('/', async (req, res) => {
  const raw_name = req.body.name;
  const email = req.body.email;

  if (!raw_name) {
    return res.status(400).send('Username is required');
  }

  const name = raw_name.replace(/[^a-zA-Z0-9_]/g, '_');

  const dbConnectionString = `mongodb://127.0.0.1:27017/${name}`;

  try {

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('Existing MongoDB connection closed');
    }

    await mongoose.connect(dbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('MongoDB connected successfully to user database:', name);

    const songsCount = await Song.countDocuments();
    const listenersCount = await listener.countDocuments();

    if (songsCount === 0 && listenersCount === 0) {
      await Promise.all([
        Song.insertMany([
          { title: 'Techno Vibes', artist: 'Mandragora', duration: 2.5, genre: 'Psychedelic Techno' },
          { title: 'Rhythmic Resonance', artist: 'Trym', duration: 2.0, genre: 'Industrial Techno' },
          { title: 'Synthetic Serenity', artist: 'Nina Kraviz', duration: 2.3, genre: 'Minimal Techno' },
          { title: 'Electronic Euphoria', artist: 'Charlotte de Witte', duration: 2.1, genre: 'Dark Techno' },
          { title: 'Bass Beat', artist: 'Adam Beyer', duration: 1.8, genre: 'Drumcode Techno' },
          { title: 'Pulsating Patterns', artist: 'Amelie Lens', duration: 2.2, genre: 'Melodic Techno' },
          { title: 'Industrial Intensity', artist: 'Chris Liebing', duration: 2.4, genre: 'Hard Techno' },
          { title: 'Techno Trance', artist: 'Beat Bouncer', duration: 2.2, genre: 'Trance Techno' },
          { title: 'Techno Groove', artist: 'Joseph Capriati', duration: 2.3, genre: 'Funky Techno' },
          { title: 'Ethereal Echoes', artist: 'Ben Klock', duration: 2.0, genre: 'Dub Techno' },
          { title: 'Rave Revolution', artist: 'Carl Cox', duration: 2.1, genre: 'Acid Techno' },
          { title: 'Hypnotic Harmony', artist: 'Dixon', duration: 1.9, genre: 'Deep Techno' },
          { title: 'Transcendent Techno', artist: 'Len Faki', duration: 2.2, genre: 'Progressive Techno' },
          { title: 'Spectral Synthesis', artist: 'Jeff Mills', duration: 2.5, genre: 'Detroit Techno' },
          { title: 'Cybernetic Circuit', artist: 'Rebekah', duration: 2.3, genre: 'Tech House' },
          { title: 'Robotic Rhythms', artist: 'UMEK', duration: 2.1, genre: 'Robotic Techno' },
          { title: 'Astral Alignment', artist: 'Alan Fitzpatrick', duration: 2.4, genre: 'Tech Trance' },
          { title: 'Techno Twilight', artist: 'Amotik', duration: 2.0, genre: 'Experimental Techno' },
          { title: 'Synthwave Symphony', artist: 'Vaporwave Voyager', duration: 2.3, genre: 'Synthwave Techno' },
          { title: 'Techno Fusion', artist: 'Charlotte de Witte', duration: 2.2, genre: 'Industrial Techno' },
          { title: 'Neon Nights', artist: 'Amelie Lens', duration: 2.1, genre: 'Melodic Techno' },
          { title: 'Circuit Breaker', artist: 'Perc', duration: 2.3, genre: 'Dark Techno' },
          { title: 'Vortex Vibes', artist: 'Nina Kraviz', duration: 2.4, genre: 'Minimal Techno' },
          { title: 'Machine Mind', artist: 'Adam Beyer', duration: 2.0, genre: 'Driving Techno' },
          { title: 'Technotronic', artist: 'Umek', duration: 2.1, genre: 'Energetic Techno' },
          { title: 'Digital Dreams', artist: 'Richie Hawtin', duration: 2.5, genre: 'Ambient Techno' },
          { title: 'Synthetic Serenity', artist: 'Maceo Plex', duration: 2.2, genre: 'Electronica Techno' },
          { title: 'Gravity Groove', artist: 'Pan-Pot', duration: 2.3, genre: 'Progressive Techno' },
          { title: 'Dimensional Drift', artist: 'Joseph Capriati', duration: 2.1, genre: 'Psychedelic Techno' },
          { title: 'Magnetic Motion', artist: 'Dax J', duration: 2.4, genre: 'Hard Techno' },
          { title: 'Analog Awakening', artist: 'Chris Liebing', duration: 2.2, genre: 'Analog Techno' },
          { title: 'Techno Tesseract', artist: 'Alan Fitzpatrick', duration: 2.3, genre: 'Hypnotic Techno' },
          { title: 'Abyssal Beats', artist: 'Sam Paganini', duration: 2.0, genre: 'Techno Noir' },
          { title: 'Rhythmic Resonance', artist: 'Enrico Sangiuliano', duration: 2.1, genre: 'Techno Rave' }]),
        listener.insertMany([
        { name: 'Carolina Torrente', description: 'Carolina Torrente is a Latin and tropical music specialist, known for her ability to transport audiences to exotic destinations through her vibrant and rhythmic mixes. Her passion for music and cultural diversity shines through in every performance.' },
        { name: 'Isabella Luna', description: 'Isabella Luna, the enchantress of electronic beats, creates sonic landscapes that take listeners on a cosmic journey. Her passion for pushing musical boundaries and experimenting with sounds results in a truly immersive and mind-bending experience.' },
        { name: 'Javier Cruz', description: 'Javier Cruz, the maestro of classical and orchestral mixes, brings a touch of sophistication to every event. His seamless transitions and carefully curated playlists showcase the timeless beauty of classical compositions, making each performance a musical masterpiece.' },
        { name: 'Sophia Reyes', description: 'Sophia Reyes, a versatile client with a penchant for diverse genres, weaves together eclectic sets that cater to a wide range of musical tastes. Whether its hip- hop, jazz, or indie, Sophias mixes are a testament to her love for all things musical.' }])
      ]);
    }

    res.render('index_listener', { name, email });
  } catch (error) {
    console.error('Error connecting to user database:', error);
    res.status(500).send('Internal Server Error');
  }

});




app.get('/index1_listener', async (req, res) => {
  try {
    const listenerList = await listener.find();

    res.render('index1_listener', { listenerList });
  } catch (error) {
    console.error('Error fetching listener list:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});


app.get('/getlistenerDescription/:id', async (req, res) => {
  const selectedlistenerId = req.params.id;

  try {
    const selectedlistener = await listener.findById(selectedlistenerId);

    res.json({ description: selectedlistener.description });
  } catch (error) {
    console.error('Error fetching listener description:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/index2_listener', async (req, res) => {
  try {

    const songs = await Song.find();

    res.render('index2_listener', { songs });
  } catch (error) {
    console.error('Error fetching songs list:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});


app.post('/addSongToPlaylist', async (req, res) => {
  try {
    console.log('Received request to add song to playlist:', req.body);
    const { selectedSong} = req.body;

    const selectedSongObject = await Song.findOne({ title: selectedSong });

    if (!selectedSongObject) {
      return res.status(404).json({ error: 'Selected song not found' });
    }

    const playlistEntry = await Playlist.create({
      song: selectedSongObject._id,
      title: selectedSongObject.title,
      duration: selectedSongObject.duration,
      artist: selectedSongObject.artist
    });

    res.json({
      message: 'Song added to playlist successfully',
      playlistEntry: playlistEntry,
    });
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/index3_listener', async (req, res) => {
  try {

    const playlist = await Playlist.find();

    res.render('index3_listener', { playlist });
  } catch (error) {
    console.error('Error fetching playlist for index3_listener:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});

app.post('/deleteSongFromPlaylist', async (req, res) => {
  try {
    const { selectedSongToDelete } = req.body;

    await Playlist.findByIdAndDelete(selectedSongToDelete);

    res.json({ message: 'Song deleted from playlist successfully' });
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});