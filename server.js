const express = require('express'); 
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Used for grabbing form params
app.use(bodyParser.urlencoded({ extended: true }));

// Using Static Files
// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

// Using Express Layouts
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.listen(3000);

const djRouter = require('./routes/djs');
app.use('/djs', djRouter);
