const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');

const { Validate } = require('../middleware');

router.get('/', (req, res) => {
  // User dummy data
  const userData = {
    username: 'Shashank S Shetty',
    country: 'India',
    contact_number: 987654321
  };

  // JSON resource
  res.json(userData);
});

/**
 * @description
 * This route is used to create new users into Authorized server. Who can access resource server.
 *
 * @access private
 *
 * @method POST
 *
 * @route /user
 */
router.post('/', async (req, res) => {
  const {
    name,
    email,
    password,
    contact,
    country,
    authorizationServerID
  } = req.body;

  const isValid = Validate([
    { value: name, type: 'string', minLength: 3, maxLength: 24 },
    { value: email, type: 'email' },
    { value: password, type: 'string', minLength: 6, maxLength: 32 },
    { value: contact, type: 'number' },
    { value: authorizationServerID, type: 'string' }
  ]);

  if (!isValid) {
    return res.status(400).json({ message: 'Invalid data passed' });
  }

  try {
    const doesUserExist = await User.findOne({ authorizationServerID, email });

    if (doesUserExist) {
      return res.status(403).json({ message: 'User already exist' });
    }

    const newUser = new User({
      name,
      email,
      password,
      contact,
      country,
      authorizationServerID
    });

    // Create salt for hashing
    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {}
});

module.exports = router;
