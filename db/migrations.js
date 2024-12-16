const fs = require('fs');
const db = require('./db');

const runMigrations = async () => {
    try {
        const sql_drop = fs.readFileSync('./db/migrations/drop_tables.sql', 'utf-8');
        await db.query(sql_drop);
        console.log('Tables dropped!');

    } catch (err) {
        console.error(err)
    }

    const sql_create = fs.readFileSync('./db/migrations/create_tables.sql', 'utf-8');
    await db.query(sql_create);
    console.log('Migrations applied!');

    await db.pool.end();
};

runMigrations().catch(console.error);

