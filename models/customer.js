const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
    },
    isGold: {
      type: Boolean,
      default: false,
      required: true,
    },
  })
);

function validateCustomer(customer) {
  const customerSchema = Joi.object({
    customerName: Joi.string().alphanum().min(1).max(50).required(),
    customerPhone: Joi.string().min(5).max(50).required(),
    customerIsGold: Joi.boolean().required(),
  });

  return customerSchema.validate({
    customerName: customer.name,
    customerPhone: customer.phone,
    customerIsGold: customer.isGold,
  });
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
