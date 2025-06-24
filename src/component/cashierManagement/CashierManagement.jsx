import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/theme.css"; // Global theme
import "./cashierManagement.css"; // Component-specific styles
import config from "../../config/config";

const CashierManagement = () => {
  const [cashiers, setCashiers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const fetchCashiers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.BACKEND_SERVER_URL}/api/cashiers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCashiers(response.data);
    } catch (error) {
      console.error("Error fetching cashiers:", error);
    }
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  const handleAddCashier = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${config.BACKEND_SERVER_URL}/api/cashiers`,
        { name, email, password, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Cashier added successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      fetchCashiers();
    } catch (error) {
      console.error("Error adding cashier:", error);
      setMessage("Failed to add cashier. Please try again.");
    }
  };

  const handleDeleteCashier = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`config.BACKEND_SERVER_URL/api/cashiers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Cashier deleted successfully!");
      setCashiers(cashiers.filter((cashier) => cashier.id !== id));
    } catch (error) {
      console.error("Error deleting cashier:", error);
      setMessage("Failed to delete cashier. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="cashier-management-title">Manage Cashiers</h1>
      <form onSubmit={handleAddCashier} className="card">
        <label className="form-label">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />
        <label className="form-label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <label className="form-label">Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-field"
          pattern="[0-9]{10}"
          title="Valid phone number"
          required
        />
        <label className="form-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="btn-primary">
          Add Cashier
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}

      <h2 className="cashier-list-title">Existing Cashiers</h2>
      <ul className="cashier-list">
        {cashiers.map((cashier) => (
          <li key={cashier.id} className="cashier-list-item">
            <span>
              {cashier.name}, {cashier.email}, {cashier.phone}
            </span>
            <button
              type="button"
              onClick={() => handleDeleteCashier(cashier.id)}
              className="btn-secondary"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CashierManagement;