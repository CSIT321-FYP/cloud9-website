const { pool } = require('../db/db')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const ENCRYPTION_KEY = process.env.REFRESH_TOKEN_KEY; // Use a 32-byte key for AES-256

var key = Buffer.from(ENCRYPTION_KEY, 'base64');

function encrypt(plaintext) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        key,
        iv
    );
    let encrypted = Buffer.concat([iv, cipher.update(plaintext, 'utf8'), cipher.final()]);
    return encrypted.toString('base64url');
}

function decrypt(ivCiphertextB64) {
    const ivCiphertext = Buffer.from(ivCiphertextB64, 'base64url');
    const iv = ivCiphertext.subarray(0, 16);
    const ciphertext = ivCiphertext.subarray(16);
    const cipher = crypto.createDecipheriv(
        'aes-256-cbc',
        key,
        iv
    );
    let decrypted = Buffer.concat([cipher.update(ciphertext), cipher.final()]);
    return decrypted.toString('utf-8');
}

class UserGoogle {
    constructor(id, userId, refreshToken) {
        this.id = id;
        this.userId = userId;
        this.refreshToken = refreshToken;
    }

    static async createUser(userId, refreshToken) {
        const encryptedToken = encrypt(refreshToken)

        const result = await pool.query(
            `INSERT INTO user_google (user_id, google_refresh_token)
            VALUES ($1, $2)
            RETURNING *`,
            [userId, encryptedToken]
        )

        let { id } = result.rows[0];

        let userGoogle = new UserGoogle(id, userId, refreshToken);
        return userGoogle;
    }

    static async getUserByEmail(email) {
        const result = await pool.query(
            `SELECT ug.* FROM user_google ug
            JOIN users u ON ug.user_id = u.id
            WHERE u.email = $1`, [email]
        )

        let data = result.rows[0];

        const refreshToken = decrypt(data.google_refresh_token)

        let userGoogle = new UserGoogle(data.id, data.user_id, refreshToken);
        return userGoogle;
    }

    async updateRefreshToken(refreshToken) {
        let encryptedRefreshToken = encrypt(refreshToken)
        await pool.query(
            `UPDATE user_google
            SET google_refresh_token = $1
            WHERE id = $2
            RETURNING *`,
            [encryptedRefreshToken, this.id]
        )

        this.refreshToken = refreshToken;
    }
}

module.exports = UserGoogle
