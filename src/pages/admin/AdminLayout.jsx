import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiHome, FiList, FiUsers, FiBarChart } from "react-icons/fi";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <motion.div
        className={`bg-gray-900 text-white w-64 min-h-screen p-5 transition-all ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
        initial={{ x: -100 }}
        animate={{ x: sidebarOpen ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          {isMobile && (
            <button onClick={toggleSidebar} className="md:hidden">
              <FiX size={24} />
            </button>
          )}
        </div>

        <nav className="mt-5">
          <Link
            to="/admin/dashboard"
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              location.pathname === "/admin/dashboard" ? "bg-gray-700" : ""
            }`}
          >
            <FiHome className="mr-2" /> Dashboard
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              location.pathname === "/admin/orders" ? "bg-gray-700" : ""
            }`}
          >
            <FiList className="mr-2" /> Manage Orders
          </Link>
          <Link
            to="/admin/menu"
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              location.pathname === "/admin/menu" ? "bg-gray-700" : ""
            }`}
          >
            🍽 Manage Menu
          </Link>
          <Link
            to="/admin/analytics"
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              location.pathname === "/admin/analytics" ? "bg-gray-700" : ""
            }`}
          >
            <FiBarChart className="mr-2" /> Analytics
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              location.pathname === "/admin/users" ? "bg-gray-700" : ""
            }`}
          >
            <FiUsers className="mr-2" /> User Management
          </Link>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        {isMobile && (
          <button onClick={toggleSidebar} className="md:hidden mb-4">
            <FiMenu size={24} />
          </button>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;