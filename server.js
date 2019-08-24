const express = require('express');
const config = require('config');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'server-running.html'));
});

app.use('/user', require('./routes/user'));

const PORT = process.env.PORT || config.get('PORT') || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
