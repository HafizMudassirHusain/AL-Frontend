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

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        {
          customerName,
          phone,
          address,
          items: cart,
          totalPrice,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
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
      className={`min-h-screen flex items-center justify-center surface py-16 px-4 ${
        theme === "light" ? "light" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg p-8 md:p-10 lux-card shadow-2xl relative overflow-hidden"
      >
        {/* Glow background */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#D9A44D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D9A44D]/10 rounded-full blur-3xl" />

        <div className="text-center mb-8">
          <p className="lux-script text-2xl mb-1">Reservation</p>
          <h1 className="font-display text-3xl font-semibold capitalize text-gold">
            Place Your Order
          </h1>
          <div className="lux-divider" />
        </div>

        {!user && (
          <p className="text-center mb-4 text-sm md:text-base text-red-300 bg-red-500/10 border border-red-500/30 p-3">
            To save and track your orders,{" "}
            <Link
              to="/login"
              className="text-gold font-semibold underline hover:text-[#E8C06A] transition"
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
            className="text-center mb-4 text-sm text-gold bg-[#D9A44D]/10 border border-[#D9A44D]/30 p-2"
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
              className={`w-full p-3 bg-transparent border border-[#D9A44D]/40 focus:outline-none focus:border-[#D9A44D] transition-all ${
                user ? "cursor-not-allowed opacity-70" : ""
              }`}
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
              className="w-full p-3 bg-transparent border border-[#D9A44D]/40 focus:outline-none focus:border-[#D9A44D] transition-all"
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
              className="w-full p-3 bg-transparent border border-[#D9A44D]/40 focus:outline-none focus:border-[#D9A44D] transition-all resize-none h-24"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <p className="font-display text-xl font-semibold text-center">
            Total:{" "}
            <span className="text-gold">Rs. {totalPrice.toFixed(2)}</span>
          </p>

          <motion.button
            whileHover={{ scale: user ? 1.03 : 1 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className={`btn-lux w-full ${user ? "" : "opacity-50 cursor-not-allowed"}`}
            disabled={!user}
          >
            Confirm Order <span className="btn-dash" />
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
              className="lux-card text-[#ECE3D0] px-10 py-8 shadow-2xl text-center"
            >
              <CheckCircle size={64} className="mx-auto mb-3 text-gold" />
              <h2 className="font-display text-2xl font-semibold capitalize text-gold mb-1">Order Placed!</h2>
              <p className="text-sm text-muted-warm">
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
