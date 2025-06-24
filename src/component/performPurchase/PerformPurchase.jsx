import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import config from '../../config/config';

const PerformPurchase = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cart, setCart] = useState([]); // Cart state
  const [message, setMessage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Fetch product list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.BACKEND_SERVER_URL}/api/products/stock`, {
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
    // Basic validation for customer details (optional, but good practice)
    if (!customerName.trim()) {
      setMessage("Please enter the customer's name.");
      return;
    }
    // Phone validation: allow digits, spaces, +, -, ()
    // Allow empty phone number as it's optional
    if (customerPhone.trim() && !/^[\d\s()+-]*$/.test(customerPhone)) {
        setMessage('Please enter a valid customer phone number (digits, spaces, +, -, () allowed).');
        return;
    }


    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.BACKEND_SERVER_URL}/api/transactions`,
        { 
          items: cart,
          customer_name: customerName,
          customer_phone: customerPhone
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // setMessage(response.data.message || 'Purchase successful!');
      // setCart([]); // Clear the cart
      // window.location.reload(); // Refresh the page to update stock

      if (response.data && response.data.bill) {
        // Navigate to the print bill page with bill data
        navigate('/cashier-dashboard/print-bill', { state: { bill: response.data.bill } });
      } else {
        // Fallback if bill data is not in response, though it should be
        setMessage(response.data.message || 'Purchase successful! Bill data missing.');
        setCart([]);
        // Optionally, still refresh or redirect to a generic success page
      }

    } catch (error) {
      console.error('Error performing purchase:', error.response?.data || error.message);
      setMessage(error.response?.data?.error || 'Purchase failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Perform Purchase</h1>

      {/* Customer Details Inputs */}
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label htmlFor="customerName">Customer Name: </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            required 
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="customerPhone">Customer Phone: </label>
          <input
            type="tel"
            id="customerPhone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="Enter customer phone (optional)"
          />
        </div>
      </div>

      {/* Product Selection */}
      <div>
        <label>Product:</label>
        <select value={selectedProduct} onChange={handleProductChange} required>
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (Stock: {product.stock}, Price: ₹{Number(product.price).toFixed(2)})
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
                <td>₹{item.price.toFixed(2)}</td>
                <td>₹{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Total Price */}
      <h3>
        Total Price: ₹
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