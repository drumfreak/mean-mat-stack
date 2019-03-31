const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const weatherRoutes = require('./routes/weather');

mongoose.connect(process.env.MONGO_CONNECT_URL, {useCreateIndex: 1,  keepAlive: 1, useNewUrlParser: true })
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch(() => {
    console.log('Connection to mongodb failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('server/images')));
app.use('/', express.static(path.join(__dirname, '../dist/mean-stack')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Additional routes...
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/weather', weatherRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/mean-stack', 'index.html'))
});

module.exports = app;
