const config = require('config');
const jwt = require('jsonwebtoken');

async function generateToken(payload, jwtOptions = { expiresIn: '1h' }) {
  const jwtSecret = config.get('JWT_SECRET');

  try {
    const token = await jwt.sign(payload, jwtSecret, jwtOptions);
    console.log('token is', token);
    return token;
  } catch (error) {
    new Error('Failed to generate accessToken');
  }
}

module.exports = generateToken;
