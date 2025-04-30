import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/products/stock', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    };

    fetchStock();
  }, []);

  return (
    <div>
      <h1>Product Stock</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>${Number(product.price).toFixed(2)}</td> {/* Convert price to number */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStock;