const { pool } = require('../db/db')
const bcrypt = require('bcrypt')
class User {
    constructor(id, email, hashedPassword, firstName, lastName) {
        this.id = id;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.firstName = firstName
        this.lastName = lastName;
    }

    static getUsers() {
        return User.users
    }

    static async getUserByEmail(email) {
        // Fetch user from the database
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const userData = result.rows[0];

        if (!userData) {
            throw new Error('User not found');
        }

        let { id, password, firstName, lastName } = userData;

        let user = new User(id, email, password, firstName, lastName)

        return user;
    }

    static async createUser(email, password, firstName, lastName,) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password, firstName, lastName) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, firstName, lastName,]
        );

        let { id } = result.rows[0];

        let user = new User(id, email, hashedPassword, firstName, lastName)
        return user;
    }

    static getUserById(id) {
        let user = this.users.find(user => user.id == id)
        if (user) {
            return user
        } else {
            let err = new Error("User not found")
            err.status = 404
            throw err
        }
    }

    updateUser() {
    }

    deleteUser() {

    }

    deleteUserById(id) {

    }
}

module.exports = User
