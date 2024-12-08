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
    console.log(req)
    const users = User.getUsers()
    let error = new Error();
    res.render('users', { users, title: 'Users' },);
}

function handleGetUser(req, res, next) {
    console.log(req)
    const user = User.getUserById(req.query.id)
    res.json(user)
}

module.exports = {
    handleGetUsers,
    handleGetUser
}
