const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const config = require('config');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/mongo');

const app = express();

// Connecting to Database
connectDB();

app.use(morgan('dev'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up static folder
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static('client/build'));

// View Engine
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
  })
);
app.set('view engine', 'hbs');

app.use('api/user', require('./routes/user'));
app.use('api/authorize', require('./routes/authorize'));
app.use('api/auth', require('./routes/auth'));

/**
 * @description
 * This route is used to for server health check
 *
 * @access PUBLIC
 *
 * @method GET
 *
 * @route '/'
 */
app.get('/', (req, res) => {
  res.render('health');
});

// Set static folder
app.use(express.static('client/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || config.get('PORT') || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
