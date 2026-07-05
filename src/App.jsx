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
import { useAuth } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import { useContext, lazy, Suspense } from "react";

// Admin section is lazy-loaded so customers don't download it (or Chart.js)
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminAddMenu = lazy(() => import("./pages/admin/AdminAddMenu"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminHeroSection = lazy(() => import("./pages/admin/AdminHeroSection"));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <p className="font-display uppercase tracking-[0.2em] text-gold animate-pulse">Loading…</p>
  </div>
);

function App() {
  // Subscribe to auth context so routes re-evaluate immediately after login/logout
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const userRole = user?.role;
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen surface ${theme === 'light' ? 'light' : ''}`}>
      <Navbar />

      <Suspense fallback={<PageLoader />}>
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

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
