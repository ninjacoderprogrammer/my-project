const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const verifyToken = require('./middleware/authMiddleware');

const router = express.Router();

// Protected Route Example
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
  });

// Signup API
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO admin (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, role || 'cashier'] // Default role is 'cashier'
    );
    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login API
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required.' });
  }

  try {
    let tableName;
    if (role === 'admin') {
      tableName = 'admin';
    } else if (role === 'cashier') {
      tableName = 'cashiers';
    } else {
      return res.status(400).json({ error: 'Invalid role selected.' });
    }

    // Query the appropriate table
    const user = await pool.query(`SELECT * FROM ${tableName} WHERE email = $1`, [email]);
    if (user.rows.length === 0) {
      console.log("noLogin");
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate a token
    const token = jwt.sign({ id: user.rows[0].id, role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, role });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;