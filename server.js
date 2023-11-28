const express = require('express'); 
const session = require('express-session');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const User = require('./models/user');

app.use(session({
  secret: 'radioStation Secret',
  cookie: { maxAge: 900000 },
  saveUninitialized: false
}))


// Setting up the Database
mongoose.connect("mongodb://localhost/radioStation", { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (error) => console.log(error)); 
db.once('open', () => console.log('Connected to Database'));

// Used for grabbing form params
app.use(express.urlencoded({ extended: true }));

// Allowing app to accept JSON
app.use(express.json());

// Using Static Files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));


// Using Express Layouts
app.use(expressLayouts);

// Setting the View Engine (EJS)
app.set('view engine', 'ejs');

// App can listen on this port (localhost:3000)
app.listen(3000);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Signin Page
app.get('/signin', (req, res) => {
  res.render('users/signin');
})

// Making a request to login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Perform authentication (check against your database or any other authentication method)
  const user = await User.findOne({email: email})
  if (user) {
    if (user.password === password) {
      // Set a session variable to indicate that the user is logged in
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/users');
    } else {
      res.status(404).redirect('/signin')
    }
  }
  else { 
    res.status(405).redirect('/signin');
  }
})

// Logout endpoint
app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/signin');
    }
  });
});

// Middleware to check if the user is logged in
const requireLogin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next(); // User is logged in, proceed to the next middleware or route handler
  } else {
    res.redirect('/signin');
  }
};

// Apply the requireLogin middleware to all routes
app.use(requireLogin);

// Routes
app.get('/', (req, res) => { 
  res.redirect('/users/signin');
});

const playlistRouter = require('./routes/playlists');
app.use('/playlists', playlistRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const songRouter = require('./routes/songs');
app.use('/songs', songRouter);


// Custom 404 Page
app.all('*', (req, res) => { 
  res.status(404).render('404');
}); 
