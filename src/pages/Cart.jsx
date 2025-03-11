import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

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
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} py-12`}>
      <div className={`container mx-auto px-4 `}>
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12 "
        >
          <motion.h1 variants={fadeInUp} className="text-4xl font-bold  mb-4">
            Your Cart
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg  max-w-2xl mx-auto">
            Review your items and proceed to checkout.
          </motion.p>
        </motion.div>
  
        {/* Cart Table */}
        {cart.length === 0 ? (
          <motion.p variants={fadeInUp} className="text-center text-lg">
            No items added yet.
          </motion.p>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} shadow-lg rounded-lg p-6 overflow-x-auto hide-scrollbar`}>
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-200 text-gray-800 text-left">
                  <th className="p-3">Image</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Price</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
  
              {/* Table Body */}
              <tbody>
                {cart.map((item) => (
                  <motion.tr key={item._id} variants={fadeInUp} className="border-b">
                    {/* Product Image */}
                    <td className="p-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    </td>
  
                    {/* Product Name */}
                    <td className={`p-3 font-semibold ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>{item.name}</td>
  
                    {/* Quantity Control */}
                    <td className="p-3">
                      <div className="flex items-center">
                        <button
                          onClick={() => decreaseQuantity(item._id)}
                          className={`${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-400 text-white'} px-3 py-1 rounded-l hover:bg-gray-300 transition duration-300`}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className={`px-3 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item._id)}
                          className={`${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-400 text-white'} px-3 py-1 rounded-r hover:bg-gray-300 transition duration-300`}
                        >
                          +
                        </button>
                      </div>
                    </td>
  
                    {/* Price */}
                    <td className={`p-3 font-bold ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>Rs. {item.price * item.quantity}</td>
  
                    {/* Remove Button */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
  
            {/* Total Price */}
            <motion.div variants={fadeInUp} className="mt-6 text-right">
              <p className={`text-2xl font-bold ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>Total: Rs. {totalPrice}</p>
            </motion.div>
  
            {/* Buttons */}
            <motion.div variants={fadeInUp} className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={clearCart}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/order")}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Place Order
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
  
};

export default Cart;