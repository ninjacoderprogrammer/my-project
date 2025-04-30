const express = require('express');
const pool = require('./db');
const verifyToken = require('./middleware/authMiddleware');
const router = express.Router();

// Record a Transaction
router.post('/', verifyToken, async (req, res) => {
  const { product_id, quantity } = req.body;

  // Validate the request body
  if (!product_id || !quantity) {
    return res.status(400).json({ error: 'Product ID and quantity are required.' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be a positive number.' });
  }

  try {
    // Verify that the product exists
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [product_id]);
    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const productDetails = product.rows[0];
    if (productDetails.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock.' });
    }

    const total_price = productDetails.price * quantity;

    // Deduct stock
    await pool.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [quantity, product_id]);

    // Insert into transactions table
    const newTransaction = await pool.query(
      'INSERT INTO transactions (product_id, quantity, total_price) VALUES ($1, $2, $3) RETURNING *',
      [product_id, quantity, total_price]
    );

    // Update sales table
    console.log('Updating sales table with:', product_id, quantity, total_price);
    await pool.query(
      `INSERT INTO sales (product_id, total_quantity, total_revenue, sales_date)
       VALUES ($1, $2, $3, CURRENT_DATE)
       ON CONFLICT (product_id, sales_date)
       DO UPDATE SET
         total_quantity = sales.total_quantity + $2,
         total_revenue = sales.total_revenue + $3`,
      [product_id, quantity, total_price]
    );
    console.log('Sales table updated successfully');

    res.status(201).json({ message: 'Transaction recorded successfully', transaction: newTransaction.rows[0] });
  } catch (error) {
    console.error('Error recording transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get All Transactions
router.get('/', verifyToken, async (req, res) => {
  try {
    const transactions = await pool.query('SELECT * FROM transactions');
    res.status(200).json(transactions.rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a Transaction by ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await pool.query('SELECT * FROM transactions WHERE id = $1', [id]);

    if (transaction.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json(transaction.rows[0]);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;