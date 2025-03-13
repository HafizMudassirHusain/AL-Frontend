import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/menu`)
      .then(response => {
        // Remove items with category "Deals"
        const menuWithoutDeals = response.data.filter(item => item.category !== "deals");
  // console.log(menuWithoutDeals)
        setMenu(menuWithoutDeals);
        setFilteredMenu(menuWithoutDeals);
  
        // Get unique categories, excluding "Deals"
        const uniqueCategories = ["All", ...new Set(menuWithoutDeals.map(item => item.category))];
        setCategories(uniqueCategories);
        console.log(uniqueCategories)
      })
     
      .catch(error => console.error("Error fetching menu:", error));
  }, []);

  // ✅ Handle Category Click
  const filterMenu = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(menu.filter(item => item.category === category));
    }
  };

  // ✅ Scroll Buttons for Categories
  const scrollLeft = () => scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });

  // ✅ Handle Increment
  const incrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // ✅ Handle Decrement
  const decrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // ✅ Add to Cart with Updated Quantity
  const handleAddToCart = (item) => {
    const quantity = quantities[item._id] || 1;
    const totalPrice = quantity * item.price;

    const updatedItem = {
      ...item,
      quantity,
      totalPrice,
    };

    addToCart(updatedItem);
  };

  // ✅ Handle "Order Now" (Navigate to Order Page)
  const handleOrderNow = (item) => {
    const quantity = quantities[item._id] || 1;
    const totalPrice = quantity * item.price;

    const orderItem = {
      ...item,
      quantity,
      totalPrice,
    };
    addToCart(orderItem);
    navigate("/cart", { state: { orderItem } });
  };

  // ✅ Check if item is already in cart
  const isInCart = (id) => cart.some(cartItem => cartItem._id === id);

  // ✅ Limit items to 6 if on Home Page
  const displayedMenu = isHomePage ? filteredMenu.slice(0, 6) : filteredMenu;
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`container mx-auto px-6 py-12 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>

      {/* ✅ Category Scrollable Buttons */}
      <div className="relative flex items-center mb-8 ">
        <button onClick={scrollLeft} className={`absolute left-0 z-10 
        ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-100 text-black'} p-2 rounded-full shadow-md
         hover:bg-gray-300 dark:hover:bg-gray-600 transition hidden sm:flex`}>
          <FaChevronLeft />
        </button>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 whitespace-nowrap rounded-lg font-semibold ${
          selectedCategory === category ? "bg-orange-500 text-white" : `${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-white text-black'}`
              } hover:bg-orange-600 dark:hover:bg-gray-600 transition duration-300`}
              onClick={() => filterMenu(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <button onClick={scrollRight} className={`absolute right-0 z-10 
         ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-100 text-black'} p-2 rounded-full 
         shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition hidden sm:flex`}>
          <FaChevronRight />
        </button>
      </div>

      {/* ✅ Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedMenu.map((item) => {
          const quantity = quantities[item._id] || 1;
          const totalPrice = quantity * item.price;

          return (
            <div key={item._id} className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4 ${isInCart(item._id) ? "border-2 border-green-500" : ""}`}>
              {/* ✅ "Already Added" Badge */}
              {isInCart(item._id) && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  ✔ Already Added
                </div>
              )}

              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4 text-center">
                <h3 className={`text-xl font-semibold mb-2 
                  ${theme === 'light' ? 'bg-white text-black' : 'bg-white text-black'}`}>{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>

                {/* ✅ Price & Quantity Controls */}
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-bold text-orange-500">Rs. {totalPrice}</p>

                  <div className="flex items-center gap-2">
                    <button onClick={() => decrementQuantity(item._id)} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400 transition">
                      <FaMinus />
                    </button>
                    <span className={`text-lg font-bold ${theme === 'light' ? 'bg-white text-black' : 'bg-white text-black'}`}>{quantity}</span>
                    <button onClick={() => incrementQuantity(item._id)} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400 transition">
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* ✅ Buttons */}
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleAddToCart(item)} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
                    Add to Cart
                  </button>
                  <button onClick={() => handleOrderNow(item)} className="bg-white text-orange-500 border px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Show "View All" Button on Home Page */}
      {isHomePage && (
        <div className="text-center mt-6">
          <Link to="/menu">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-300">
              View Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
