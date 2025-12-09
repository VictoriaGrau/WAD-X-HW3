const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "admin",
    database: "wad_app",
    host: "localhost",
    port: "5432"
});

async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                author TEXT NOT NULL,
                author_email TEXT NOT NULL,
                author_avatar TEXT,
                content TEXT NOT NULL,
                image TEXT,
                likes INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Database tables ensured.");
    } catch (err) {
        console.error("Error creating tables:", err);
    }
}

module.exports = {pool, initializeDatabase};