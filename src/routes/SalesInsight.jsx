import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesInsights = () => {
  const [sales, setSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  // Fetch all sales data
  const fetchSales = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/sales", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSales(response.data);
    } catch (err) {
      setError("Failed to fetch sales data. Please try again.");
    }
  };

  // Fetch top-selling products
  const fetchTopProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/sales/top-products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTopProducts(response.data);
    } catch (err) {
      setError("Failed to fetch top-selling products. Please try again.");
    }
  };

  // Filter sales by date
  const filterSalesByDate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/sales/filter", {
        headers: { Authorization: `Bearer ${token}` },
        params: { start_date: startDate, end_date: endDate },
      });
      setSales(response.data);
    } catch (err) {
      setError("Failed to filter sales data. Please try again.");
    }
  };

  useEffect(() => {
    fetchSales();
    fetchTopProducts();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: topProducts.map((product) => product.name),
    datasets: [
      {
        label: "Total Quantity Sold",
        data: topProducts.map((product) => product.total_quantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="sales-insights-container">
      <h2>Sales Insights</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Date Filter Form */}
      <form onSubmit={filterSalesByDate}>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit">Filter</button>
      </form>

      {/* Sales Table */}
      <h3>Sales Data</h3>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Total Quantity</th>
            <th>Total Revenue</th>
            <th>Sales Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.product_id}</td>
              <td>{sale.total_quantity}</td>
              <td>${(Number(sale.total_revenue) || 0).toFixed(2)}</td> {/* Convert to number */}
              <td>{new Date(sale.sales_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Top-Selling Products */}
      <h3>Top-Selling Products</h3>
      <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
    </div>
  );
};

export default SalesInsights;