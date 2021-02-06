const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcrypt');
const { route } = require('./genres');
const router = express.Router();
router.use(express.json());

router.get('/me', auth, async (req, res) => {
  const user = await await User.findById(req.user._id).select('-password');
  res.send(user);
});

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

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

router.put('/', (req, res) => {
  res.send('Under developing');
});

router.delete('/', (req, res) => {
  res.send('Under developing');
});

module.exports = router;
