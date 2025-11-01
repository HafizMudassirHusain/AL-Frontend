import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Modal from "react-modal";
import Papa from "papaparse";
import { ThemeContext } from "../../context/ThemeContext";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'board'

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch Orders
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

  // Update Order Status
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Delete Order
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Export Orders to CSV
  const exportToCSV = () => {
    const csvData = orders.map((order) => ({
      "Order ID": order._id,
      "Customer Name": order.customerName,
      Phone: order.phone,
      "Total Price": order.totalPrice,
      Status: order.status,
      "Order Date": new Date(order.createdAt).toLocaleString(),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;

  // Filter + Search + Sort
  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);
  const searchedOrders = filteredOrders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search)
  );

  const sortedOrders = [...searchedOrders].sort((a, b) => {
    if (sortBy === "totalPrice") return b.totalPrice - a.totalPrice;
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Modal Control
  const openModal = (order) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

  // Animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const accent = "from-orange-500 to-amber-500";

  return (
    <>
      <motion.div
        className={`min-h-screen p-8 ${
          theme === "light"
            ? "bg-gradient-to-b from-white via-orange-50 to-orange-100"
            : "bg-gray-900 text-white"
        }`}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          🧾 Manage Orders
        </h1>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <motion.div
            className={`bg-gradient-to-r ${accent} text-white rounded-xl p-5 shadow-lg`}
            variants={fadeIn}
          >
            <h2 className="text-lg font-semibold opacity-90">Total Orders</h2>
            <p className="text-3xl font-bold mt-1">{orders.length}</p>
          </motion.div>

          <div className="bg-yellow-400 text-white rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold opacity-90">Pending Orders</h2>
            <p className="text-3xl font-bold mt-1">{pendingOrders}</p>
          </div>

          <div className="bg-green-500 text-white rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold opacity-90">Total Revenue</h2>
            <p className="text-3xl font-bold mt-1">Rs. {totalRevenue}</p>
          </div>
        </div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap justify-center my-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded ${viewMode === 'table' ? 'bg-orange-500 text-white' : 'border'}`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode("board")}
              className={`px-4 py-2 rounded ${viewMode === 'board' ? 'bg-orange-500 text-white' : 'border'}`}
            >
              Board
            </button>
          </div>
          <input
            type="text"
            placeholder="Search by customer or phone"
            className="p-2 border rounded w-64 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded shadow-sm"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded shadow-sm"
          >
            <option value="createdAt">Newest First</option>
            <option value="totalPrice">Highest Price</option>
            <option value="status">Sort by Status</option>
          </select>

          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition shadow-md"
          >
            📥 Export CSV
          </button>
        </motion.div>

        {/* Orders Table / Board */}
        {viewMode === 'table' ? (
          <div className="overflow-y-auto max-h-[550px] rounded-xl bg-white/80 backdrop-blur-md border border-orange-200 shadow-lg">
            {sortedOrders.length === 0 ? (
              <p className="text-gray-600 py-10 text-center">No orders found.</p>
            ) : (
              <motion.table
                className="w-full border-collapse text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Total Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((order, i) => (
                    <motion.tr
                      key={order._id}
                      className="border-b hover:bg-orange-50 transition"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td className="p-3 font-medium text-gray-800">
                        {order.customerName}
                      </td>
                      <td className="p-3">{order.phone}</td>
                      <td className="p-3 font-semibold text-gray-700">
                        Rs. {order.totalPrice}
                      </td>
                      <td className="p-3">
                        <motion.select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="p-2 rounded-md border bg-white shadow-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </motion.select>
                      </td>
                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => openModal(order)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['Pending','Preparing','Completed','Cancelled'].map((col) => (
              <div key={col} className="bg-white/80 backdrop-blur-md border border-orange-200 rounded-xl p-3">
                <h3 className="font-semibold mb-2">{col}</h3>
                <div className="space-y-3 max-h-[550px] overflow-y-auto">
                  {orders.filter(o => o.status === col).map((order) => (
                    <div key={order._id} className="rounded-lg border p-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{order.customerName}</span>
                        <span>Rs. {order.totalPrice}</span>
                      </div>
                      <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                      <div className="flex gap-2 mt-2">
                        {col !== 'Pending' && (
                          <button onClick={() => updateStatus(order._id, 'Pending')} className="px-2 py-1 border rounded text-xs">Set Pending</button>
                        )}
                        {col !== 'Preparing' && (
                          <button onClick={() => updateStatus(order._id, 'Preparing')} className="px-2 py-1 border rounded text-xs">Preparing</button>
                        )}
                        {col !== 'Completed' && (
                          <button onClick={() => updateStatus(order._id, 'Completed')} className="px-2 py-1 border rounded text-xs">Done</button>
                        )}
                        {col !== 'Cancelled' && (
                          <button onClick={() => updateStatus(order._id, 'Cancelled')} className="px-2 py-1 border rounded text-xs">Cancel</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4"
      >
        {selectedOrder && (
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full sm:w-3/4 lg:w-1/2 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
              Order #{selectedOrder._id.slice(-6)}
            </h2>

            <div className="text-left space-y-2 mb-4">
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3 max-h-40 overflow-y-auto">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1 text-gray-700">
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs. {item.price}</span>
                </div>
              ))}
            </div>

            <p className="text-lg font-semibold text-center mt-4">
              Total: <span className="text-orange-600 font-bold">Rs. {selectedOrder.totalPrice}</span>
            </p>

            <button
              onClick={closeModal}
              className="mt-6 w-full py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Close
            </button>
          </motion.div>
        )}
      </Modal>
    </>
  );
};

export default AdminOrders;
