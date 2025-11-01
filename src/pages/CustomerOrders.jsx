import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!user?.name) return;

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const customerOrders = response.data.filter(
          (order) => order.customerName === user.name
        );
        setOrders(customerOrders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [user]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      case "completed":
        return "bg-teal-500";
      case "pending":
        return "bg-orange-500";
      case "cancelled":
      case "canceled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressStep = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      case "completed":
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className={`min-h-screen px-4 py-12 ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold text-center mb-8 brand-text-gradient">Your Orders</h1>
        <div className={`rounded-2xl shadow-xl p-6 transition-all duration-300 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>

        {orders.length === 0 ? (
          <p className="text-center text-gray-400">
            You havent placed any orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table
              className={`w-full border-collapse rounded-lg overflow-hidden ${
                theme === "light" ? "border-gray-300" : "border-gray-700"
              }`}
            >
              <thead>
                <tr
                  className={`text-left text-sm ${
                    theme === "light"
                      ? "bg-orange-100 text-gray-800"
                      : "bg-orange-600 text-white"
                  }`}
                >
                  <th className="p-3 font-semibold">Order ID</th>
                  <th className="p-3 font-semibold">Total Price</th>
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className={`transition-all ${
                      theme === "light"
                        ? "hover:bg-orange-50"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <td
                      className="p-3 text-sm text-orange-500 font-medium cursor-pointer hover:underline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {order._id}
                    </td>
                    <td className="p-3 font-medium">Rs. {order.totalPrice}</td>
                    <td className="p-3 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p
          className={`mt-6 text-center text-sm ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          💡 Click an order ID to view and track your order status.
        </p>
        </div>
      </div>

      {/* MODAL with tracking progress bar */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              className={`relative w-full max-w-lg p-6 rounded-2xl shadow-2xl transform transition-all ${
                theme === "light"
                  ? "bg-white text-gray-900"
                  : "bg-gray-800 text-gray-100"
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-orange-500"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                Order Details
              </h2>

              <p className="text-sm mb-2">
                <span className="font-semibold">Order ID:</span>{" "}
                {selectedOrder._id}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Customer:</span>{" "}
                {selectedOrder.customerName}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Phone:</span>{" "}
                {selectedOrder.phone}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Address:</span>{" "}
                {selectedOrder.address}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>

              {/* TRACKING BAR */}
              <div className="mt-5 mb-6">
                <h3 className="text-lg font-semibold mb-2 text-orange-500">
                  Order Tracking
                </h3>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  {["Pending", "Shipped", "Delivered", "Completed"].map(
                    (step, index) => (
                      <span key={index} className="text-center flex-1">
                        {step}
                      </span>
                    )
                  )}
                </div>
                <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-3 ${getStatusColor(selectedOrder.status)} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(getProgressStep(selectedOrder.status) / 4) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* ITEM LIST */}
              <div className="mt-4 border-t border-gray-400/30 pt-3">
                <h3 className="text-lg font-semibold mb-2">Items</h3>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedOrder.items?.map((item, idx) => (
                    <li
                      key={idx}
                      className={`flex justify-between text-sm p-2 rounded-lg ${
                        theme === "light"
                          ? "bg-orange-50"
                          : "bg-gray-700/60"
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="font-medium">
                        {item.quantity} × Rs.{item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-right font-semibold text-lg text-orange-500">
                Total: Rs. {selectedOrder.totalPrice}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerOrders;
