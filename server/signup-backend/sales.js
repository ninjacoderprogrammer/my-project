// filepath: c:\Users\bhard\Desktop\my-project\server\signup-backend\sales.js
const express = require('express');
const pool = require('./db');
const verifyToken = require('./middleware/authMiddleware');
const router = express.Router();

// Get Sales Data
router.get('/sales', verifyToken, async (req, res) => {
  try {
    const sales = await pool.query(
      `SELECT id, product_id, total_quantity, 
              CAST(total_revenue AS NUMERIC) AS total_revenue, 
              sales_date 
       FROM sales 
       ORDER BY sales_date DESC`
    );
    res.status(200).json(sales.rows);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Filter Sales Data
router.get('/sales/filter', verifyToken, async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const sales = await pool.query(
      `SELECT * FROM sales
       WHERE sales_date BETWEEN $1 AND $2
       ORDER BY sales_date DESC`,
      [start_date, end_date]
    );
    res.status(200).json(sales.rows);
  } catch (error) {
    console.error('Error filtering sales data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Sales Table
router.post('/sales/update', verifyToken, async (req, res) => {
  const { product_id, quantity, total_price } = req.body;
  try {
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
    res.status(200).json({ message: 'Sales table updated successfully' });
  } catch (error) {
    console.error('Error updating sales table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Top-Selling Products
router.get('/sales/top-products', verifyToken, async (req, res) => {
  try {
    const topProducts = await pool.query(
      `SELECT p.name, s.product_id, SUM(s.total_quantity) AS total_quantity, SUM(s.total_revenue) AS total_revenue
       FROM sales s
       JOIN products p ON s.product_id = p.id
       GROUP BY s.product_id, p.name
       ORDER BY total_quantity DESC
       LIMIT 5`
    );
    res.status(200).json(topProducts.rows);
  } catch (error) {
    console.error('Error fetching top-selling products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;