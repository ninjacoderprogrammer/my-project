import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setMessage('Failed to fetch products. Please try again.');
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/products',
        { name, price, stock },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Product added successfully!');
      // Add the new product to the list
      setProducts([...products, response.data]); 
      setName('');
      setPrice('');
      setStock('');
      setCategory('');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product. Please try again.');
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      <form onSubmit={handleAddProduct}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      {message && (
        <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}

      <h2>Existing Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} (Stock: {product.stock})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;