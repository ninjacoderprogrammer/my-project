const express = require('express');
const pool = require('./db');
const verifyToken = require('./middleware/authMiddleware');
const router = express.Router();

// Record a Transaction
router.post('/', verifyToken, async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items array is required and cannot be empty.' });
  }

  const client = await pool.connect(); // Get a client from the pool for transaction management

  try {
    await client.query('BEGIN'); // Start a database transaction

    const billItems = [];
    let grandTotal = 0;
    let lastTransactionDate; // To store the date of the last processed transaction item

    for (const item of items) {
      const { id: product_id, quantity } = item;

      if (!product_id || !quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Each item must have product ID and quantity.' });
      }
      if (typeof quantity !== 'number' || quantity <= 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Quantity must be a positive number.' });
      }

      const productResult = await client.query('SELECT * FROM products WHERE id = $1 FOR UPDATE', [product_id]);
      if (productResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: `Product with ID ${product_id} not found.` });
      }

      const productDetails = productResult.rows[0];
      if (productDetails.stock < quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: `Insufficient stock for product ${productDetails.name}. Available: ${productDetails.stock}` });
      }

      const itemTotalPrice = productDetails.price * quantity;
      grandTotal += itemTotalPrice;

      await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [quantity, product_id]);

      const newTransaction = await client.query(
        'INSERT INTO transactions (product_id, quantity, total_price) VALUES ($1, $2, $3) RETURNING id, transaction_date',
        [product_id, quantity, itemTotalPrice]
      );
      lastTransactionDate = newTransaction.rows[0].transaction_date; // Capture the transaction date
      
      // For bill generation, we need product name and price per unit as well
      billItems.push({
        transaction_id: newTransaction.rows[0].id,
        product_id: product_id,
        product_name: productDetails.name, // Assuming 'name' is the column for product name
        quantity: quantity,
        price_per_unit: productDetails.price,
        total_price_for_item: itemTotalPrice,
      });

      // Update sales table (consider if this should be part of the main transaction or separate)
      // For now, keeping it within the transaction
      await client.query(
        `INSERT INTO sales (product_id, product_name, product_category, total_quantity, total_revenue, sales_date)
         VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
         ON CONFLICT (product_id, sales_date)
         DO UPDATE SET
           total_quantity = sales.total_quantity + $4,
           total_revenue = sales.total_revenue + $5,
           product_name = $2, 
           product_category = $3`,
        [product_id, productDetails.name, productDetails.category, quantity, itemTotalPrice]
      );
    }

    await client.query('COMMIT'); // Commit the transaction if all items are processed
    
    // Generate a unique bill ID (could be the first transaction ID or a new UUID)
    const billId = billItems.length > 0 ? billItems[0].transaction_id : null; 
    const billDate = lastTransactionDate || new Date(); // Use the captured date, or fallback


    res.status(201).json({
      message: 'Transaction recorded successfully. Bill generated.',
      bill: {
        bill_id: billId, // Or generate a more robust unique bill ID
        bill_date: billDate, // This will be the timestamp of the last item's transaction record
        items: billItems,
        grand_total: grandTotal,
      }
    });

  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on any error
    console.error('Error recording transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release(); // Release the client back to the pool
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