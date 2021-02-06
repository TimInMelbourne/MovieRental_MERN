const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort('name');
    res.send(movies);
  } catch {
    (err) => console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.post('/', auth, async (req, res) => {
  const inputMovie = req.body;
  const { error } = validateMovie(inputMovie);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genre._id);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  try {
    movie = await movie.save();

    res.send(movie);
  } catch {
    (err) => console.log(err);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genre._id);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router;
