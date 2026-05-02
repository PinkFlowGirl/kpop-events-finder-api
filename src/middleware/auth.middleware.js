const tokenService = require("../services/token.service");
const User = require("../models/user.model");

async function authenticate(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication token is required." });
    }

    const token = authorizationHeader.split(" ")[1];
    const payload = tokenService.verifyToken(token);
    const user = await User.findById(payload.sub).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Authenticated user was not found." });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired authentication token." });
  }
}

module.exports = { authenticate };
