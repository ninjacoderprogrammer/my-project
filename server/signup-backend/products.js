const express = require('express');
const pool = require('./db');
const verifyToken = require('./middleware/authMiddleware');
const checkRole = require('./middleware/roleMiddleware');
const router = express.Router();

//test route
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Products route is working!' });
  });

// Admin-only route to add a product
router.post('/', verifyToken, checkRole('admin'), async (req, res) => {
  const { name, price, stock } = req.body;

  try {
    const newProduct = await pool.query(
      'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
      [name, price, stock]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get All Products
router.get('/', verifyToken, async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    res.status(200).json(products.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cashier-only route to view stock
router.get('/stock', verifyToken, checkRole('cashier'), async (req, res) => {
  try {
    const products = await pool.query('SELECT id, name, stock, price FROM products');
    res.status(200).json(products.rows);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a Product
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const updatedProduct = await pool.query(
      'UPDATE products SET name = $1, price = $2, stock = $3 WHERE id = $4 RETURNING *',
      [name, price, stock, id]
    );

    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct.rows[0] });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a Product
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (deletedProduct.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct.rows[0] });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;