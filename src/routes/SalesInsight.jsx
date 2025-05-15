import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "../styles/theme.css";
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

  // State to store error messages (separated by source)
  const [errors, setErrors] = useState({});
  
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

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
        console.error("Sales fetch error:", err); // Log detailed error to console
        setErrors(prev => ({ ...prev, sales: "Failed to fetch sales data. Please try again." })); // Set error message if the request fails
      }
    };

    const fetchTopProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        console.log("Fetching top products with token:", token ? "Token exists" : "No token"); // Debug token existence
        
        const response = await axios.get("http://localhost:5000/api/sales/top-products", {
          headers: { Authorization: `Bearer ${token}` }, // Pass the token in the request headers
        });
        
        console.log("Top products response:", response.data); // Log the response data for debugging
        
        if (response.data && Array.isArray(response.data)) {
          setTopProducts(response.data); // Update the topProducts state with the fetched data
        } else {
          console.error("Invalid top products data format:", response.data); // Log error for non-array data
          setErrors(prev => ({ ...prev, topProducts: "Received invalid data format for top products." }));
        }
      } catch (err) {
        console.error("Top products fetch error:", err.response || err); // Log detailed error to console
        setErrors(prev => ({ ...prev, topProducts: "Failed to fetch top-selling products. Please try again." })); // Set error message if the request fails
      } finally {
        setIsLoading(false); // Set loading to false regardless of outcome
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

      {/* Display error messages if any */}
      {errors.sales && <p className="form-message error">{errors.sales}</p>}
      {errors.topProducts && <p className="form-message error">{errors.topProducts}</p>}

      {/* Show loading indicator or content based on loading state */}
      {isLoading ? (
        <p>Loading sales data...</p>
      ) : (
        <>
          {/* Only render the chart when we have data */}
          {topProducts.length > 0 ? (
            <Bar
              data={chartData}
              options={{
                responsive: true, // Make the chart responsive
                plugins: {
                  legend: { position: "top" }, // Position the legend at the top
                },
              }}
            />
          ) : (
            <p>No product data available to display chart.</p> // Fallback message when no data is available
          )}
        </>
      )}
    </div>
  );
};

export default SalesInsights;