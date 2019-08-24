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

// View Engine
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
  })
);
app.set('view engine', 'hbs');

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
  // res.sendFile(path.join(__dirname, 'server-running.html'));
  res.render('health');
});

app.use('/user', require('./routes/user'));
app.use('/authorize', require('./routes/authorize'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || config.get('PORT') || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
