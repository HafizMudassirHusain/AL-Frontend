import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart, cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [quantities, setQuantities] = useState({});
  const isHomePage = location.pathname === "/";
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/menu`)
      .then((response) => {
        const menuWithoutDeals = response.data.filter(
          (item) => item.category !== "deals"
        );
        setMenu(menuWithoutDeals);
        setFilteredMenu(menuWithoutDeals);
        const uniqueCategories = [
          "All",
          ...new Set(menuWithoutDeals.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const filterMenu = (category) => {
    setSelectedCategory(category);
    if (category === "All") setFilteredMenu(menu);
    else setFilteredMenu(menu.filter((item) => item.category === category));
  };

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });

  const incrementQuantity = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decrementQuantity = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));

  const handleAddToCart = (item) => {
    const quantity = quantities[item._id] || 1;
    const totalPrice = quantity * item.price;
    addToCart({ ...item, quantity, totalPrice });
  };

  const handleOrderNow = (item) => {
    const quantity = quantities[item._id] || 1;
    const totalPrice = quantity * item.price;
    const orderItem = { ...item, quantity, totalPrice };
    addToCart(orderItem);
    navigate("/cart", { state: { orderItem } });
  };

  const isInCart = (id) => cart.some((cartItem) => cartItem._id === id);
  const displayedMenu = isHomePage ? filteredMenu.slice(0, 6) : filteredMenu;

  return (
    <div
      className={`container mx-auto px-6 py-16 transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-b from-orange-50 to-white text-gray-900"
          : "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      }`}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center mb-10 text-orange-500"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Menu
      </motion.h2>

      {/* ✅ Category Scroll Bar */}
      <div className="relative flex items-center mb-10">
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-white/70 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-md hover:bg-orange-100 transition hidden sm:flex"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-12 scrollbar-hide"
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-md"
                  : "bg-white/60 dark:bg-gray-700/50 backdrop-blur-md text-gray-700 dark:text-white hover:bg-orange-200"
              }`}
              onClick={() => filterMenu(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-white/70 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-md hover:bg-orange-100 transition hidden sm:flex"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* ✅ Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayedMenu.map((item, i) => {
          const quantity = quantities[item._id] || 1;
          const totalPrice = quantity * item.price;

          return (
            <motion.div
              key={item._id}
              className={`relative rounded-2xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-lg p-5 
                transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl 
                ${
                  theme === "light"
                    ? "bg-white/80"
                    : "bg-gray-800/50 border-gray-700/30"
                } ${isInCart(item._id) ? "ring-2 ring-green-400" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {isInCart(item._id) && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
                  ✔ Added
                </div>
              )}

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold mb-1 text-orange-500">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                  Rs. {totalPrice}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementQuantity(item._id)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item._id)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-medium px-4 py-2 rounded-lg hover:shadow-lg transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleOrderNow(item)}
                  className="border border-orange-400 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {isHomePage && (
        <div className="text-center mt-10">
          <Link to="/menu">
            <button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition">
              View Full Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
