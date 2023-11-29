const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// I create the Song db
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  duration: Number,
  genre: String
});
const Song = mongoose.model('Song', songSchema);

// I create the DJ db
const djSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String
});
const DJ = mongoose.model('DJ', djSchema);

// I create the Playlist db
const playlistSchema = new mongoose.Schema({
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
  title: String,
  duration: Number,
  artist: String,
  timeSlot: String,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

mongoose.connect('mongodb://127.0.0.1:27017/iteration5', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('MongoDB connected successfully');
    const songsCount = await Song.countDocuments();
    const djsCount = await DJ.countDocuments();

    if (songsCount === 0 && djsCount === 0) {

      return Promise.all([
        Song.insertMany([
          { title: 'Sunset Serenade', artist: 'Melody Maker', duration: 1.8, genre: 'Pop' },
          { title: 'Moonlit Lullaby', artist: 'Harmony Harmony', duration: 2.1, genre: 'Acoustic' },
          { title: 'Electric Pulse', artist: 'Synth Wizard', duration: 1.5, genre: 'Electronic' },
          { title: 'Jazzed Up', artist: 'Smooth Sax', duration: 2.4, genre: 'Jazz' },
          { title: 'Rock Revolution', artist: 'Guitar Guru', duration: 2.0, genre: 'Rock' },
          { title: 'Funky Groove', artist: 'Bass Master', duration: 1.8, genre: 'Funk' },
          { title: 'Country Roads', artist: 'Twangy Twister', duration: 1.9, genre: 'Country' },
          { title: 'Reggae Rhythm', artist: 'Island Vibes', duration: 1.7, genre: 'Reggae' },
          { title: 'Classical Sonata', artist: 'Orchestra Maestro', duration: 3.0, genre: 'Classical' },
          { title: 'Hip Hop Hustle', artist: 'Rap Ruler', duration: 2.2, genre: 'Hip Hop' },
          { title: 'Metal Mayhem', artist: 'Shredder Supreme', duration: 1.8, genre: 'Metal' },
          { title: 'Bluesy Bliss', artist: 'Soulful Singer', duration: 1.6, genre: 'Blues' },
          { title: 'Piano Prelude', artist: 'Keynote Pianist', duration: 1.3, genre: 'Piano' },
          { title: 'Dance Floor Dream', artist: 'EDM Enchanter', duration: 1.9, genre: 'Dance' },
          { title: 'Gospel Glory', artist: 'Divine Voices', duration: 2.1, genre: 'Gospel' },
          { title: 'Ambient Aura', artist: 'Soundscapes Creator', duration: 2.5, genre: 'Ambient' },
          { title: 'Salsa Celebration', artist: 'Rhythmic Reveler', duration: 2, genre: 'Salsa' },
          { title: 'Indie Innovation', artist: 'Alternative Artisan', duration: 1.7, genre: 'Indie' },
          { title: 'Synthwave Symphony', artist: 'Vaporwave Voyager', duration: 2.3, genre: 'Synthwave' },
          { title: 'World Beat', artist: 'Global Grooves', duration: 1.8, genre: 'World' },
          { title: 'Disco Delight', artist: 'Boogie Bee', duration: 2, genre: 'Disco' },
          { title: 'R&B Romance', artist: 'Soul Serenader', duration: 2.1, genre: 'R&B' },
          { title: 'Bluegrass Breeze', artist: 'Banjo Ballad', duration: 1.6, genre: 'Bluegrass' },
          { title: 'Techno Trance', artist: 'Beat Bouncer', duration: 2.2, genre: 'Techno' },
          { title: 'Chillhop Chill', artist: 'Laid-back Lyricist', duration: 1.9, genre: 'Chillhop' }


        ]),
        DJ.insertMany([
          { name: 'DJ Marcos Ferreras', description: 'Marcos Ferreras is a seasoned DJ with a unique blend of pop and electronic beats. His sets are known for creating an energetic atmosphere that keeps the crowd moving all night long.' },
          { name: 'DJ Carolina Torrente', description: 'Carolina Torrente is a Latin and tropical music specialist, known for her ability to transport audiences to exotic destinations through her vibrant and rhythmic mixes. Her passion for music and cultural diversity shines through in every performance.' },
          { name: 'DJ Tito Reynoso', description: 'Tito Reynoso, a connoisseur of rock and alternative music, takes pride in curating playlists that resonate with the soul. His extensive knowledge of the genre and intuitive song selection make his sets a journey through the evolution of rock music.' },
          { name: 'DJ Isabella Luna', description: 'Isabella Luna, the enchantress of electronic beats, creates sonic landscapes that take listeners on a cosmic journey. Her passion for pushing musical boundaries and experimenting with sounds results in a truly immersive and mind-bending experience.' },
          { name: 'DJ Javier Cruz', description: 'Javier Cruz, the maestro of classical and orchestral mixes, brings a touch of sophistication to every event. His seamless transitions and carefully curated playlists showcase the timeless beauty of classical compositions, making each performance a musical masterpiece.' },
          { name: 'DJ Sophia Reyes', description: 'Sophia Reyes, a versatile DJ with a penchant for diverse genres, weaves together eclectic sets that cater to a wide range of musical tastes. Whether its hip- hop, jazz, or indie, Sophias mixes are a testament to her love for all things musical.' }
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
  res.render('index_producer');
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
    const djsCount = await DJ.countDocuments();

    if (songsCount === 0 && djsCount === 0) {
      await Promise.all([
        Song.insertMany([{ title: 'Sunset Serenade', artist: 'Melody Maker', duration: 1.8, genre: 'Pop' },
        { title: 'Sunset Serenade', artist: 'Melody Maker', duration: 1.8, genre: 'Pop' },
        { title: 'Moonlit Lullaby', artist: 'Harmony Harmony', duration: 2.1, genre: 'Acoustic' },
        { title: 'Electric Pulse', artist: 'Synth Wizard', duration: 1.5, genre: 'Electronic' },
        { title: 'Jazzed Up', artist: 'Smooth Sax', duration: 2.4, genre: 'Jazz' },
        { title: 'Rock Revolution', artist: 'Guitar Guru', duration: 2.0, genre: 'Rock' },
        { title: 'Funky Groove', artist: 'Bass Master', duration: 1.8, genre: 'Funk' },
        { title: 'Country Roads', artist: 'Twangy Twister', duration: 1.9, genre: 'Country' },
        { title: 'Reggae Rhythm', artist: 'Island Vibes', duration: 1.7, genre: 'Reggae' },
        { title: 'Classical Sonata', artist: 'Orchestra Maestro', duration: 3.0, genre: 'Classical' },
        { title: 'Hip Hop Hustle', artist: 'Rap Ruler', duration: 2.2, genre: 'Hip Hop' },
        { title: 'Metal Mayhem', artist: 'Shredder Supreme', duration: 1.8, genre: 'Metal' },
        { title: 'Bluesy Bliss', artist: 'Soulful Singer', duration: 1.6, genre: 'Blues' },
        { title: 'Piano Prelude', artist: 'Keynote Pianist', duration: 1.3, genre: 'Piano' },
        { title: 'Dance Floor Dream', artist: 'EDM Enchanter', duration: 1.9, genre: 'Dance' },
        { title: 'Gospel Glory', artist: 'Divine Voices', duration: 2.1, genre: 'Gospel' },
        { title: 'Ambient Aura', artist: 'Soundscapes Creator', duration: 2.5, genre: 'Ambient' },
        { title: 'Salsa Celebration', artist: 'Rhythmic Reveler', duration: 2, genre: 'Salsa' },
        { title: 'Indie Innovation', artist: 'Alternative Artisan', duration: 1.7, genre: 'Indie' },
        { title: 'Synthwave Symphony', artist: 'Vaporwave Voyager', duration: 2.3, genre: 'Synthwave' },
        { title: 'World Beat', artist: 'Global Grooves', duration: 1.8, genre: 'World' },
        { title: 'Disco Delight', artist: 'Boogie Bee', duration: 2, genre: 'Disco' },
        { title: 'R&B Romance', artist: 'Soul Serenader', duration: 2.1, genre: 'R&B' },
        { title: 'Bluegrass Breeze', artist: 'Banjo Ballad', duration: 1.6, genre: 'Bluegrass' },
        { title: 'Techno Trance', artist: 'Beat Bouncer', duration: 2.2, genre: 'Techno' },
        { title: 'Chillhop Chill', artist: 'Laid-back Lyricist', duration: 1.9, genre: 'Chillhop' }]),
        DJ.insertMany([{ name: 'DJ Marcos Ferreras', description: 'Marcos Ferreras is a seasoned DJ with a unique blend of pop and electronic beats. His sets are known for creating an energetic atmosphere that keeps the crowd moving all night long.' },
        { name: 'DJ Carolina Torrente', description: 'Carolina Torrente is a Latin and tropical music specialist, known for her ability to transport audiences to exotic destinations through her vibrant and rhythmic mixes. Her passion for music and cultural diversity shines through in every performance.' },
        { name: 'DJ Tito Reynoso', description: 'Tito Reynoso, a connoisseur of rock and alternative music, takes pride in curating playlists that resonate with the soul. His extensive knowledge of the genre and intuitive song selection make his sets a journey through the evolution of rock music.' },
        { name: 'DJ Isabella Luna', description: 'Isabella Luna, the enchantress of electronic beats, creates sonic landscapes that take listeners on a cosmic journey. Her passion for pushing musical boundaries and experimenting with sounds results in a truly immersive and mind-bending experience.' },
        { name: 'DJ Javier Cruz', description: 'Javier Cruz, the maestro of classical and orchestral mixes, brings a touch of sophistication to every event. His seamless transitions and carefully curated playlists showcase the timeless beauty of classical compositions, making each performance a musical masterpiece.' },
        { name: 'DJ Sophia Reyes', description: 'Sophia Reyes, a versatile DJ with a penchant for diverse genres, weaves together eclectic sets that cater to a wide range of musical tastes. Whether its hip- hop, jazz, or indie, Sophias mixes are a testament to her love for all things musical.' }])
      ]);
    }

    res.render('index_producer', { name, email });
  } catch (error) {
    console.error('Error connecting to user database:', error);
    res.status(500).send('Internal Server Error');
  }

});




app.get('/index1_producer', async (req, res) => {
  try {
    const djList = await DJ.find();

    res.render('index1_producer', { djList });
  } catch (error) {
    console.error('Error fetching DJ list:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});


app.get('/getDJDescription/:id', async (req, res) => {
  const selectedDJId = req.params.id;

  try {
    const selectedDJ = await DJ.findById(selectedDJId);

    res.json({ description: selectedDJ.description });
  } catch (error) {
    console.error('Error fetching DJ description:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/index2_producer', async (req, res) => {
  try {

    const songs = await Song.find();

    res.render('index2_producer', { songs });
  } catch (error) {
    console.error('Error fetching songs list:', error);
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});


app.post('/addSongToPlaylist', async (req, res) => {
  try {
    console.log('Received request to add song to playlist:', req.body);
    const { selectedSong, selectedTimeSlot } = req.body;

    const selectedSongObject = await Song.findOne({ title: selectedSong });

    if (!selectedSongObject) {
      return res.status(404).json({ error: 'Selected song not found' });
    }

    const playlistEntry = await Playlist.create({
      song: selectedSongObject._id,
      title: selectedSongObject.title,
      duration: selectedSongObject.duration,
      artist: selectedSongObject.artist,
      timeSlot: selectedTimeSlot,
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




app.get('/index3_producer', async (req, res) => {
  try {

    const playlist = await Playlist.find();

    res.render('index3_producer', { playlist });
  } catch (error) {
    console.error('Error fetching playlist for index3:', error);
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


