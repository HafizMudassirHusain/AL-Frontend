import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div
      className={`min-h-screen surface ${theme === "light" ? "light" : ""} py-16 px-4`}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <p className="lux-script text-2xl mb-2">Almost There</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold capitalize text-gold flex items-center justify-center gap-3">
            <FaShoppingCart />
            Your Cart
          </h1>
          <div className="lux-divider" />
          <p className="text-base text-muted-warm">
            Review your selected items before placing the order.
          </p>
        </motion.div>

        {/* If empty */}
        {cart.length === 0 ? (
          <motion.div variants={fadeInUp} className="text-center py-20">
            <p className="text-xl text-muted-warm">Your cart is empty.</p>
            <button onClick={() => navigate("/menu")} className="btn-lux mt-6">
              Browse Menu <span className="btn-dash" />
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Cart Table */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-2 lux-card shadow-lg p-6 overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left bg-[#D9A44D]/10 text-gold font-display uppercase tracking-[0.1em] text-sm">
                    <th className="p-3">Image</th>
                    <th className="p-3">Product</th>
                    <th className="p-3 text-center">Quantity</th>
                    <th className="p-3">Price</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <motion.tr
                      key={item._id}
                      variants={fadeInUp}
                      className="border-b border-[#D9A44D]/15"
                    >
                      {/* Image */}
                      <td className="p-3">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover shadow-sm"
                        />
                      </td>

                      {/* Name */}
                      <td className="p-3 font-semibold">{item.name}</td>

                      {/* Quantity Control */}
                      <td className="p-3 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => decreaseQuantity(item._id)}
                            className="border border-[#D9A44D]/60 text-gold px-3 py-1 hover:bg-[#D9A44D]/10 transition disabled:opacity-40"
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus />
                          </button>
                          <span className="px-3 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item._id)}
                            className="border border-[#D9A44D]/60 text-gold px-3 py-1 hover:bg-[#D9A44D]/10 transition"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-3 font-bold">Rs. {item.price * item.quantity}</td>

                      {/* Remove */}
                      <td className="p-3 text-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => removeFromCart(item._id)}
                          className="border border-red-500/70 text-red-400 px-3 py-2 hover:bg-red-500/10 transition flex items-center justify-center gap-1"
                        >
                          <FaTrashAlt />
                          <span className="hidden sm:inline">Remove</span>
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Summary Card */}
            <motion.aside
              variants={fadeInUp}
              className="sticky top-24 lux-card shadow-lg p-6 h-max"
            >
              <h2 className="font-display text-xl font-semibold uppercase tracking-[0.1em] text-gold mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>Rs. {totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>Free</span></div>
                <div className="flex justify-between font-semibold pt-2 border-t border-[#D9A44D]/25"><span>Total</span><span className="text-gold">Rs. {totalPrice.toLocaleString()}</span></div>
              </div>
              <button onClick={() => navigate('/order')} className="btn-lux mt-6 w-full">Proceed To Checkout <span className="btn-dash" /></button>
              <button onClick={() => navigate('/menu')} className="btn-lux-outline mt-3 w-full">Continue Shopping</button>
              <button onClick={clearCart} className="mt-3 w-full py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 transition font-display uppercase tracking-[0.1em] text-sm">Clear Cart</button>
            </motion.aside>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
