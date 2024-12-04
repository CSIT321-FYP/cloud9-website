const User = require("../models/user");

function handleGetUsers(req, res, next) {
    console.log(req)
    const users = User.getUsers()
    res.render('users', { users, title: 'Users' },);
}

module.exports = {
    handleGetUsers
}
