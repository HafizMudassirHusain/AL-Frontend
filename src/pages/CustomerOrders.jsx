import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

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
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Your Orders</h1>
      <div className="p-5">
        {orders.length === 0 ? <p>No orders found.</p> : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Order ID</th>
                <th className="border p-2">Total Price</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border">
                  <td className="border p-2">{order._id}</td>
                  <td className="border p-2">Rs. {order.totalPrice}</td>
                  <td className="border p-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
