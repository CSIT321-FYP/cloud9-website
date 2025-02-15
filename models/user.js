const { pool } = require("../db/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
class User {
  constructor(
    id,
    email,
    hashedPassword,
    firstName,
    lastName,
    publicKey,
    privateKey,
  ) {
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.firstName = firstName;
    this.lastName = lastName;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  static async getUsers() {
    const result = await pool.query("SELECT email, public_key FROM users");
    return result.rows;
  }

  static async getUserByEmail(email) {
    // Fetch user from the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const userData = result.rows[0];

    if (!userData) {
      throw new Error("User not found");
    }

    let { id, password, firstname, lastname, public_key, private_key } =
      userData;

    let user = new User(
      id,
      email,
      password,
      firstname,
      lastname,
      public_key,
      private_key,
    );

    return user;
  }

  static async createUser(email, password, firstName, lastName) {
    // Generate RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password, firstName, lastName, public_key, private_key) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, hashedPassword, firstName, lastName, publicKey, privateKey],
    );

    let { id } = result.rows[0];

    let user = new User(id, email, hashedPassword, firstName, lastName);
    return user;
  }

  static getUserById(id) {
    let user = this.users.find((user) => user.id == id);
    if (user) {
      return user;
    } else {
      let err = new Error("User not found");
      err.status = 404;
      throw err;
    }
  }

  updateUser() {}

  deleteUser() {}

  deleteUserById(id) {}
}

module.exports = User;
