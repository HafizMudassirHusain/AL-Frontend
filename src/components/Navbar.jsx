import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for user dropdown

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold dark:text-white">MZ Kitchen</h1>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300">
            Home
          </Link>
          <Link to="/menu" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300">
            Menu
          </Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300">
            About Us
          </Link>
          <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300">
            <FaShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/order" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300">
            Order
          </Link>
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300"
              >
                <FaUser size={20} className="mr-2" />
                {user.name}
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link to="/my-orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    My Orders
                  </Link>
                  {user.role === "admin" && (
                    <Link to="/admin/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Admin
                    </Link>
                  &&
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button onClick={toggleMenu} className="lg:hidden text-gray-700 dark:text-gray-300 focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 shadow-lg">
          <Link to="/" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Home
          </Link>
          <Link to="/menu" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Menu
          </Link>
          <Link to="/about" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            About Us
          </Link>
          <Link to="/cart" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Cart ({cart.length})
          </Link>
          <Link to="/order" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Order
          </Link>
          {user ? (
            <>
              <Link to="/my-orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                My Orders
              </Link>
              {user.role === "admin" && (
                <Link to="/admin/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;