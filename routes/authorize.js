const express = require('express');
const router = express.Router();

const ImplicitAuth = require('../models/ImplicitAuth');
const { ErrorHandler } = require('../middleware');

/**
 * @description
 * This function is used to redirect user to webpage where user can login and get authenicated
 *
 * @access PUBLIC
 *
 * @method GET
 *
 * @route /authorize?clientID=<<string>>&redirectURI=<<string>>
 */
router.get('/', async (req, res) => {
  const { clientID } = req.query;

  try {
    const client = await ImplicitAuth.findOne({ clientID });

    if (!client) {
      return res.status(404).json({ message: 'Invalid Client ID' });
    }

    return res.json(client);
  } catch (error) {
    return ErrorHandler(res, error);
  }
});

module.exports = router;
