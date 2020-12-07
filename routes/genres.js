const express = require('express');
const router = express.Router();

const Joi = require('joi');
router.use(express.json());


let genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Romantic' },
    { id: 3, name: 'Comedy' }
]


router.get('/', (req, res) => {
    res.send(genres);
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const genre = genres.find(g => g.id === parseInt(id));
    if (!genre) return res.status(404).send(`Genre id ${id} is not found`);
    res.send(genre);
})

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;