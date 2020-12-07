const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres); //load the genres router


app.get('/', (req, res) => {
    res.send('Hello, why not go to /api/genres?');
});


app.get('/api', (req, res) => {
    res.send('Hello, why not go to /api/genres?');
})

app.listen('3000', () => console.log('Listening on port 3000'));

