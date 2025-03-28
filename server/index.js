const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import PostgreSQL connection

const app = express();
app.use(cors());
app.use(express.json()); // Allows JSON requests

// 🟢 API to Get All Users
app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// 🟢 API to Add a User
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});