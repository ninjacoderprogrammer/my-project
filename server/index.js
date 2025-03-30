const express = require('express');
const cors = require('cors');

// Database connection is used in controllers
const { createUser, get_all_users } = require('./controllers/auth');

const app = express();
app.use(cors());
app.use(express.json()); // Allows JSON requests

// 🟢 API to Get All Users
app.get('/users', get_all_users);

// 🟢 API to Add a User
app.post('/users', createUser);

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});