const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');

const { Validate, ErrorHandler } = require('../middleware');

/**
 * @description
 * This route used to get all the users for a particular authorization server.
 *
 * @access private
 *
 * @method GET
 *
 * @route /user
 */
router.get('/', async (req, res) => {
  const { authorizationServerID, email } = req.query;

  if (!authorizationServerID) {
    return res.status(400).json({ message: 'Unknown authorization server' });
  }

  try {
    const user = await User.findOne({ authorizationServerID, email }).select([
      '-password',
      '-__v'
    ]);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return ErrorHandler(res, error);
  }
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
  } catch (error) {
    return ErrorHandler(res, error);
  }
});

module.exports = router;
