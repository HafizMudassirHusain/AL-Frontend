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
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`);
      let filteredOrders = response.data;

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

  const revenueChartData = {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        label: "Total Revenue (Rs.)",
        data: Object.values(revenueByDate),
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

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

  const ordersPerDayChartData = {
    labels: Object.keys(ordersPerDay),
    datasets: [
      {
        label: "Orders Per Day",
        data: Object.values(ordersPerDay),
        backgroundColor: "#3b82f6",
        borderRadius: 8,
      },
    ],
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-extrabold text-white mb-3"
          >
            📊 Admin Dashboard
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Track performance, manage orders, and visualize your growth trends.
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { title: "Total Orders", value: orders.length, color: "from-orange-500 to-orange-600" },
            { title: "Pending Orders", value: pendingOrders, color: "from-yellow-400 to-yellow-500" },
            { title: "Total Revenue", value: `Rs. ${totalRevenue}`, color: "from-green-500 to-green-600" },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`bg-gradient-to-br ${card.color} shadow-xl rounded-2xl p-6 text-center text-white transform hover:scale-105 transition duration-300`}
            >
              <h2 className="text-lg font-semibold opacity-90">{card.title}</h2>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "today", "week", "month"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                filter === type
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {type === "all" ? "All Time" : type === "today" ? "Today" : type === "week" ? "This Week" : "This Month"}
            </button>
          ))}
        </motion.div>

        {/* Revenue Trend */}
        <motion.div variants={fadeInUp} className="bg-gray-800/60 backdrop-blur-lg shadow-lg rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">Revenue Trend</h2>
          <div className="h-64">
            <Line
              data={revenueChartData}
              options={{
                responsive: true,
                plugins: { legend: { labels: { color: "#fff" } } },
                scales: {
                  x: { ticks: { color: "#ccc" } },
                  y: { ticks: { color: "#ccc" } },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Order Status */}
        <motion.div variants={fadeInUp} className="bg-gray-800/60 backdrop-blur-lg shadow-lg rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">Order Status Breakdown</h2>
          <div className="h-64">
            <Pie
              data={orderStatusChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { labels: { color: "#fff" } },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Orders Per Day */}
        <motion.div variants={fadeInUp} className="bg-gray-800/60 backdrop-blur-lg shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">Orders Per Day</h2>
          <div className="h-64">
            <Bar
              data={ordersPerDayChartData}
              options={{
                responsive: true,
                plugins: { legend: { labels: { color: "#fff" } } },
                scales: {
                  x: { ticks: { color: "#ccc" } },
                  y: { ticks: { color: "#ccc" } },
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
