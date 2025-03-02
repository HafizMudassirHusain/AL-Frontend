import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const [customerName, setCustomerName] = useState(user ? user.name : "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Place Your Order</h1>

        {!user && (
          <p className="text-red-500 text-center mb-3">
            If you want to save your order details,{" "}
            <Link to="/login" className="text-blue-500 underline">Login first</Link> to track your order status.
          </p>
        )}

        {message && <p className="text-red-500 text-center mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            disabled={!!user}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Delivery Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <p className="text-lg font-bold text-center">Total: Rs. {totalPrice}</p>

          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-semibold ${
              user ? "bg-orange-500 hover:bg-orange-700" : "bg-gray-300 cursor-not-allowed"
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
