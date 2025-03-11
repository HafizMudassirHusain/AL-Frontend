import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { ThemeContext } from "../../context/ThemeContext";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const AdminAnalytics = () => {
  const [orders, setOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState("today"); // Default filter: Today

  useEffect(() => {
    fetchOrders();
  }, [dateFilter]);

  // Fetch Orders with Date Filter
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders?filter=${dateFilter}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Process Data for Charts
  const processChartData = () => {
    const revenueByDate = {};
    const orderStatusCount = { Pending: 0, Preparing: 0, Completed: 0, Cancelled: 0 };
    const ordersPerDay = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();

      revenueByDate[date] = (revenueByDate[date] || 0) + order.totalPrice;
      orderStatusCount[order.status] = (orderStatusCount[order.status] || 0) + 1;
      ordersPerDay[date] = (ordersPerDay[date] || 0) + 1;
    });

    return { revenueByDate, orderStatusCount, ordersPerDay };
  };

  const { revenueByDate, orderStatusCount, ordersPerDay } = processChartData();

  // Chart Data for Revenue Trend
  const revenueChartData = {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        label: "Total Revenue (Rs.)",
        data: Object.values(revenueByDate),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  // Chart Data for Order Status Distribution
  const orderStatusChartData = {
    labels: Object.keys(orderStatusCount),
    datasets: [
      {
        label: "Total Orders",
        data: Object.values(orderStatusCount),
        backgroundColor: ["#facc15", "#3b82f6", "#10b981", "#ef4444"],
      },
    ],
  };

  // Chart Data for Orders Per Day
  const ordersPerDayChartData = {
    labels: Object.keys(ordersPerDay),
    datasets: [
      {
        label: "Orders Per Day",
        data: Object.values(ordersPerDay),
        backgroundColor: "#10b981",
        borderRadius: 5,
      },
    ],
  };
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 px-4 md:px-10">Admin Analytics</h1>
  
      {/* Date Filter Dropdown */}
      <div className="px-4 md:px-10 mb-4 flex flex-wrap items-center gap-2">
        <label className="text-lg font-semibold whitespace-nowrap">Filter by Date:</label>
        <select
          className="p-2 border rounded w-full sm:w-auto"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
  
      {/* Scrollable Analytics Content */}
      <div className="overflow-y-auto flex-1 p-4 md:p-10 space-y-4 md:space-y-6 " style={{ maxHeight: "calc(100vh - 150px)" }}>
        
        {/* Revenue Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 md:p-5 w-full">
          <h2 className={`${theme === 'light' ? 'bg-white text-black' : ' text-black'} 
          text-lg md:text-xl font-semibold mb-2 md:mb-4`}>Revenue Trend</h2>
          <div className="flex justify-center w-full">
            <Line data={revenueChartData} options={{ responsive: true, maintainAspectRatio: false }} className="max-w-full h-auto" />
          </div>
        </div>
  
        {/* Order Status Distribution */}
        <div className="bg-white shadow-md rounded-lg p-4 md:p-5 w-full">
          <h2 className={`${theme === 'light' ? 'bg-white text-black' : ' text-black'} 
          text-lg md:text-xl font-semibold mb-2 md:mb-4`}>Order Status Breakdown</h2>
          <div className="flex justify-center w-full">
            <Pie data={orderStatusChartData} options={{ responsive: true, maintainAspectRatio: false }} className="max-w-full h-auto" />
          </div>
        </div>
  
        {/* Orders Per Day Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 md:p-5 mb-10 w-full">
          <h2 className={`${theme === 'light' ? 'bg-white text-black' : ' text-black'} 
          text-lg md:text-xl font-semibold mb-2 md:mb-4`}>Orders Per Day</h2>
          <div className="flex justify-center w-full">
            <Bar data={ordersPerDayChartData} options={{ responsive: true, maintainAspectRatio: false }} className="max-w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default AdminAnalytics;
