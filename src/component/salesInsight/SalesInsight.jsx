import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "../../styles/theme.css";
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
  // State to store sales data (currently unused, consider if needed for other features)
  // const [sales, setSales] = useState([]); 

  const [topProducts, setTopProducts] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Start with loading true

  // Function to fetch top products, optionally filtered by date
  const fetchTopProductsData = async (startDateFilter, endDateFilter) => {
    setIsLoading(true);
    setErrors(prev => ({ ...prev, topProducts: null })); // Clear previous top products error
    try {
      const token = localStorage.getItem("token");
      let url = "http://localhost:5000/api/sales/top-products";
      const params = {};
      if (startDateFilter) {
        params.start_date = startDateFilter;
      }
      if (endDateFilter) {
        params.end_date = endDateFilter;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params, // Send params object directly
      });

      if (response.data && Array.isArray(response.data)) {
        setTopProducts(response.data);
        if (response.data.length === 0) {
          setErrors(prev => ({ ...prev, topProducts: "No products found for the selected criteria." }));
        }
      } else {
        setTopProducts([]); // Clear data on invalid format
        setErrors(prev => ({ ...prev, topProducts: "Received invalid data format for top products." }));
      }
    } catch (err) {
      console.error("Top products fetch error:", err.response || err);
      setTopProducts([]); // Clear data on error
      let errorMessage = "Failed to fetch top-selling products. Please try again.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setErrors(prev => ({ ...prev, topProducts: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
    const defaultStartDate = thirtyDaysAgo.toISOString().split('T')[0];
    const defaultEndDate = today.toISOString().split('T')[0];
    
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);

    fetchTopProductsData(defaultStartDate, defaultEndDate);
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setErrors(prev => ({ ...prev, topProducts: "Please select both a start and end date."}));
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setErrors(prev => ({ ...prev, topProducts: "Start date cannot be after end date."}));
      return;
    }
    fetchTopProductsData(startDate, endDate);
  };
  
  const handleClearFilters = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
    const defaultStartDate = thirtyDaysAgo.toISOString().split('T')[0];
    const defaultEndDate = today.toISOString().split('T')[0];
    
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setErrors(prev => ({ ...prev, topProducts: null }));
    fetchTopProductsData(defaultStartDate, defaultEndDate);
  };

  const chartData = {
    labels: topProducts.map((product) => product.name || 'Unnamed Product'), // Ensure name exists
    datasets: [
      {
        label: "Total Quantity Sold", // Label for the dataset
        data: topProducts.map((product) => product.total_quantity), // Use total quantities as data points
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1, // Border width
      },
      {
        label: "Total Revenue", // Label for the revenue dataset
        data: topProducts.map((product) => product.total_revenue), // Use total revenues as data points
        backgroundColor: "rgba(160, 199, 116, 0.6)", // Bar color for revenue
        borderColor: "rgba(160, 199, 116, 1)", // Border color for revenue
        borderWidth: 1, // Border width for revenue
      },
    ],
  };

  return (
    <div className="container">
      {/* Page title */}
      <h2 className="form-title">Sales Insights</h2>

      {/* Date Filter Inputs */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="startDate">Start Date: </label>
        <input 
          type="date" 
          id="startDate" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          style={{ marginRight: '10px' }}
        />
        <label htmlFor="endDate">End Date: </label>
        <input 
          type="date" 
          id="endDate" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleFilter} disabled={!startDate || !endDate || isLoading}>
          Apply Filter
        </button>
        <button onClick={handleClearFilters} disabled={isLoading} style={{ marginLeft: '10px' }}>
          Clear Filters & Show Last 30 Days
        </button>
      </div>

      {errors.topProducts && 
        <p 
          className="form-message error" 
          style={{ color: topProducts.length === 0 && errors.topProducts === "No products found for the selected criteria." ? 'orange' : 'red' }}
        >
          {errors.topProducts}
        </p>
      }

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
            !isLoading && !errors.topProducts && topProducts.length === 0 && 
            <p>No product data available to display chart for the current selection.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SalesInsights;