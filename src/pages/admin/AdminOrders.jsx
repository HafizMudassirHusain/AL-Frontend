import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from "react-modal";
import Papa from "papaparse";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  return (
    <>
      <motion.div
        className="min-h-screen p-8 bg-[#16130F] text-[#ECE3D0]"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="font-display text-4xl font-semibold capitalize text-center mb-10 text-[#D9A44D]">
          Manage Orders
        </h1>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Total Orders", value: orders.length, valueClass: "text-[#D9A44D]" },
            { title: "Pending Orders", value: pendingOrders, valueClass: "text-yellow-400" },
            { title: "Total Revenue", value: `Rs. ${totalRevenue}`, valueClass: "text-green-400" },
          ].map((card) => (
            <motion.div
              key={card.title}
              className="bg-[#231E18] border border-[#D9A44D]/20 rounded-xl p-5 shadow-lg"
              variants={fadeIn}
            >
              <h2 className="text-sm uppercase tracking-[0.14em] text-[#A49B8A]">{card.title}</h2>
              <p className={`font-display text-3xl font-semibold mt-2 ${card.valueClass}`}>{card.value}</p>
            </motion.div>
          ))}
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
              className={`px-4 py-2 rounded ${viewMode === 'table' ? 'bg-[#D9A44D] text-[#1c1812] font-semibold' : 'border border-[#D9A44D]/40 text-[#D9A44D] hover:bg-[#D9A44D]/10'}`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode("board")}
              className={`px-4 py-2 rounded ${viewMode === 'board' ? 'bg-[#D9A44D] text-[#1c1812] font-semibold' : 'border border-[#D9A44D]/40 text-[#D9A44D] hover:bg-[#D9A44D]/10'}`}
            >
              Board
            </button>
          </div>
          <input
            type="text"
            placeholder="Search by customer or phone"
            className="p-2 bg-[#231E18] border border-[#D9A44D]/30 rounded w-64 text-[#ECE3D0] placeholder-[#A49B8A] focus:outline-none focus:border-[#D9A44D]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 bg-[#231E18] border border-[#D9A44D]/30 rounded text-[#ECE3D0] focus:outline-none focus:border-[#D9A44D]"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 bg-[#231E18] border border-[#D9A44D]/30 rounded text-[#ECE3D0] focus:outline-none focus:border-[#D9A44D]"
          >
            <option value="createdAt">Newest First</option>
            <option value="totalPrice">Highest Price</option>
            <option value="status">Sort by Status</option>
          </select>

          <button
            onClick={exportToCSV}
            className="border border-green-500/60 text-green-400 px-4 py-2 rounded hover:bg-green-500/10 transition"
          >
            Export CSV
          </button>
        </motion.div>

        {/* Orders Table / Board */}
        {viewMode === 'table' ? (
          <div className="overflow-y-auto max-h-[550px] rounded-xl bg-[#1E1A15] border border-[#D9A44D]/20 shadow-lg">
            {sortedOrders.length === 0 ? (
              <p className="text-[#A49B8A] py-10 text-center">No orders found.</p>
            ) : (
              <motion.table
                className="w-full border-collapse text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <thead className="bg-[#D9A44D] text-[#1c1812]">
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
                      className="border-b border-[#D9A44D]/10 hover:bg-[#D9A44D]/5 transition"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td className="p-3 font-medium text-[#ECE3D0]">
                        {order.customerName}
                      </td>
                      <td className="p-3 text-[#A49B8A]">{order.phone}</td>
                      <td className="p-3 font-semibold text-[#D9A44D]">
                        Rs. {order.totalPrice}
                      </td>
                      <td className="p-3">
                        <motion.select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="p-2 rounded-md bg-[#231E18] border border-[#D9A44D]/30 text-[#ECE3D0] focus:outline-none focus:border-[#D9A44D]"
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
                          className="px-3 py-1 border border-[#D9A44D]/60 text-[#D9A44D] rounded hover:bg-[#D9A44D]/10 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="px-3 py-1 border border-red-500/60 text-red-400 rounded hover:bg-red-500/10 transition"
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
              <div key={col} className="bg-[#1E1A15] border border-[#D9A44D]/20 rounded-xl p-3">
                <h3 className="font-display font-semibold uppercase tracking-[0.1em] text-[#D9A44D] mb-2">{col}</h3>
                <div className="space-y-3 max-h-[550px] overflow-y-auto">
                  {orders.filter(o => o.status === col).map((order) => (
                    <div key={order._id} className="rounded-lg bg-[#231E18] border border-[#D9A44D]/15 p-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-[#ECE3D0]">{order.customerName}</span>
                        <span className="text-[#D9A44D]">Rs. {order.totalPrice}</span>
                      </div>
                      <div className="text-xs text-[#A49B8A]">{new Date(order.createdAt).toLocaleString()}</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {col !== 'Pending' && (
                          <button onClick={() => updateStatus(order._id, 'Pending')} className="px-2 py-1 border border-[#D9A44D]/40 text-[#D9A44D] hover:bg-[#D9A44D]/10 rounded text-xs transition">Set Pending</button>
                        )}
                        {col !== 'Preparing' && (
                          <button onClick={() => updateStatus(order._id, 'Preparing')} className="px-2 py-1 border border-[#D9A44D]/40 text-[#D9A44D] hover:bg-[#D9A44D]/10 rounded text-xs transition">Preparing</button>
                        )}
                        {col !== 'Completed' && (
                          <button onClick={() => updateStatus(order._id, 'Completed')} className="px-2 py-1 border border-green-500/50 text-green-400 hover:bg-green-500/10 rounded text-xs transition">Done</button>
                        )}
                        {col !== 'Cancelled' && (
                          <button onClick={() => updateStatus(order._id, 'Cancelled')} className="px-2 py-1 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded text-xs transition">Cancel</button>
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
            className="bg-[#231E18] border border-[#D9A44D]/25 text-[#ECE3D0] rounded-2xl shadow-xl p-6 w-full sm:w-3/4 lg:w-1/2 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="font-display text-2xl font-semibold text-[#D9A44D] mb-4 text-center">
              Order #{selectedOrder._id.slice(-6)}
            </h2>

            <div className="text-left space-y-2 mb-4">
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            <div className="bg-[#D9A44D]/10 border border-[#D9A44D]/15 rounded-lg p-3 max-h-40 overflow-y-auto">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-1 text-[#A49B8A]">
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs. {item.price}</span>
                </div>
              ))}
            </div>

            <p className="text-lg font-semibold text-center mt-4">
              Total: <span className="text-[#D9A44D] font-bold">Rs. {selectedOrder.totalPrice}</span>
            </p>

            <button
              onClick={closeModal}
              className="mt-6 w-full py-2 bg-[#D9A44D] hover:bg-[#E8C06A] text-[#1c1812] rounded-lg font-semibold transition"
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
