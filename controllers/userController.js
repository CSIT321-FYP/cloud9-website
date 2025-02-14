const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Handles the GET request for the `/users` route.
 *
 * This handler retrieves all users from the `User` model and renders the `users`
 * view template, passing the retrieved users and a page title as data.
 *
 * @function handleGetUsers
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 *
 * @route GET /users
 *
 * @example
 * // Example usage in an Express app:
 * const { handleGetUsers } = require('./handlers/userHandler');
 * app.get('/users', handleGetUsers);
 */

function handleGetUsers(req, res, next) {
  console.log(req);
  const users = User.getUsers();
  let error = new Error();
  res.render("users", { users, title: "Users" });
}

async function handleGetPublicKeys(req, res, next) {
  const users = await User.getUsers();
  res.json(users);
}

async function handleGetUser(req, res, next) {
  const user = req.user;
  if (!user) res.status(404).send("Unauthorized");

  const result = await User.getUserByEmail(user.email);

  delete result.hashedPassword;
  res.json(result);
}

async function handleRegister(req, res, next) {
  const { email, password, firstName, lastName } = req.body;
  try {
    // Create user
    let user = await User.createUser(email, password, firstName, lastName);

    // Remove sensitive fields
    delete user.hashedPassword;

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
    );

    // Return token
    res.json(token);
  } catch (err) {
    next(err);
  }
}

async function handleLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    // Fetch User
    const user = await User.getUserByEmail(email);

    // Validate credentials
    const isValidPassword = bcrypt.compare(password, user.hashedPassword);
    if (!isValidPassword) {
      let error = new Error("Incorrect password");
      error.status = 401;
      throw error;
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
    );

    // Return token
    res.json(token);
  } catch (err) {
    err.status = 401;
    next(err);
  }
}

module.exports = {
  handleGetUsers,
  handleGetUser,
  handleRegister,
  handleLogin,
  handleGetPublicKeys,
};
