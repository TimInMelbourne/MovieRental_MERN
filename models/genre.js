const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

const validateSchema = Joi.object({
  genreName: Joi.string().alphanum().min(3).max(30).required(),
});

exports.Genre = Genre;
exports.validateSchema = validateSchema;
