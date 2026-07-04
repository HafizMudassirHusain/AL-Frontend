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
        className={`bg-[#121009] text-[#ECE3D0] border-r border-[#D9A44D]/20 w-64 min-h-screen p-5 transition-all ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
        initial={{ x: -100 }}
        animate={{ x: sidebarOpen ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-display text-xl font-semibold uppercase tracking-[0.12em] text-gold">Admin Panel</h2>
          {isMobile && (
            <button onClick={toggleSidebar} className="md:hidden">
              <FiX size={24} />
            </button>
          )}
        </div>

        <nav className="mt-5">
          <Link
            to="/admin/dashboard"
            className={`flex items-center p-3 hover:bg-[#D9A44D]/10 hover:text-[#D9A44D] transition-colors ${
              location.pathname === "/admin/dashboard" ? "bg-[#D9A44D]/15 text-[#D9A44D] border-l-2 border-[#D9A44D]" : ""
            }`}
          >
            <FiHome className="mr-2" /> Dashboard
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center p-3 hover:bg-[#D9A44D]/10 hover:text-[#D9A44D] transition-colors ${
              location.pathname === "/admin/orders" ? "bg-[#D9A44D]/15 text-[#D9A44D] border-l-2 border-[#D9A44D]" : ""
            }`}
          >
            <FiList className="mr-2" /> Manage Orders
          </Link>
          <Link
            to="/admin/menu"
            className={`flex items-center p-3 hover:bg-[#D9A44D]/10 hover:text-[#D9A44D] transition-colors ${
              location.pathname === "/admin/menu" ? "bg-[#D9A44D]/15 text-[#D9A44D] border-l-2 border-[#D9A44D]" : ""
            }`}
          >
            🍽 Manage Menu
          </Link>
          <Link
            to="/admin/analytics"
            className={`flex items-center p-3 hover:bg-[#D9A44D]/10 hover:text-[#D9A44D] transition-colors ${
              location.pathname === "/admin/analytics" ? "bg-[#D9A44D]/15 text-[#D9A44D] border-l-2 border-[#D9A44D]" : ""
            }`}
          >
            <FiBarChart className="mr-2" /> Analytics
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center p-3 hover:bg-[#D9A44D]/10 hover:text-[#D9A44D] transition-colors ${
              location.pathname === "/admin/users" ? "bg-[#D9A44D]/15 text-[#D9A44D] border-l-2 border-[#D9A44D]" : ""
            }`}
          >
            <FiUsers className="mr-2" /> User Management
          </Link>
          <Link
            to="/admin/hero-section"
            className={`flex items-center p-3 hover:bg-[#D9A44D]/10 hover:text-[#D9A44D] transition-colors ${
              location.pathname === "/admin/hero-section" ? "bg-[#D9A44D]/15 text-[#D9A44D] border-l-2 border-[#D9A44D]" : ""
            }`}
          >
            🌟 Admin Hero Section
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