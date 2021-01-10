const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255),
    genre: Joi.object({
      name: Joi.string().required(),
      _id: Joi.string().required(),
    }),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
