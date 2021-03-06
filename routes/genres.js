const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const { Genre, validateSchema } = require('../models/genre');
const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const genre = await Genre.find({ _id: id }).catch((err) =>
    console.log('something wrong', err.message)
  );
  if (!genre || genre.length === 0)
    return res.status(404).send(`Genre id ${id} is not found`);
  res.send(genre);
});

router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  //1 validate Genre name
  const { error } = validateSchema.validate({ genreName: name });
  if (error) return res.status(400).send(`Genre ${name} is invalid`);

  //2 save to MongoDB
  var genre = new Genre({ name: name });
  genre = await genre.save();

  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  //1 validate name
  const { name } = req.body;
  const { error } = validateSchema.validate({ genreName: name });
  if (error) return res.status(400).send(`Genre ${name} is invalid`);

  const id = req.params.id;
  var genre = await Genre.findByIdAndUpdate(id, { name: name }, { new: true });
  //2 find the genre with ID
  if (!genre || genre.length === 0)
    return res.status(404).send(`Genre id ${id} is not found`);

  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const id = req.params.id;
  if (id === undefined) return res.status(400).send('Please input a genre id');
  const genre = await Genre.findByIdAndRemove(id, { useFindAndModify: false });

  if (!genre) return res.status(404).send(`Genre id ${id} not found`);
  // genres.pop(genre);

  res.send(genre);
});

module.exports = router;
