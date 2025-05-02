import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PerformPurchase = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cart, setCart] = useState([]); // Cart state
  const [message, setMessage] = useState('');

  // Fetch product list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/products/stock', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle product selection
  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  // Add item to cart
  const handleAddToCart = () => {
    if (!selectedProduct || !quantity) {
      setMessage('Please select a product and quantity.');
      return;
    }

    const product = products.find((p) => p.id === parseInt(selectedProduct));
    if (!product) {
      setMessage('Invalid product selected.');
      return;
    }

    if (quantity > product.stock) {
      setMessage('Insufficient stock for the selected product.');
      return;
    }

    // Add item to cart
    const item = {
      id: product.id,
      name: product.name,
      quantity,
      price: Number(product.price),
      total: Number(product.price) * quantity,
    };

    setCart([...cart, item]);
    setSelectedProduct('');
    setQuantity('');
    setMessage('');
  };
  
  // Handle purchase submission
  const handlePurchase = async () => {
    if (cart.length === 0) {
      setMessage('Your cart is empty.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/transactions',
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message || 'Purchase successful!');
      setCart([]); // Clear the cart
      window.location.reload(); // Refresh the page to update stock
    } catch (error) {
      console.error('Error performing purchase:', error.response?.data || error.message);
      setMessage(error.response?.data?.error || 'Purchase failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Perform Purchase</h1>

      {/* Product Selection */}
      <div>
        <label>Product:</label>
        <select value={selectedProduct} onChange={handleProductChange} required>
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (Stock: {product.stock}, Price: ${Number(product.price).toFixed(2)})
            </option>
          ))}
        </select>

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          required
        />

        <button type="button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      {/* Cart */}
      <h2>Cart</h2>
      {cart.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Total Price */}
      <h3>
        Total Price: $
        {cart.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
      </h3>

      {/* Purchase Button */}
      <button type="button" onClick={handlePurchase}>
        Purchase
      </button>

      {/* Message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PerformPurchase;