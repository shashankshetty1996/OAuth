const jwt = require('jsonwebtoken');
const config = require('config');

function AuthenicateAccessToken(req, res, next) {
  // Get token from header
  const bearerHeader = req.header('Authorization');
  let token;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    token = bearerToken;
  } else {
    return res.status(403).json({ message: 'No token, authorization denied' });
  }

  // Check if not token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('JWT_SECRET'));

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = AuthenicateAccessToken;
