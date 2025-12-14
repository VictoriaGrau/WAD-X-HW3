const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { pool, initializeDatabase } = require('./database');

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
        res.json({ 
            message: "Signup successful",
            token: token
        });

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
        res.json({ 
            message: "Login successful",
            token: token
        });

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

// Post a post
app.post('/posts', authenticateToken, async (req, res) => {
    const { content, image } = req.body;
    
    try {
        // placeholder
        const author = req.user.email.split('@')[0];
        const author_email = req.user.email;
        const author_avatar = "/assets/avatar-default.svg";
        
        await pool.query(
            `INSERT INTO posts (author, author_email, author_avatar, content, image, likes) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [author, author_email, author_avatar, content, image || null, 0]
        );

        res.json({ message: "Post added" });
    } catch (err) {
        console.error("Add post error:", err);
        res.status(500).json({ error: "Failed to add post" });
    }
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

app.post('/posts/:id/like', authenticateToken, async (req, res) => {
    const postId = req.params.id;

    try {
        const result = await pool.query(
            `UPDATE posts 
             SET likes = likes + 1 
             WHERE id = $1 
             RETURNING likes`,
            [postId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({
            message: "Liked!",
            likes: result.rows[0].likes
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.delete('/posts/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    await pool.query(
        "DELETE FROM posts WHERE id=$1",
        [id]
    );

    res.json({ message: "Post deleted" });
});

app.post('/posts/:id/clear-likes', authenticateToken, async (req, res) => {
    const postId = req.params.id;

    try {
        const result = await pool.query(
            `UPDATE posts 
             SET likes = 0 
             WHERE id = $1 
             RETURNING likes, id`,
            [postId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({
            message: "All likes cleared!",
            postId: result.rows[0].id,
            likes: result.rows[0].likes
        });

    } catch (err) {
        console.error("Clear likes error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log("BACKEND SERVER");
        console.log("Listening on port " + port);
    });
});