import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import AdminAddMenu from "./AdminAddMenu";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt"); // Default sorting by date
  const { user } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => setOrders(response.data))
    .catch(error => console.error("Error fetching orders:", error));
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Filter orders by status
  const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);

  // Search orders by customer name or phone number
  const searchedOrders = filteredOrders.filter(order =>
    order.customerName.toLowerCase().includes(search.toLowerCase()) ||
    order.phone.includes(search)
  );

  // Sort orders
  const sortedOrders = [...searchedOrders].sort((a, b) => {
    if (sortBy === "totalPrice") {
      return b.totalPrice - a.totalPrice;
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

   // Page animation variant
   const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div 
      className="text-center mt-10"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <h1 className="text-3xl font-bold">Admin Panel - Orders</h1>

      {/* Search & Sorting UI */}
        {/* Search & Sorting UI */}
        <motion.div className="flex justify-center my-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search by customer or phone"
          className="p-2 border rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded">
          <option value="createdAt">Newest First</option>
          <option value="totalPrice">Highest Price</option>
          <option value="status">Sort by Status</option>
        </select>
        </motion.div>

      <div className="p-5">
        {sortedOrders.length === 0 ? <p>No orders found.</p> : (
             <motion.table 
             className="w-full border-collapse border border-gray-300"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
           >
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Customer</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Total Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order) => (
                    <motion.tr 
                    key={order._id} 
                    className="border"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                  <td className="border p-2">{order.customerName}</td>
                  <td className="border p-2">{order.phone}</td>
                  <td className="border p-2">Rs. {order.totalPrice}</td>
                  <td className="border p-2">{order.status}</td>
                  <td className="border p-2">
                  <motion.select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="p-2 border rounded"
                      whileHover={{ scale: 1.05 }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      </motion.select>
                  </td>
                  </motion.tr>
              ))}
            </tbody>
            </motion.table>
        )}
      </div>
      <AdminAddMenu />
      </motion.div>
  );
};

export default AdminOrders;
