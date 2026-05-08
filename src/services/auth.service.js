const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const tokenService = require("./token.service");

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

async function register({ name, email, password }) {
  if (!name || !email || !password) {
    throw createHttpError(400, "Name, email, and password are required.");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, "Email is already registered.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createHttpError(400, "Invalid email format.");
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
    throw createHttpError(400, "Password must be at least 8 characters and include uppercase, lowercase, and a number.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return {
    user: sanitizeUser(user),
    token: tokenService.generateToken(user)
  };
}

async function login({ email, password }) {
  if (!email || !password) {
    throw createHttpError(400, "Email and password are required.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, "Invalid email or password.");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw createHttpError(401, "Invalid email or password.");
  }

  return {
    user: sanitizeUser(user),
    token: tokenService.generateToken(user)
  };
}

module.exports = {
  register,
  login
};
