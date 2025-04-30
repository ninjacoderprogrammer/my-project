const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const verifyToken = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./auth');
const productRoutes = require('./products');
const transactionRoutes = require('./transactions');
const salesRoutes = require('./sales');
const cashierRoutes = require('./cashiers');

app.use('/api/auth', authRoutes);
app.use('/api/products', verifyToken, productRoutes); // Protect product routes
app.use('/api/transactions', verifyToken, transactionRoutes); // Protect transaction routes
app.use('/api/sales', verifyToken, salesRoutes); // Protect sales routes
app.use('/api/cashiers', verifyToken, cashierRoutes); // Protect cashier routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));