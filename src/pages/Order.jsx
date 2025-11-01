import { useState, useEffect, useContext } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const Order = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState(user ? user.name : "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (user) setCustomerName(user.name);
  }, [user]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !phone || !address || cart.length === 0) {
      setMessage("Please fill all fields and add items to cart.");
      return;
    }

    try {
      if (paymentMethod === "card") {
        try {
          const sessionRes = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-checkout-session`,
            { items: cart, customerName }
          );
          if (sessionRes.data?.url) {
            window.location.href = sessionRes.data.url;
            return;
          }
        } catch (err) {
          if (err?.response?.status === 404) {
            setMessage("Card payments are temporarily unavailable. Please choose Cash on Delivery.");
            return;
          }
          throw err;
        }
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        {
          customerName,
          phone,
          address,
          items: cart,
          totalPrice,
        }
      );

      setMessage(response.data.message);
      clearCart();
      setCustomerName(user ? user.name : "");
      setPhone("");
      setAddress("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setMessage("Error placing order. Try again!", error);
    }
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-500 via-amber-500 to-yellow-400 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`w-full max-w-lg p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-md border ${
          theme === "light"
            ? "bg-white/90 border-orange-200"
            : "bg-gray-900/60 border-orange-400/30"
        }`}
      >
        {/* Glow background */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/30 rounded-full blur-3xl" />

        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-300 via-yellow-200 to-amber-300 text-transparent bg-clip-text drop-shadow-md">
          Place Your Order
        </h1>

        {!user && (
          <p className="text-center mb-4 text-sm md:text-base text-red-100 bg-red-500/20 p-3 rounded-lg">
            To save and track your orders,{" "}
            <Link
              to="/login"
              className="text-orange-300 font-semibold underline hover:text-yellow-200 transition"
            >
              login first
            </Link>
            .
          </p>
        )}

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4 text-sm text-yellow-200 bg-black/20 p-2 rounded-md"
          >
            {message}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Payment Method */}
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
              <span>Card (Stripe)</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-semibold mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="customerName"
              placeholder="Enter your name"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                theme === "light"
                  ? "border-orange-200 focus:ring-orange-500 bg-white/90"
                  : "border-orange-400/40 focus:ring-amber-400 bg-gray-800/80"
              } ${user ? "cursor-not-allowed opacity-70" : ""}`}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              disabled={!!user}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                theme === "light"
                  ? "border-orange-200 focus:ring-orange-500 bg-white/90"
                  : "border-orange-400/40 focus:ring-amber-400 bg-gray-800/80"
              }`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold mb-1"
            >
              Delivery Address
            </label>
            <textarea
              id="address"
              placeholder="Enter delivery address"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none h-24 ${
                theme === "light"
                  ? "border-orange-200 focus:ring-orange-500 bg-white/90"
                  : "border-orange-400/40 focus:ring-amber-400 bg-gray-800/80"
              }`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <p className="text-lg font-bold text-center">
            Total:{" "}
            <span className="text-orange-300">Rs. {totalPrice.toFixed(2)}</span>
          </p>

          <motion.button
            whileHover={{ scale: user ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
              user
                ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-yellow-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!user}
          >
            Confirm Order
          </motion.button>
        </form>
      </motion.div>

      {/* ✅ Animated Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-b from-orange-500 to-amber-500 text-white px-10 py-8 rounded-3xl shadow-2xl text-center"
            >
              <CheckCircle size={64} className="mx-auto mb-3 text-white" />
              <h2 className="text-2xl font-bold mb-1">Order Placed!</h2>
              <p className="text-sm text-white/90">
                Your order has been successfully placed 🎉
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Order;
