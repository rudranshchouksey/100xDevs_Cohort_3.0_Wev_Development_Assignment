const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ username: user.username, id: user._id }, SECRET, { expiresIn: '1h' });
}

module.exports = generateToken;
