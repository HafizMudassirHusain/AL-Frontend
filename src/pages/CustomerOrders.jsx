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
    <div className={`min-h-screen px-4 py-12 surface ${theme === "light" ? "light" : ""}`}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <p className="lux-script text-2xl mb-2">Track Your Meal</p>
          <h1 className="font-display text-4xl font-semibold capitalize text-gold">Your Orders</h1>
          <div className="lux-divider" />
        </div>
        <div className="lux-card shadow-xl p-6 transition-all duration-300">

        {orders.length === 0 ? (
          <p className="text-center text-muted-warm">
            You haven&apos;t placed any orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden">
              <thead>
                <tr className="text-left text-sm bg-[#D9A44D]/10 text-gold font-display uppercase tracking-[0.08em]">
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
                    className="transition-all border-b border-[#D9A44D]/10 hover:bg-[#D9A44D]/5"
                  >
                    <td
                      className="p-3 text-sm text-gold font-medium cursor-pointer hover:underline"
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

        <p className="mt-6 text-center text-sm text-muted-warm">
          Click an order ID to view and track your order status.
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
              className="relative w-full max-w-lg p-6 lux-card text-[#ECE3D0] shadow-2xl transform transition-all"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-muted-warm hover:text-gold"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>

              <h2 className="font-display text-2xl font-semibold capitalize mb-4 text-gold">
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
                <h3 className="font-display text-lg font-semibold capitalize mb-2 text-gold">
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
                <div className="relative w-full h-3 bg-[#D9A44D]/15 rounded-full overflow-hidden">
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
              <div className="mt-4 border-t border-[#D9A44D]/20 pt-3">
                <h3 className="font-display text-lg font-semibold capitalize mb-2">Items</h3>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedOrder.items?.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between text-sm p-2 bg-[#D9A44D]/8 border border-[#D9A44D]/15"
                    >
                      <span>{item.name}</span>
                      <span className="font-medium">
                        {item.quantity} × Rs.{item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-right font-display font-semibold text-lg text-gold">
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
