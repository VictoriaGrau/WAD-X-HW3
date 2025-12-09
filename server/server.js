const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {pool, initializeDatabase} = require('./database');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = "SuperSecretKeyThatNobodyKnows";

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user; 
        next();
    });
}

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hashed]
        );

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true });
        res.json({ message: "Signup successful" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (userData.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = userData.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Wrong password" });

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true });
        res.json({ message: "Login successful" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/posts', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/posts', authenticateToken, async (req, res) => {
    const { content } = req.body;

    await pool.query(
        `INSERT INTO posts (author, author_email, author_avatar, content, image, likes) VALUES ($1, $2, $3, $4, $5, $6)`,
        [author, author_email, author_avatar, content, image, likes]
    );

    res.json({ message: "Post added" });
});

app.put('/posts/:id', authenticateToken, async (req, res) => {
    const { content } = req.body;
    const { id } = req.params;

    await pool.query(
        "UPDATE posts SET content=$1 WHERE id=$2",
        [content, id]
    );

    res.json({ message: "Post updated" });
});

app.delete('/posts/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    await pool.query(
        "DELETE FROM posts WHERE id=$1",
        [id]
    );

    res.json({ message: "Post deleted" });
});

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log("BACKEND SERVER");
        console.log("Listening on port " + port);
    });
});