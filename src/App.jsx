import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AdminOrders from "./pages/AdminOrders";
import { useAuth } from "./context/AuthContext";
import CustomerOrders from "./pages/CustomerOrders";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";


function App() {
const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/my-orders" element={<CustomerOrders />} />
      <Route path="/admin/orders" element={user?.role === "admin" ? <AdminOrders /> : <Navigate to="/login" />} />  
    </Routes>

       {/* Footer */}
       <Footer />
    </div>
  );
}

export default App;
