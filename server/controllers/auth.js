// For handling all the controllers relater to auth and users

// Importing database connection

const pool = require('../../backend/src/config/db');

// api to get all users
const get_all_users = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
}


// creating new User
const createUser = async (req, res) => {
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
}





module.exports = { createUser, get_all_users };