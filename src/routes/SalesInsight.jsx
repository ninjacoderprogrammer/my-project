import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "../styles/theme.css"; // Global theme
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
  // State to store sales data
  const [sales, setSales] = useState([]);

  // State to store top-selling products
  const [topProducts, setTopProducts] = useState([]);

  // State to store date range for filtering sales
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // State to store error messages
  const [error, setError] = useState("");

  // Fetch sales data and top-selling products when the component mounts
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const response = await axios.get("http://localhost:5000/api/sales", {
          headers: { Authorization: `Bearer ${token}` }, // Pass the token in the request headers
        });
        setSales(response.data); // Update the sales state with the fetched data
      } catch (err) {
        setError("Failed to fetch sales data. Please try again."); // Set error message if the request fails
      }
    };

    const fetchTopProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const response = await axios.get("http://localhost:5000/api/sales/top-products", {
          headers: { Authorization: `Bearer ${token}` }, // Pass the token in the request headers
        });
        setTopProducts(response.data); // Update the topProducts state with the fetched data
      } catch (err) {
        setError("Failed to fetch top-selling products. Please try again."); // Set error message if the request fails
      }
    };

    fetchSales(); // Fetch sales data
    fetchTopProducts(); // Fetch top-selling products
  }, []);

  // Prepare data for the bar chart
  const chartData = {
    labels: topProducts.map((product) => product.name), // Use product names as labels
    datasets: [
      {
        label: "Total Quantity Sold", // Label for the dataset
        data: topProducts.map((product) => product.total_quantity), // Use total quantities as data points
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1, // Border width
      },
    ],
  };

  return (
    <div className="container">
      {/* Page title */}
      <h2 className="form-title">Sales Insights</h2>

      {/* Display error message if any */}
      {error && <p className="form-message error">{error}</p>}

      {/* Render the bar chart */}
      <Bar
        data={chartData}
        options={{
          responsive: true, // Make the chart responsive
          plugins: {
            legend: { position: "top" }, // Position the legend at the top
          },
        }}
      />
    </div>
  );
};

export default SalesInsights;