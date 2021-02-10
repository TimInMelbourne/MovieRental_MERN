const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');

router.use(express.json());

router.get('/', async (req, res) => {
  const customer = await Customer.find().sort('name');
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.find({ _id: req.params.id })
    .sort('name')
    .catch((err) => console.error('Bad request', err.message));
  if (!customer || customer.length === 0)
    return res.status(404).send(`Customer with ID ${req.params.id} not found`);
  return res.send(customer);
});

router.post('/', async (req, res) => {
  const inputCustomer = req.body;
  const validateResult = validateCustomer(inputCustomer);
  if (!validateResult.error) {
    var customer = new Customer({
      name: inputCustomer.name,
      phone: inputCustomer.phone,
      isGold: inputCustomer.isGold,
    });
    customer = await customer.save();

    res.send(customer);
  } else {
    return res.status(400).send(validateResult.error.details[0].message);
  }
});

router.put('/:id', auth, async (req, res) => {
  //1 validate name
  const inputCustomer = req.body;
  const validateResult = validateCustomer(inputCustomer);
  if (!validateResult.error) {
    var customer = new Customer({
      name: inputCustomer.name,
      phone: inputCustomer.phone,
      isGold: inputCustomer.isGold,
    });

    const id = req.params.id;
    var customer = await Customer.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
      { new: true }
    );
    //2 find the genre with ID
    if (!customer)
      return res.status(404).send(`Customer with id ${id} is not found`);

    res.send(customer);
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router;
