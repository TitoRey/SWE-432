const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();

mongoose.connect("mongodb://localhost/radioStation", { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

// Used for grabbing form params
app.use(bodyParser.urlencoded({ extended: true }));

// Allowing app to accept JSON
app.use(express.json());

// Using Static Files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));


// Using Express Layouts
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.listen(3000);

app.get('/', (req, res) => { 
  res.redirect('/djs');
});

const djRouter = require('./routes/djs');
app.use('/djs', djRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.all('*', (req, res) => { 
  res.status(404).render('404');
}); 
