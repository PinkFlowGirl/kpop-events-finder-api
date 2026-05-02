const jwt = require("jsonwebtoken");
const env = require("../config/env");

function generateToken(user) {
  return jwt.sign(
    {
      email: user.email
    },
    env.jwtSecret,
    {
      subject: user.id,
      expiresIn: env.jwtExpiresIn
    }
  );
}

function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

module.exports = {
  generateToken,
  verifyToken
};
