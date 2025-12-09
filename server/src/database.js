const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    password: "admin",
    database: "wad_app",
    host: "localhost",
    port: "5432"
});

const postsData = require('./seedPosts');

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

        const { rows } = await pool.query('SELECT COUNT(*) FROM posts');
        if (parseInt(rows[0].count) === 0) {
            console.log("Seeding posts...");
            for (const post of postsData) {
                await pool.query(
                    `INSERT INTO posts (author, author_email, author_avatar, content, image, likes)
                     VALUES ($1, $2, $3, $4, $5, $6)`,
                    [post.author, post.authorEmail, post.authorAvatar, post.content, post.image, post.likes]
                );
            }
            console.log("Posts seeded successfully.");
        } else {
            console.log("Posts table already populated, skipping seeding.");
        }

    } catch (err) {
        console.error("Error creating tables or seeding:", err);
    }
}

module.exports = { pool, initializeDatabase };