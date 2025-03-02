import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg fixed top-0 min-w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="MZ Kitchen" className="w-12 h-12 mr-2" />
          <h1 className="text-2xl font-bold dark:text-white">MZ Kitchen</h1>
        </Link>

        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className={`relative text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300 ${location.pathname === "/" ? "text-orange-500 font-semibold" : ""}`}>
            Home
          </Link>
          <Link to="/menu" className={`relative text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300 ${location.pathname === "/menu" ? "text-orange-500 font-semibold" : ""}`}>
            Menu
          </Link>
          <Link to="/about" className={`relative text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300 ${location.pathname === "/about" ? "text-orange-500 font-semibold" : ""}`}>
            About
          </Link>
          <Link to="/contact" className={`relative text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300 ${location.pathname === "/contact" ? "text-orange-500 font-semibold" : ""}`}>
            Contact
          </Link>

          <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-orange-500">
            <FaShoppingCart size={22} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>}
          </Link>

          {user ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300">
                <FaUser size={20} className="mr-2" />
                {user.name}
              </button>
              {isDropdownOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <Link to="/my-orders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Orders</Link>
                  {(user?.role === "admin" || user?.role === "super-admin") && <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Admin</Link>}
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300">Login</Link>
          )}
        </div>

        <button onClick={toggleMenu} className="lg:hidden text-gray-700 dark:text-gray-300 focus:outline-none">
          {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
        </button>
      </div>

      <motion.div initial={{ x: "100%" }} animate={{ x: isOpen ? 0 : "100%" }} transition={{ duration: 0.3 }} className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 lg:hidden flex flex-col p-6">
        <button onClick={toggleMenu} className="absolute top-4 right-4">
          <FaTimes size={26} className="text-gray-700 dark:text-gray-300" />
        </button>

        <div className="mt-12 space-y-4">
          <Link to="/" className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 text-lg" onClick={toggleMenu}>Home</Link>
          <Link to="/menu" className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 text-lg" onClick={toggleMenu}>Menu</Link>
          <Link to="/about" className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 text-lg" onClick={toggleMenu}>About</Link>
          <Link to="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 text-lg" onClick={toggleMenu}>Contact</Link>
          <Link to="/cart" className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 text-lg" onClick={toggleMenu}>Cart</Link>
          {user ? (
            <>
              <Link to="/my-orders" className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 text-lg" onClick={toggleMenu}>My Orders</Link>
              {(user?.role === "admin" || user?.role === "super-admin") && <Link to="/admin" className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 text-lg" onClick={toggleMenu}>Admin</Link>}
              <button onClick={() => { logout(); toggleMenu(); }} className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 text-lg w-full text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 text-lg" onClick={toggleMenu}>Login</Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
