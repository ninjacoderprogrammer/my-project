const express = require('express');
const pool = require('./db');
const verifyToken = require('./middleware/authMiddleware');
const checkRole = require('./middleware/roleMiddleware');
const router = express.Router();

// Add a Cashier (admin only)
router.post('/', verifyToken, checkRole('admin'), async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newCashier = await pool.query(
      'INSERT INTO cashiers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );
    res.status(201).json({ message: 'Cashier added successfully', cashier: newCashier.rows[0] });
  } catch (error) {
    console.error('Error adding cashier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin-only route to fetch cashiers
router.get('/', verifyToken, checkRole('admin'), async (req, res) => {
  try {
    const cashiers = await pool.query('SELECT id, name, email FROM users WHERE role = $1', ['cashier']);
    res.status(200).json(cashiers.rows);
  } catch (error) {
    console.error('Error fetching cashiers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a Cashier
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedCashier = await pool.query(
      'UPDATE cashiers SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
      [name, email, phone, id]
    );

    if (updatedCashier.rows.length === 0) {
      return res.status(404).json({ error: 'Cashier not found' });
    }

    res.status(200).json({ message: 'Cashier updated successfully', cashier: updatedCashier.rows[0] });
  } catch (error) {
    console.error('Error updating cashier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a Cashier
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCashier = await pool.query('DELETE FROM cashiers WHERE id = $1 RETURNING *', [id]);

    if (deletedCashier.rows.length === 0) {
      return res.status(404).json({ error: 'Cashier not found' });
    }

    res.status(200).json({ message: 'Cashier deleted successfully', cashier: deletedCashier.rows[0] });
  } catch (error) {
    console.error('Error deleting cashier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;