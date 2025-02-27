import { useEffect, useState } from "react";
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
import { motion } from "framer-motion";

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

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      let filteredOrders = response.data;

      // Apply Date Filters
      const today = new Date();
      if (filter === "today") {
        filteredOrders = filteredOrders.filter(
          (order) => new Date(order.createdAt).toDateString() === today.toDateString()
        );
      } else if (filter === "week") {
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        filteredOrders = filteredOrders.filter(
          (order) => new Date(order.createdAt) >= lastWeek
        );
      } else if (filter === "month") {
        const thisMonth = today.getMonth();
        filteredOrders = filteredOrders.filter(
          (order) => new Date(order.createdAt).getMonth() === thisMonth
        );
      }

      setOrders(filteredOrders);
      setTotalRevenue(filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0));
      setPendingOrders(filteredOrders.filter((order) => order.status === "Pending").length);
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

      // Revenue Trend Data
      revenueByDate[date] = (revenueByDate[date] || 0) + order.totalPrice;

      // Order Status Data
      orderStatusCount[order.status] = (orderStatusCount[order.status] || 0) + 1;

      // Orders Per Day Data
      ordersPerDay[date] = (ordersPerDay[date] || 0) + 1;
    });

    return { revenueByDate, orderStatusCount, ordersPerDay };
  };

  const { revenueByDate, orderStatusCount, ordersPerDay } = processChartData();

  // Revenue Chart Data
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

  // Order Status Distribution
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

  // Orders Per Day Chart
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Manage and analyze your orders and revenue.
          </motion.p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <h2 className="text-lg font-semibold text-gray-800">Pending Orders</h2>
            <p className="text-2xl font-bold text-gray-800">{pendingOrders}</p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <h2 className="text-lg font-semibold text-gray-800">Total Revenue</h2>
            <p className="text-2xl font-bold text-gray-800">Rs. {totalRevenue}</p>
          </motion.div>
        </motion.div>

        {/* Date Filters */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap gap-4 mb-12"
        >
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              filter === "all" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setFilter("today")}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              filter === "today" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter("week")}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              filter === "week" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              filter === "month" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            This Month
          </button>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          variants={fadeInUp}
          className="bg-white shadow-lg rounded-lg p-6 mb-12"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trend</h2>
          <div className="h-64">
            <Line
              data={revenueChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </motion.div>

        {/* Order Status Distribution */}
        <motion.div
          variants={fadeInUp}
          className="bg-white shadow-lg rounded-lg p-6 mb-12"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Status Breakdown</h2>
          <div className="h-64">
            <Pie
              data={orderStatusChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </motion.div>

        {/* Orders Per Day Chart */}
        <motion.div
          variants={fadeInUp}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders Per Day</h2>
          <div className="h-64">
            <Bar
              data={ordersPerDayChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;