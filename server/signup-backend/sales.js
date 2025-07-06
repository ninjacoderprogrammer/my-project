const express = require('express');
const pool = require('./db');
const verifyToken = require('./middleware/authMiddleware');
const router = express.Router();

// Get Sales Data
router.get('/', verifyToken, async (req, res) => {
  try {
    const sales = await pool.query(
      `SELECT 
          id, 
          product_id, 
          product_name, 
          product_category, 
          total_quantity, 
          CAST(total_revenue AS NUMERIC) AS total_revenue, 
          sales_date 
        FROM sales 
        ORDER BY sales_date DESC, id DESC`
    );
    res.status(200).json(sales.rows);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Filter Sales Data
router.get('/filter', verifyToken, async (req, res) => {
  const { start_date, end_date } = req.query;

  // Validate input
  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'Both start_date and end_date are required in query parameters.' });
  }

  try {
    const sales = await pool.query(
      `SELECT 
          id, 
          product_id, 
          product_name, 
          product_category, 
          total_quantity, 
          CAST(total_revenue AS NUMERIC) AS total_revenue, 
          sales_date 
        FROM sales
        WHERE sales_date BETWEEN $1 AND $2
        ORDER BY sales_date DESC, id DESC`,
      [start_date, end_date]
    );
    res.status(200).json(sales.rows);
  } catch (error) {
    console.error('Error filtering sales data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Sales Table
router.post('/update', verifyToken, async (req, res) => {
  const { product_id, quantity, total_price } = req.body;

  // Validate input
  if (!product_id || !quantity || !total_price) {
    return res.status(400).json({ error: 'product_id, quantity, and total_price are required.' });
  }

  try {
    // Get product name and category from products table
    const productInfo = await pool.query(
      `SELECT name, category FROM products WHERE id = $1`,
      [product_id]
    );

    if (productInfo.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { name, category } = productInfo.rows[0];

    // Insert or update sales record for the current date and product
    await pool.query(
      `INSERT INTO sales (product_id, total_quantity, total_revenue, sales_date, product_name, product_category)
       VALUES ($1, $2, $3, CURRENT_DATE, $4, $5)
       ON CONFLICT (product_id, sales_date)
       DO UPDATE SET
         total_quantity = sales.total_quantity + $2,
         total_revenue = sales.total_revenue + $3,
         product_name = $4,
         product_category = $5`,
      [product_id, quantity, total_price, name, category]
    );

    res.status(200).json({ message: 'Sales table updated successfully' });
  } catch (error) {
    console.error('Error updating sales table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Top 10 Selling Products
router.get('/top-products', verifyToken, async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    let queryText = `
      SELECT 
        s.product_name AS name, 
        s.product_id, 
        SUM(s.total_quantity) AS total_quantity, 
        SUM(s.total_revenue) AS total_revenue
      FROM sales s`; // Alias sales table as 's'
    
    const queryParams = [];
    let placeholderIndex = 1;

    if (start_date && end_date) {
      queryText += ` WHERE s.sales_date BETWEEN $${placeholderIndex++} AND $${placeholderIndex++}`;
      queryParams.push(start_date);
      queryParams.push(end_date);
    }
    
    queryText += `
      GROUP BY s.product_id, s.product_name
      ORDER BY SUM(s.total_quantity) DESC
      LIMIT 10`;

    const topProducts = await pool.query(queryText, queryParams);
    res.status(200).json(topProducts.rows);
  } catch (error) {
    console.error('Error fetching top-selling products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update product_name and product_category in sales table from products table
router.post('/update-product-info', verifyToken, async (req, res) => {
  try {
    await pool.query(
      `UPDATE sales s
        SET product_name = p.name,
            product_category = p.category
        FROM products p
        WHERE s.product_id = p.id`
    );

    res.status(200).json({ message: 'Product information updated successfully in sales table' });
  } catch (error) {
    console.error('Error updating product information in sales table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;