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

// Luxury gold palette (admin panel is always dark)
const GOLD = "#D9A44D";
const CARD = "#231E18";
const BORDER = "rgba(217, 164, 77, 0.2)";
const TEXT = "#ECE3D0";
const MUTED = "#A49B8A";

const chartLegend = { labels: { color: TEXT } };
const chartTicks = {
  x: { ticks: { color: MUTED }, grid: { color: "rgba(217,164,77,0.08)" } },
  y: { ticks: { color: MUTED }, grid: { color: "rgba(217,164,77,0.08)" } },
};

const AdminAnalytics = () => {
  const [orders, setOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter]);

  const fetchOrders = async () => {
    try {
      const params = dateFilter === "all" ? "" : `?filter=${dateFilter}`;
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders${params}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // === Derived data ===
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const avgOrderValue = orders.length ? Math.round(totalRevenue / orders.length) : 0;

  const processChartData = () => {
    const revenueByDate = {};
    const orderStatusCount = { Pending: 0, Preparing: 0, Completed: 0, Cancelled: 0 };
    const ordersPerDay = {};
    const itemSales = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      revenueByDate[date] = (revenueByDate[date] || 0) + order.totalPrice;
      orderStatusCount[order.status] = (orderStatusCount[order.status] || 0) + 1;
      ordersPerDay[date] = (ordersPerDay[date] || 0) + 1;

      (order.items || []).forEach((item) => {
        if (!itemSales[item.name]) {
          itemSales[item.name] = { quantity: 0, revenue: 0 };
        }
        itemSales[item.name].quantity += item.quantity || 0;
        itemSales[item.name].revenue += (item.price || 0) * (item.quantity || 0);
      });
    });

    const topItems = Object.entries(itemSales)
      .sort((a, b) => b[1].quantity - a[1].quantity)
      .slice(0, 5);

    return { revenueByDate, orderStatusCount, ordersPerDay, topItems };
  };

  const { revenueByDate, orderStatusCount, ordersPerDay, topItems } = processChartData();

  // === Chart Data ===
  const revenueChartData = {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        label: "Revenue (Rs.)",
        data: Object.values(revenueByDate),
        borderColor: GOLD,
        backgroundColor: "rgba(217, 164, 77, 0.2)",
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
          "#facc15", // yellow — pending
          "#3b82f6", // blue — preparing
          "#10b981", // green — completed
          "#ef4444", // red — cancelled
        ],
        borderColor: CARD,
      },
    ],
  };

  const ordersPerDayChartData = {
    labels: Object.keys(ordersPerDay),
    datasets: [
      {
        label: "Orders Per Day",
        data: Object.values(ordersPerDay),
        backgroundColor: GOLD,
        borderRadius: 8,
      },
    ],
  };

  const cardStyle = {
    backgroundColor: CARD,
    border: `1px solid ${BORDER}`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#16130F]" style={{ color: TEXT }}>
      {/* Header */}
      <div className="py-6 px-6 md:px-12 border-b" style={{ borderColor: BORDER }}>
        <h1 className="font-display text-3xl md:text-4xl font-semibold capitalize text-center md:text-left text-[#D9A44D]">
          Analytics
        </h1>
        <p className="mt-1 text-center md:text-left" style={{ color: MUTED }}>
          Track your restaurant&apos;s performance and insights at a glance
        </p>
      </div>

      {/* Filter */}
      <div className="px-6 md:px-12 py-4 flex flex-wrap gap-3 items-center">
        {["all", "today", "week", "month"].map((type) => (
          <button
            key={type}
            onClick={() => setDateFilter(type)}
            className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
              dateFilter === type
                ? "bg-[#D9A44D] text-[#1c1812] shadow-md"
                : "border border-[#D9A44D]/30 text-[#A49B8A] hover:text-[#D9A44D] hover:bg-[#D9A44D]/10"
            }`}
          >
            {type === "all" ? "All Time" : type === "today" ? "Today" : type === "week" ? "This Week" : "This Month"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1 p-6 md:p-12 space-y-8">
        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { title: "Total Orders", value: orders.length, valueClass: "text-[#D9A44D]" },
            { title: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, valueClass: "text-green-400" },
            { title: "Avg Order Value", value: `Rs. ${avgOrderValue.toLocaleString()}`, valueClass: "text-blue-400" },
            { title: "Pending Orders", value: pendingOrders, valueClass: "text-yellow-400" },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl p-5 text-center" style={cardStyle}>
              <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: MUTED }}>
                {card.title}
              </h2>
              <p className={`font-display text-2xl md:text-3xl font-semibold mt-2 ${card.valueClass}`}>
                {card.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Revenue Trend */}
        <div className="rounded-2xl shadow-lg p-6 md:p-8" style={cardStyle}>
          <h2 className="font-display text-2xl font-semibold capitalize mb-4 text-[#D9A44D]">
            Revenue Trend
          </h2>
          <div className="h-72 md:h-96">
            <Line
              data={revenueChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: "bottom", ...chartLegend } },
                scales: chartTicks,
              }}
            />
          </div>
        </div>

        {/* Order Status + Top Items side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl shadow-lg p-6 md:p-8" style={cardStyle}>
            <h2 className="font-display text-2xl font-semibold capitalize mb-4 text-[#D9A44D]">
              Order Status Breakdown
            </h2>
            <div className="h-72 flex justify-center">
              <Pie
                data={orderStatusChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom", ...chartLegend } },
                }}
              />
            </div>
          </div>

          {/* Top Selling Items */}
          <div className="rounded-2xl shadow-lg p-6 md:p-8" style={cardStyle}>
            <h2 className="font-display text-2xl font-semibold capitalize mb-4 text-[#D9A44D]">
              Top Selling Items
            </h2>
            {topItems.length === 0 ? (
              <p style={{ color: MUTED }}>No sales data for this period.</p>
            ) : (
              <ul className="space-y-3">
                {topItems.map(([name, data], index) => (
                  <li
                    key={name}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#16130F] border border-[#D9A44D]/15"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-semibold text-[#D9A44D] w-6">
                        {index + 1}.
                      </span>
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-[#D9A44D] font-semibold">{data.quantity} sold</div>
                      <div style={{ color: MUTED }}>Rs. {data.revenue.toLocaleString()}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Orders Per Day */}
        <div className="rounded-2xl shadow-lg p-6 md:p-8 mb-10" style={cardStyle}>
          <h2 className="font-display text-2xl font-semibold capitalize mb-4 text-[#D9A44D]">
            Orders Per Day
          </h2>
          <div className="h-72 md:h-96">
            <Bar
              data={ordersPerDayChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: chartTicks,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
