const express = require('express');
const router = express.Router();

const ImplicitAuth = require('../models/ImplicitAuth');
const { ErrorHandler } = require('../middleware');

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
    const accessToken = 'Take your accessToken from here';

    // redirect to RedirectURI
    return res.redirect(`${client.redirectURI}?accessToken=${accessToken}`);
  } catch (error) {
    return ErrorHandler(res, error);
  }
});

module.exports = router;
