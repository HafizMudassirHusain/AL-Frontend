import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useLocation, Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";

// ✅ Tilt Card with MZ Kitchen Theme
const TiltCard = ({ item, theme, i, addToCart }) => {
  const x = useMotionValue(125);
  const y = useMotionValue(125);
  const rotateX = useTransform(y, [0, 250], [10, -10]);
  const rotateY = useTransform(x, [0, 250], [-10, 10]);

  return (
    <motion.div
      key={item._id}
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        x.set(125);
        y.set(125);
      }}
      className={`group relative rounded-2xl overflow-hidden border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 
        ${
          theme === "light"
            ? "bg-white/60 border-orange-100 hover:shadow-[0_10px_40px_rgba(255,107,0,0.25)]"
            : "bg-[#1f1f1f]/60 border-gray-700 hover:shadow-[0_10px_40px_rgba(255,107,0,0.25)]"
        }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
    >
      <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-md">
        {item.category}
      </div>

      <div className="relative overflow-hidden rounded-t-2xl">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-36 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="p-4 flex flex-col justify-between h-[130px]">
        <div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-[#FF5E62] to-[#FF9966] bg-clip-text text-transparent line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
            {item.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-base font-semibold bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] bg-clip-text text-transparent">
            Rs. {item.price}
          </p>
          <motion.button
            onClick={() => {
              addToCart(item);
              toast.success(`${item.name} added to cart!`);
            }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] text-white font-medium text-sm px-3 py-1.5 rounded-full shadow-md hover:scale-105 hover:shadow-[0_0_12px_rgba(255,107,0,0.5)] transition-all"
          >
            + Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

TiltCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
  theme: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
};

// ✅ Main Menu Component
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [total, setTotal] = useState(0);
  const { addToCart } = useCart();
  const location = useLocation();
  const scrollRef = useRef(null);
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
        const uniqueCategories = [
          "All",
          ...new Set(menuWithoutDeals.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "All") params.set("category", selectedCategory);
      if (searchQuery) params.set("q", searchQuery);
      if (sort) params.set("sort", sort);
      if (!isHomePage) {
        params.set("page", String(page));
        params.set("limit", String(limit));
      }
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/menu?${params.toString()}`;
      const res = await axios.get(url);
      const totalCount = res.headers["x-total-count"];
      setTotal(totalCount ? parseInt(totalCount) : res.data.length);
      // Exclude deals consistently
      const withoutDeals = res.data.filter((i) => i.category !== "deals");
      setItems(isHomePage ? withoutDeals.slice(0, 6) : withoutDeals);
    } catch (e) {
      console.error("Error fetching filtered items:", e);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery, sort, page, limit, isHomePage]);

  const filterMenu = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    setPage(1);
  };

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });

  const specials = menu.filter((item) => item.isSpecial);

  return (
    <div
      className={`container mx-auto px-6 py-16 transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-b from-[#FFF8F3] to-white text-gray-900"
          : "bg-gradient-to-b from-gray-900 to-[#1f1f1f] text-white"
      }`}
    >
      <Toaster position="bottom-center" />

      {/* ✅ Intro Section */}
      <section className="text-center py-14 mb-12 bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] text-white rounded-3xl shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4">Explore Our Delicious Menu 🍽️</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          From sizzling appetizers to mouth-watering desserts — every dish is
          made fresh with love and top-quality ingredients.
        </p>
      </section>

      {/* ✅ Search + Sort */}
      <div className="flex justify-center mb-10">
        <div className="flex w-full sm:w-2/3 md:w-1/2 gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search your favorite dish..."
            className="flex-1 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9966]"
          />
          {!isHomePage && (
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
            >
              <option value="createdAt:desc">Newest</option>
              <option value="price:asc">Price: Low → High</option>
              <option value="price:desc">Price: High → Low</option>
              <option value="name:asc">Name: A → Z</option>
              <option value="name:desc">Name: Z → A</option>
            </select>
          )}
        </div>
      </div>

      {/* ✅ Category Scroll */}
      <div className="relative flex items-center mb-10">
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-white/70 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-md hover:bg-[#FFF0E0] transition hidden sm:flex"
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
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 
                ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] text-white shadow-md"
                    : "bg-white/60 dark:bg-gray-700/50 backdrop-blur-md text-gray-700 dark:text-white hover:bg-[#FFE0CC]"
                }`}
              onClick={() => filterMenu(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-white/70 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-md hover:bg-[#FFF0E0] transition hidden sm:flex"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* ✅ Chef's Specials Section */}
      {specials.length > 0 && (
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] bg-clip-text text-transparent">
            🍲 Chef’s Specials
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {specials.map((item, i) => (
              <TiltCard
                key={item._id}
                item={item}
                theme={theme}
                i={i}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      )}

      {/* ✅ Menu Grid with Empty/Loading States */}
      {menu.length === 0 && items.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading menu... 🍳
        </div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No items found 😔
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <TiltCard
              key={item._id}
              item={item}
              theme={theme}
              i={i}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}

      {/* ✅ Pagination */}
      {!isHomePage && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-full border ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'}`}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={total && limit ? page * limit >= total : false}
            className={`px-4 py-2 rounded-full border ${(total && limit ? page * limit >= total : false) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'}`}
          >
            Next
          </button>
          <select
            value={limit}
            onChange={(e) => { setLimit(parseInt(e.target.value)); setPage(1); }}
            className="ml-2 px-3 py-2 rounded-full border"
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
          </select>
        </div>
      )}

      {/* ✅ Bottom CTA */}
      <div className="mt-20 text-center py-10 bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] rounded-3xl shadow-md text-white">
        <h3 className="text-2xl font-bold mb-2">Craving something special?</h3>
        <p>Check out our exclusive offers and meal deals now!</p>
        <Link to="/offers">
          <button className="mt-4 bg-white text-[#FF5E62] px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
            View Offers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
