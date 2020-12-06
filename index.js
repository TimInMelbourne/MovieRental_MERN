const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

let genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Romantic' },
    { id: 3, name: 'Comedy' }
]

app.get('/', (req, res) => {
    res.send('Hello, why not go to /api/genre?');
})

app.get('/api/genre/', (req, res) => {
    res.send(genres);
})

app.get('/api/genre/:id', (req, res) => {
    const id = req.params.id;
    const genre = genres.find(g => g.id === parseInt(id));
    if (!genre) return res.status(404).send(`Genre id ${id} is not found`);
    res.send(genre);
})

app.post('/api/genre', (req, res) => {
    const id = genres.length + 1;
    const { name } = req.body;
    const { error } = validateSchema.validate({ genreName: name });
    if (!error) {
        const genre = { id: id, name: name }
        genres.push(genre);
        res.send(genre);
    }
    else return res.status(400).send(`Genre ${name} is invalid`);
})

app.put('/api/genre/:id', (req, res) => {
    const id = req.params.id;
    const genre = genres.find(g => g.id === parseInt(id));
    if (!genre) return res.status(404).send(`Genre id ${id} is not found`);
    const { name } = req.body;
    const { error } = validateSchema.validate({ genreName: name });
    if (!error) {
        genre.name = name;
        res.send(genre);
    }
    else return res.status(400).send(`Genre ${name} is invalid`);
})

app.delete('/api/genre/:id', (req, res) => {
    const id = req.params.id;
    const genre = genres.find(g => g.id === parseInt(id));
    if (!genre) return res.status(404).send(`Genre id ${id} not found`);
    // genres.pop(genre);
    genres = genres.filter(g => g.id !== genre.id);
    res.send(genre);
})

const validateSchema = Joi.object({
    genreName: Joi.string().alphanum().min(3).max(30).required()
})

app.listen('3000', () => console.log('Listening on port 3000'));

