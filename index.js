const express = require('express');
const app = express();
const genres = require('./routes/genres');

const mongoose = require('mongoose');//load mongoose

app.use(express.json());
app.use('/api/genres', genres); //load the genres router

//Connect to local mongoDB server
mongoose.connect('mongodb://localhost/MovieRental', { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err.message));

app.get('/', (req, res) => {
    res.send('Hello, why not go to /api/genres?');
});


app.get('/api', (req, res) => {
    res.send('Hello, why not go to /api/genres?');
})

app.listen('3000', () => console.log('Listening on port 3000'));

