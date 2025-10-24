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
  const [dateFilter, setDateFilter] = useState("today");
  const { theme } = useContext(ThemeContext);

  // === Restaurant Color Palette ===
  const accent = "#e63946"; // red accent
  const softBg = theme === "light" ? "#fff8f6" : "#121212";
  const cardBg = theme === "light" ? "#ffffff" : "#1e1e1e";
  const textColor = theme === "light" ? "#1a1a1a" : "#f5f5f5";
  const border = theme === "light" ? "#e5e5e5" : "#2b2b2b";

  useEffect(() => {
    fetchOrders();
  }, [dateFilter]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders?filter=${dateFilter}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const processChartData = () => {
    const revenueByDate = {};
    const orderStatusCount = {
      Pending: 0,
      Preparing: 0,
      Completed: 0,
      Cancelled: 0,
    };
    const ordersPerDay = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      revenueByDate[date] = (revenueByDate[date] || 0) + order.totalPrice;
      orderStatusCount[order.status] =
        (orderStatusCount[order.status] || 0) + 1;
      ordersPerDay[date] = (ordersPerDay[date] || 0) + 1;
    });

    return { revenueByDate, orderStatusCount, ordersPerDay };
  };

  const { revenueByDate, orderStatusCount, ordersPerDay } = processChartData();

  // === Chart Data ===
  const revenueChartData = {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        label: "Revenue (Rs.)",
        data: Object.values(revenueByDate),
        borderColor: accent,
        backgroundColor: "rgba(230, 57, 70, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const orderStatusChartData = {
    labels: Object.keys(orderStatusCount),
    datasets: [
      {
        data: Object.values(orderStatusCount),
        backgroundColor: [
          "#facc15", // yellow
          "#3b82f6", // blue
          "#10b981", // green
          "#ef4444", // red
        ],
        borderColor: border,
      },
    ],
  };

  const ordersPerDayChartData = {
    labels: Object.keys(ordersPerDay),
    datasets: [
      {
        label: "Orders Per Day",
        data: Object.values(ordersPerDay),
        backgroundColor: accent,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: softBg, color: textColor }}
    >
      {/* Header */}
      <div className="py-6 px-6 md:px-12 border-b" style={{ borderColor: border }}>
        <h1
          className="text-3xl md:text-4xl font-bold text-center md:text-left"
          style={{ color: accent }}
        >
          📊 Admin Analytics Dashboard
        </h1>
        <p className="mt-1 text-gray-500 text-center md:text-left">
          Track your restaurant’s performance and insights at a glance
        </p>
      </div>

      {/* Filter */}
      <div className="px-6 md:px-12 py-4 flex flex-wrap gap-3 items-center">
        <label className="text-lg font-semibold">Filter by Date:</label>
        <select
          className="p-2 rounded-md border focus:outline-none shadow-sm"
          style={{
            backgroundColor: cardBg,
            color: textColor,
            borderColor: border,
          }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1 p-6 md:p-12 space-y-8">
        {/* Revenue Trend */}
        <div
          className="rounded-2xl shadow-lg p-6 md:p-8"
          style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: accent }}>
            💰 Revenue Trend
          </h2>
          <div className="h-72 md:h-96">
            <Line
              data={revenueChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: "bottom" } },
              }}
            />
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div
          className="rounded-2xl shadow-lg p-6 md:p-8"
          style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: accent }}>
            📦 Order Status Breakdown
          </h2>
          <div className="h-72 md:h-96 flex justify-center">
            <Pie
              data={orderStatusChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </div>

        {/* Orders Per Day */}
        <div
          className="rounded-2xl shadow-lg p-6 md:p-8 mb-10"
          style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: accent }}>
            📅 Orders Per Day
          </h2>
          <div className="h-72 md:h-96">
            <Bar
              data={ordersPerDayChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
