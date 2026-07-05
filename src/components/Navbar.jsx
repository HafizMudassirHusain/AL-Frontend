import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaUser, FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";
import logo from "../assets/logo.jpeg";
import { ThemeContext } from "../context/ThemeContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkClass = (path) =>
    `font-display uppercase tracking-[0.18em] text-[13px] transition-colors duration-300 ${
      location.pathname === path
        ? "text-[#D9A44D]"
        : theme === "light"
        ? "text-[#3d3427] hover:text-[#b9863a]"
        : "text-[#ECE3D0]/85 hover:text-[#D9A44D]"
    }`;

  return (
    <nav
      className={`${
        theme === "light"
          ? "bg-[#FAF6EE]/95 text-[#282016]"
          : "bg-[#16130F]/95 text-[#ECE3D0]"
      } backdrop-blur-md border-b border-[#D9A44D]/20 fixed top-0 min-w-full z-50`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <span className="w-12 h-12 rounded-full border border-[#D9A44D] p-[2px] inline-flex">
            <img
              src={logo}
              alt="MZ Kitchen"
              className="w-full h-full rounded-full object-cover"
            />
          </span>
          <span className="font-display text-xl tracking-[0.12em] uppercase whitespace-nowrap">
            MZ <span className="text-[#D9A44D]">Kitchen</span>
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((item) => (
            <Link key={item.path} to={item.path} className={linkClass(item.path)}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <Link to="/order" className="btn-lux-outline !py-2 !px-5">
            Reservation <span className="btn-dash" />
          </Link>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-[#D9A44D] hover:text-[#E8C06A] transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <Link to="/cart" className="relative text-[#D9A44D] hover:text-[#E8C06A] transition-colors">
            <FaShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D9A44D] text-[#1c1812] text-xs px-1.5 py-0.5 rounded-full font-semibold">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center font-display uppercase tracking-[0.12em] text-[13px] hover:text-[#D9A44D] transition duration-300"
              >
                <FaUser size={16} className="mr-2 text-[#D9A44D]" />
                {user.name}
              </button>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute right-0 mt-3 w-48 lux-card ${
                    theme === "light" ? "text-[#282016]" : "text-[#ECE3D0]"
                  } rounded-sm shadow-2xl py-2 z-50`}
                >
                  <Link to="/my-orders" className="block px-4 py-2 hover:text-[#D9A44D] transition-colors">
                    My Orders
                  </Link>
                  {(user?.role === "admin" || user?.role === "super-admin") && (
                    <Link to="/admin" className="block px-4 py-2 hover:text-[#D9A44D] transition-colors">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:text-[#D9A44D] transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="font-display uppercase tracking-[0.14em] text-[13px] hover:text-[#D9A44D] transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

        <button onClick={toggleMenu} className="lg:hidden text-[#D9A44D] focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className={`${
          theme === "light" ? "bg-[#FAF6EE] text-[#282016]" : "bg-[#16130F] text-[#ECE3D0]"
        } fixed top-0 right-0 h-full w-64 border-l border-[#D9A44D]/20 shadow-2xl z-50 lg:hidden flex flex-col p-6`}
      >
        <button onClick={toggleMenu} className="absolute top-4 right-4 text-[#D9A44D]">
          <FaTimes size={24} />
        </button>

        <div className="mt-14 space-y-5">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block font-display uppercase tracking-[0.16em] hover:text-[#D9A44D] text-base"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}

          <Link to="/order" onClick={toggleMenu} className="btn-lux-outline !py-2 !px-5">
            Reservation <span className="btn-dash" />
          </Link>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-[#D9A44D] hover:text-[#E8C06A] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          <Link
            to="/cart"
            className="block font-display uppercase tracking-[0.16em] hover:text-[#D9A44D] text-base"
            onClick={toggleMenu}
          >
            Cart {cart.length > 0 && `(${cart.length})`}
          </Link>

          {user ? (
            <>
              <Link
                to="/my-orders"
                className="block font-display uppercase tracking-[0.16em] hover:text-[#D9A44D] text-base"
                onClick={toggleMenu}
              >
                My Orders
              </Link>
              {(user?.role === "admin" || user?.role === "super-admin") && (
                <Link
                  to="/admin"
                  className="block font-display uppercase tracking-[0.16em] hover:text-[#D9A44D] text-base"
                  onClick={toggleMenu}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="block font-display uppercase tracking-[0.16em] hover:text-[#D9A44D] text-base w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block font-display uppercase tracking-[0.16em] hover:text-[#D9A44D] text-base"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
