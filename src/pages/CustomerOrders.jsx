import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!user?.name) return; // Ensure user is defined before making a request

    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => {
      // Filter orders to show only the logged-in customer's orders
      const customerOrders = response.data.filter(order => order.customerName === user.name);
      setOrders(customerOrders);
      console.log(user.name)
    })
    .catch(error => console.error("Error fetching orders:", error));
  }, [user]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className={`w-full max-w-4xl p-6 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
        <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>
        {orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}>
              <thead>
                <tr className={`${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
                  <th className="border p-2">Order ID</th>
                  <th className="border p-2">Total Price</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className={`border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`}>
                    <td className="border p-2">{order._id}</td>
                    <td className="border p-2">Rs. {order.totalPrice}</td>
                    <td className="border p-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;