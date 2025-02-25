import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);

      // Calculate revenue & pending orders
      setTotalRevenue(response.data.reduce((sum, order) => sum + order.totalPrice, 0));
      setPendingOrders(response.data.filter(order => order.status === "Pending").length);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <motion.div className="p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <motion.div className="bg-blue-500 text-white p-6 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl">{orders.length}</p>
        </motion.div>

        <motion.div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
          <h2 className="text-xl font-semibold">Pending Orders</h2>
          <p className="text-3xl">{pendingOrders}</p>
        </motion.div>

        <motion.div className="bg-green-500 text-white p-6 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-3xl">Rs. {totalRevenue}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
