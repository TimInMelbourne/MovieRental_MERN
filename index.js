const express = require('express');
const app = express();
const error = require('./middleware/error');
require('express-async-errors');
const genres = require('./routes/genres');
const customer = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose'); //load mongoose
const config = require('config');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

app.use(express.json());
app.use('/api/genres', genres); //load the genres router
app.use('/api/customers', customer);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

//Connect to local mongoDB server
mongoose
  .connect('mongodb://localhost/MovieRental', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Could not connect to MongoDB', err.message));

app.get('/', (req, res) => {
  res.send('movies, genres, customers, rentals and users are built and tested');
});

app.listen('3000', () => console.log('Listening on port 3000'));
