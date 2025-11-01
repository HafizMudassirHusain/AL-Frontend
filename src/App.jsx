import { Routes, Route, Navigate } from "react-router-dom"; 
import Home from "./pages/Home";
import MenuPage from "./pages/Menu";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import CustomerOrders from "./pages/CustomerOrders";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import OrderSuccess from "./pages/OrderSuccess";
import OrderCancel from "./pages/OrderCancel";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAddMenu from "./pages/admin/AdminAddMenu";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminHeroSection from "./pages/admin/AdminHeroSection";
import { useAuth } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";

function App() {
  const token = localStorage.getItem("token");
const userData = JSON.parse(localStorage.getItem("user")); // ✅ Get full user object
const userRole = userData?.role; // ✅ Extract role
const { user } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <Navbar />

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-cancel" element={<OrderCancel />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/my-orders" element={<CustomerOrders />} />

        {/* ✅ Protected Admin Routes (Admin & Super Admin) */}
        <Route
  path="/admin"
  element={
    token && (userRole === "admin" || userRole === "super-admin")
      ? <AdminLayout />
      : <Navigate to="/login" />
  }
>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="menu" element={<AdminAddMenu />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="hero-section" element={<AdminHeroSection />} />
          {/* ✅ Only Super Admin can access user management */}
          <Route path="users" element={userRole === "super-admin" ? <AdminUsers /> : <Navigate to="/admin/dashboard" />} />

        </Route>
      </Routes>

      {/* Fallback */}
      {/* <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
