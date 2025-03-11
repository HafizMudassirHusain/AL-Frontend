import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Modal from 'react-modal'
import Papa from "papaparse"; // ✅ Import PapaParse for CSV

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
const openModal = (order) => setSelectedOrder(order);
const closeModal = () => setSelectedOrder(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Update Order Status
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Order Summary Stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter(order => order.status === "Pending").length;

  // Filter & Search Orders
  const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);
  const searchedOrders = filteredOrders.filter(order =>
    order.customerName.toLowerCase().includes(search.toLowerCase()) ||
    order.phone.includes(search)
  );

  // Sorting Orders
  const sortedOrders = [...searchedOrders].sort((a, b) => {
    if (sortBy === "totalPrice") return b.totalPrice - a.totalPrice;
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Page Animation
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
  
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      setOrders(orders.filter(order => order._id !== orderId)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // ✅ Convert orders to CSV format
  const exportToCSV = () => {
    const csvData = orders.map(order => ({
      "Order ID": order._id,
      "Customer Name": order.customerName,
      "Phone": order.phone,
      "Total Price": order.totalPrice,
      "Status": order.status,
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
  


  return (
    <>
    <motion.div 
      className="text-center mt-10"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <h1 className="text-3xl font-bold mb-5">Manage Orders</h1>

      {/* Order Summary Stats */}
      <div className="grid grid-cols-3 gap-6 mb-5">
        <div className="bg-blue-500 text-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl">{orders.length}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-2xl">{pendingOrders}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl">Rs. {totalRevenue}</p>
        </div>
      </div>

      {/* Search & Sorting UI */}
      <motion.div className="flex flex-wrap justify-center my-4 gap-4"
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

         {/* ✅ CSV Export Button */}
         <button onClick={exportToCSV} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mb-4">
          📥 Export Orders to CSV
        </button>
      </motion.div>

      {/* Order Table */}
      <div className="p-5">
        {sortedOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
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
                <th className="border p-2">Deletion</th>
                <th className="border p-2">Details</th>
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
                   <button onClick={() => deleteOrder(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                    Delete
                   </button>
                  </td> 
                  <td>
                  <button onClick={() => openModal(order)} className="bg-blue-500 text-white px-3 py-1 rounded">
                   View Details
                  </button>
                  </td>
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
     
    </motion.div>
    <Modal 
  isOpen={!!selectedOrder} 
  onRequestClose={closeModal} 
  className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4"
>
  {selectedOrder && (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 sm:w-10/12 md:w-3/4 lg:max-w-lg transform transition-all scale-95 md:scale-100">
      {/* Modal Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Order Details</h2>

      {/* Customer Info */}
      <div className="border-b pb-3">
        <p className="text-lg"><strong>Customer:</strong> {selectedOrder.customerName}</p>
        <p className="text-lg"><strong>Phone:</strong> {selectedOrder.phone}</p>
        <p className="text-lg"><strong>Address:</strong> {selectedOrder.address}</p>
      </div>

      {/* Items List */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Items Ordered:</h3>
        <ul className="mt-2 space-y-2">
          {selectedOrder.items.map((item, index) => (
            <li key={index} className="flex justify-between p-2 bg-gray-100 rounded-md text-sm md:text-base">
              <span>{item.name} x{item.quantity}</span>
              <span className="font-semibold">Rs. {item.price}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total Price */}
      <p className="text-xl font-bold text-gray-900 mt-4 text-center">
        Total: Rs. {selectedOrder.totalPrice}
      </p>

      {/* Close Button */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={closeModal} 
          className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  )}
</Modal>


    </>
  );
};

export default AdminOrders;
