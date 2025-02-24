import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Your Cart
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Review your items and proceed to checkout.
          </motion.p>
        </motion.div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <motion.p
            variants={fadeInUp}
            className="text-center text-lg text-gray-600"
          >
            No items added yet.
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            {cart.map((item) => (
              <motion.div
                key={item._id}
                variants={fadeInUp}
                className="flex items-center justify-between p-4 border-b last:border-b-0"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Product Name */}
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>

                {/* Quantity Control */}
                <div className="flex items-center">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300 transition duration-300"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300 transition duration-300"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <p className="text-lg font-bold text-gray-800">
                  Rs. {item.price * item.quantity}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </motion.div>
            ))}

            {/* Total Price */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 text-right"
            >
              <p className="text-2xl font-bold text-gray-800">
                Total: Rs. {totalPrice}
              </p>
            </motion.div>

            {/* Clear Cart Button */}
            <motion.div
              variants={fadeInUp}
              className="mt-6"
            >
              <button
                onClick={clearCart}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Clear Cart
              </button>
            </motion.div>

            {/* Move to Order Page Button */}
            <motion.div
              variants={fadeInUp}
              className="mt-4"
            >
              <button
                onClick={() => navigate("/order")}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
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