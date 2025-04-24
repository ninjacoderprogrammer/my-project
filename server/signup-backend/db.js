const { Pool } = require('pg');
const pool = new Pool();

pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

module.exports = pool;