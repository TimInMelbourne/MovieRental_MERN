const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model(
  'Rental',
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 50,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 1,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 512,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateRental(rental) {
  const schema = Joi.object({
    customer: Joi.object({
      _id: Joi.string().required(),
      name: Joi.string(),
      isGold: Joi.boolean(),
      phone: Joi.string(),
    }),
    movie: Joi.object({
      _id: Joi.string().required(),
      title: Joi.string(),
      dailyRentalRate: Joi.number(),
    }),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validateRental = validateRental;
