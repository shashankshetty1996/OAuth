const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const ImplicitAuth = require('../models/ImplicitAuth');
const User = require('../models/User');

const { ErrorHandler, GenerateToken, Validate } = require('../middleware');

/**
 * @description
 * This function is used to redirect user to webpage where user can login and get authenicated
 *
 * @access public
 *
 * @method GET
 *
 * @route /authorize?clientID=<<string>>&redirectURI=<<string>>
 */
router.get('/', async (req, res) => {
  const { clientID, redirectURI } = req.query;

  try {
    // Validate client
    const client = await ImplicitAuth.findOne({ clientID, redirectURI });

    if (!client) {
      return res
        .status(404)
        .json({ message: 'Invalid Client ID or redirectURI' });
    }

    // Redirect to login form
    return res.render('login', {
      id: client._id
    });
  } catch (error) {
    return ErrorHandler(res, error);
  }
});

/**
 * @description
 * This methos is used to authenicate authorized user.
 *
 * @method POST
 *
 * @access protected
 *
 * @route /authorize/id<<ObjectId>>
 */
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  // Validation of id
  if (!id) {
    return res.status(400).json({ message: `Client id hasn't been passed` });
  }

  try {
    // Validate client
    const client = await ImplicitAuth.findById(id);

    if (!client) {
      return res.status(422).json({ message: `Application isn't registered` });
    }

    // Do user Authenication here
    isValid = Validate([
      { value: email, type: 'email' },
      { value: password, type: 'string' }
    ]);

    // Redirect to display login
    if (!isValid) {
      const error = 'Invalid field';
      return res.render('login', { id, error });
    }

    // Fetching user details for give mail id.
    const user = await User.findOne({ email });

    // Validating
    if (!user) {
      const error = 'User with this email id does not exist';
      return res.render('login', { id, error });
    }

    // Password validation using bcrypt, since password will be hashed.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = 'Invalid Credentials';
      return res.render('login', { id, error });
    }

    // JWT token payload, to access user information
    const payload = {
      user: {
        id: user._id
      }
    };

    // accessToken
    const accessToken = await GenerateToken(payload);

    // Client registered redirectURI with accessToken
    return res.redirect(`${client.redirectURI}?accessToken=${accessToken}`);
  } catch (error) {
    return res.render('login', { id, error: 'Server error' });
  }
});

module.exports = router;
