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
      className={`min-h-screen ${
        theme === "light" ? "bg-[#fff9f3] text-gray-800" : "bg-[#1a1a1a] text-gray-100"
      } py-16 px-4`}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-2">
            <FaShoppingCart className="text-orange-500" />
            Your Cart
          </h1>
          <p className="text-lg text-gray-500">
            Review your selected items before placing the order.
          </p>
        </motion.div>

        {/* If empty */}
        {cart.length === 0 ? (
          <motion.div variants={fadeInUp} className="text-center py-20">
            <p className="text-xl text-gray-400">🛒 Your cart is empty.</p>
            <button
              onClick={() => navigate("/menu")}
              className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              Browse Menu
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Cart Table */}
            <motion.div
              variants={fadeInUp}
              className={`lg:col-span-2 rounded-2xl shadow-lg p-6 overflow-x-auto backdrop-blur-md ${
                theme === "light"
                  ? "bg-white/90 border border-orange-100"
                  : "bg-gray-800/80 border border-gray-700"
              }`}
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr
                    className={`text-left ${
                      theme === "light"
                        ? "bg-orange-100 text-gray-700"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
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
                      className={`border-b ${
                        theme === "light" ? "border-gray-200" : "border-gray-700"
                      }`}
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
                            className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full hover:bg-orange-200 transition disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus />
                          </button>
                          <span className="px-3 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item._id)}
                            className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full hover:bg-orange-200 transition"
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
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-1"
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
              className={`sticky top-24 rounded-2xl shadow-lg p-6 h-max ${theme === 'light' ? 'bg-white border border-orange-100' : 'bg-gray-800 border border-gray-700'}`}
            >
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>Rs. {totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>Free</span></div>
                <div className="flex justify-between font-semibold pt-2 border-t"><span>Total</span><span className="text-orange-500">Rs. {totalPrice.toLocaleString()}</span></div>
              </div>
              <button onClick={() => navigate('/order')} className="mt-6 w-full brand-gradient text-white font-semibold py-3 rounded-lg hover:opacity-95">Proceed to Checkout</button>
              <button onClick={() => navigate('/menu')} className="mt-3 w-full py-2 rounded-lg border hover:bg-orange-50 dark:hover:bg-gray-700">Continue Shopping</button>
              <button onClick={clearCart} className="mt-3 w-full py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600">Clear Cart</button>
            </motion.aside>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
