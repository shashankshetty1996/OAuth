const express = require('express');
const router = express.Router();

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
router.get('/', (req, res) => {
  const reqQuery = req.query;
  res.json(reqQuery);
});

module.exports = router;
