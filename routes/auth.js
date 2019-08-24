const express = require('express');
const router = express.Router();

const { ErrorResponse, Validate } = require('../middleware');

const ImplicitAuth = require('../models/ImplicitAuth');

/**
 * @description
 * This method is used to create implicit auth entry
 *
 * @access PRIVATE
 *
 * @method POST
 *
 * @route /auth
 * @argument { string } clientID this signify clientID of the application
 * @argument { string } applicationName this signify application name
 */
router.post('/', async (req, res) => {
  const { clientID, applicationName } = req.body;

  const isValid = Validate([
    { value: clientID, type: 'string', minLength: 3 },
    { value: applicationName, type: 'string', minLength: 3 }
  ]);

  if (!isValid) {
    return res.status(404).json({ message: 'Invalid arugments sent' });
  }

  try {
    const client = await ImplicitAuth.findOne({ clientID });

    if (client) {
      res.status(404).json({ message: 'ClientID already exist' });
    }

    const newOpenID = new ImplicitAuth({ clientID, applicationName });
    await newOpenID.save();

    return res.status(200).json({ message: 'Created Open id succesfully' });
  } catch (error) {
    return ErrorResponse(res, error);
  }
});

module.exports = router;
