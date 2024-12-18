const { Pool } = require('pg');
require('dotenv').config({
    override: true,
})
const {
    ENVIRONMENT,
    DB_USER,
    DB_DEV,
    DB_TEST,
    DB_PASSWORD,
    DB_PORT,
} = process.env

const pool = new Pool({
    user: DB_USER,
    database: ENVIRONMENT == 'test' ? DB_TEST : DB_DEV,
    password: DB_PASSWORD,
    port: DB_PORT,
    host: 'localhost',
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params), // Expose a query function
    pool, // Export the pool for transactions or advanced use cases
};
