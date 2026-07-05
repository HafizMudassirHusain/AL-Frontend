import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiList, FiPlusCircle, FiBarChart2, FiImage, FiUsers } from "react-icons/fi";

const statusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "completed":
      return "text-green-400 border-green-500/50";
    case "preparing":
      return "text-blue-400 border-blue-500/50";
    case "cancelled":
      return "text-red-400 border-red-500/50";
    default:
      return "text-yellow-400 border-yellow-500/50"; // Pending
  }
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // === Overview stats ===
  const today = new Date().toDateString();
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const todaysOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today
  ).length;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const quickActions = [
    { name: "Manage Orders", path: "/admin/orders", icon: <FiList /> },
    { name: "Add Menu Item", path: "/admin/menu", icon: <FiPlusCircle /> },
    { name: "View Analytics", path: "/admin/analytics", icon: <FiBarChart2 /> },
    { name: "Hero Slides", path: "/admin/hero-section", icon: <FiImage /> },
    { name: "Manage Users", path: "/admin/users", icon: <FiUsers /> },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  return (
    <div className="min-h-screen bg-[#16130F] text-[#ECE3D0] py-12">
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
            className="font-display text-4xl font-semibold capitalize mb-3 text-[#D9A44D]"
          >
            Admin Dashboard
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-[#A49B8A] max-w-2xl mx-auto">
            A quick overview of your restaurant — for detailed charts, see Analytics.
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { title: "Total Orders", value: orders.length, valueClass: "text-[#D9A44D]" },
            { title: "Today's Orders", value: todaysOrders, valueClass: "text-blue-400" },
            { title: "Pending Orders", value: pendingOrders, valueClass: "text-yellow-400" },
            { title: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, valueClass: "text-green-400" },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-[#231E18] border border-[#D9A44D]/20 shadow-xl rounded-2xl p-6 text-center transform hover:scale-105 hover:border-[#D9A44D]/50 transition duration-300"
            >
              <h2 className="text-xs md:text-sm uppercase tracking-[0.14em] text-[#A49B8A]">
                {card.title}
              </h2>
              <p className={`font-display text-2xl md:text-3xl font-semibold mt-2 ${card.valueClass}`}>
                {card.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          {quickActions.map((action) => (
            <motion.div key={action.path} variants={fadeInUp}>
              <Link
                to={action.path}
                className="flex flex-col items-center gap-3 p-5 bg-[#231E18] border border-[#D9A44D]/20 rounded-2xl hover:border-[#D9A44D]/60 hover:bg-[#D9A44D]/5 transition duration-300 text-center"
              >
                <span className="text-2xl text-[#D9A44D]">{action.icon}</span>
                <span className="font-display text-sm uppercase tracking-[0.1em]">
                  {action.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-[#231E18] border border-[#D9A44D]/20 shadow-lg rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-semibold capitalize text-[#D9A44D]">
              Recent Orders
            </h2>
            <Link
              to="/admin/orders"
              className="text-sm text-[#D9A44D] hover:text-[#E8C06A] uppercase tracking-[0.1em] transition-colors"
            >
              View All →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-[#A49B8A] py-6 text-center">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left bg-[#D9A44D]/10 text-[#D9A44D] uppercase tracking-[0.08em]">
                    <th className="p-3">Customer</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[#D9A44D]/10 hover:bg-[#D9A44D]/5 transition"
                    >
                      <td className="p-3 font-medium">{order.customerName}</td>
                      <td className="p-3 text-[#D9A44D] font-semibold">Rs. {order.totalPrice}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 text-xs border rounded-full ${statusColor(order.status)}`}>
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-3 text-[#A49B8A]">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
