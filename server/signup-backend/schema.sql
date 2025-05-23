-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Cashiers Table
CREATE TABLE IF NOT EXISTS cashiers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    category VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    cashier_id INT REFERENCES cashiers(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20) 
);

-- Consider creating a separate 'bills' or 'orders' table if a single transaction involves multiple products.
-- If a transaction always means one product line, then adding customer details here is fine.
-- If a 'transaction' in your current setup represents a single item in a larger bill, 
-- you might need a new table for overall bill details (bill_id, customer_name, customer_phone, total_amount, date)
-- and then link items from the current 'transactions' table to that bill_id.

-- For now, I'm adding to the existing transactions table as requested.

-- 5. Sales Table
CREATE TABLE IF NOT EXISTS sales (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    total_quantity INT NOT NULL,
    total_revenue NUMERIC(10, 2) NOT NULL,
    sales_date DATE DEFAULT CURRENT_DATE
);

-- Add a unique constraint if it doesn't exist
ALTER TABLE sales ADD CONSTRAINT unique_product_sales_date UNIQUE (product_id, sales_date);