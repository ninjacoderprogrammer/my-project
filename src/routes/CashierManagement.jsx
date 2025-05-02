import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CashierManagement = () => {
  const [cashiers, setCashiers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');

// fetch cashiers
 const fetchCashiers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/cashiers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCashiers(response.data);
      } catch (error) {
        console.error('Error fetching cashiers:', error);
      }
    };

  useEffect(() => {
   
    fetchCashiers();
  }, []);
      
// add new cashier
  const handleAddCashier = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/cashiers',
        { name, email, password, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Cashier added successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      fetchCashiers();
    } catch (error) {
      console.error('Error adding cashier:', error);
      setMessage('Failed to add cashier. Please try again.');
    }
  };

// delet cashier
  const handleDeleteCashier = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/cashiers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Cashier deleted successfully!');
      setCashiers(cashiers.filter((cashier) => cashier.id !== id)); // Update the UI by removing the deleted cashier
    } catch (error) {
      console.error('Error deleting cashier:', error);
      setMessage('Failed to delete cashier. Please try again.');
    }
  };

  return (
    <div>
      <h1>Cashier Management</h1>
      <form onSubmit={handleAddCashier}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9]{10}"
          title="Valid phone number"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add Cashier</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Existing Cashiers</h2>
      <ul>
        {cashiers.map((cashier) => (
          <li key={cashier.id}>
            {cashier.name} ({cashier.email})
            <button type="button" onClick={() => handleDeleteCashier(cashier.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CashierManagement;