import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  
  // Set initial state based on user login status
  const [customerName, setCustomerName] = useState(user ? user.name : "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  // Update name field if user logs in after page load
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
      const response = await axios.post("http://localhost:5000/api/orders", {
        customerName,
        phone,
        address,
        items: cart,
        totalPrice,
      });

      setMessage(response.data.message);
      clearCart(); // Clear cart after successful order
      setCustomerName(user ? user.name : ""); // Reset if logged out
      setPhone("");
      setAddress("");
    } catch (error) {
      setMessage("Error placing order. Try again!");
    }
  };

  return (
    <div className="text-center  my-20">
      <h1 className="text-3xl font-bold">Place Your Order</h1>

      {/* Show message if user is not logged in */}
      {!user && (
        <p className="text-red-500 mb-3">
          If you want to save your order details, <Link to="/login" className="text-blue-500 underline">Login first</Link> and track your order status.
        </p>
      )}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5 p-5 bg-white shadow-md rounded">
        {message && <p className="text-red-500">{message}</p>}

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded mb-2"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          disabled={!!user} // Disable input if user is logged in
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 border rounded mb-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Delivery Address"
          className="w-full p-2 border rounded mb-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <p className="text-lg font-bold">Total: Rs. {totalPrice}</p>

        {/* Disable Confirm Order button if user is not logged in */}
        <button
          type="submit"
          className={`mt-2 px-4 py-2 rounded ${user ? "bg-blue-500 hover:bg-blue-700 text-white" : "bg-gray-400 cursor-not-allowed text-gray-700"}`}
          disabled={!user}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Order;
