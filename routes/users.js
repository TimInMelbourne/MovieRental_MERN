const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  var user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  const salt = await bcrypt.genSalt(10);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send({
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
