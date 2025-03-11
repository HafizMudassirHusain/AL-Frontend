import { useState, useEffect, useContext } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Order = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState(user ? user.name : "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (user) {
      setCustomerName(user.name);
    }
  }, [user]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !phone || !address || cart.length === 0) {
      setMessage("Please fill all fields and add items to cart.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        customerName,
        phone,
        address,
        items: cart,
        totalPrice,
      });

      setMessage(response.data.message);
      clearCart();
      setCustomerName(user ? user.name : "");
      setPhone("");
      setAddress("");
    } catch (error) {
      setMessage("Error placing order. Try again!");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className={`w-full max-w-lg p-6 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
        <h1 className="text-2xl font-bold text-center mb-6">Place Your Order</h1>

        {!user && (
          <p className="text-red-500 text-center mb-4">
            If you want to save your order details,{" "}
            <Link to="/login" className="text-blue-500 underline">Login first</Link> to track your order status.
          </p>
        )}

        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="customerName"
              placeholder="Your Name"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                theme === 'light' ? 'focus:ring-orange-500' : 'focus:ring-orange-300'
              } ${user ? ' cursor-not-allowed' : ''}`}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              disabled={!!user}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Phone Number"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                theme === 'light' ? 'focus:ring-orange-500' : 'focus:ring-orange-300'
              }`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Delivery Address
            </label>
            <textarea
              id="address"
              placeholder="Delivery Address"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                theme === 'light' ? 'focus:ring-orange-500' : 'focus:ring-orange-300'
              }`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <p className="text-lg font-bold text-center">Total: Rs. {totalPrice}</p>

          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-semibold ${
              user ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!user}
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;