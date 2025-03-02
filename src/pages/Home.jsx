import bghero from '../assets/hero-bg.jpg';

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext"; // ✅ Import Cart Context
import Gallery from "../components/Menutemp";
import Testimonials from "../components/Testimonials";
import OurServices from "../components/OurServices";
import HeroSection from "../components/Hero";
import logo from "../assets/logo.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart(); // ✅ Access cart functions
  const [deals, setDeals] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/menu?category=deals`) // ✅ Fetch only deals
      .then(response => {
        const filteredDeals = response.data.filter(item => item.category.toLowerCase() === "deals");
        setDeals(filteredDeals);
      })
      .catch(error => console.error("Error fetching deals:", error));
  }, []);

  // ✅ Scroll Buttons for Deals Section
  const scrollLeft = () => scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });

  // ✅ Add to Cart Function
  const handleAddToCart = (deal) => {
    const discountedPrice = (deal.price * 0.85).toFixed(0); // ✅ Apply 15% discount

    // ✅ Check if item is already in cart
    const existingItem = cart.find((item) => item._id === deal._id);
    
    if (existingItem) {
      // ✅ If item exists, increase quantity
      addToCart({ ...existingItem, quantity: existingItem.quantity + 1 });
    } else {
      // ✅ Otherwise, add a new item with quantity 1
      addToCart({ ...deal, price: discountedPrice, quantity: 1 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Hero Section */}
      <HeroSection bghero={bghero} />

      {/* ✅ Introduction Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={logo} alt="MZ Kitchen" className="w-full h-auto rounded-lg" />
          </motion.div>

          {/* Text */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-6">About MZ Kitchen</h2>
            <p className="text-lg text-gray-700 mb-6">
              We started in 2016 with a single kitchen. Today, we proudly serve across 17+ branches in Karachi. Our commitment to quality and delicious food has made us a trusted name in the food industry.
            </p>
            <button 
              onClick={() => navigate("/about")}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Read More
            </button>
          </motion.div>
        </div>
      </div>

      {/* ✅ Special Offers Section (Deals from API) */}
      <div className="bg-orange-500 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">🔥 Special Offers - 15% OFF! 🔥</h2>

          {/* ✅ Scrollable Deals Section */}
          <div className="relative flex items-center">
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition hidden sm:flex"
            >
              <FaChevronLeft />
            </button>

            <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-10">
              {deals.length > 0 ? (
                deals.map((deal) => {
                  const discountedPrice = (deal.price * 0.85).toFixed(0); // ✅ Apply 15% discount
                  const isAddedToCart = cart.some((item) => item._id === deal._id); // ✅ Check if item is in cart

                  return (
                    <div key={deal._id} className="relative bg-white p-4 rounded-lg shadow-md min-w-[250px] text-center">
                      {/* ✅ Discount Badge */}
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        15% OFF
                      </span>

                      {/* ✅ "Added to Cart" Badge */}
                      {isAddedToCart && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Added to Cart
                        </span>
                      )}

                      <img src={deal.image} alt={deal.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                      <h3 className="text-lg font-semibold">{deal.name}</h3>
                      <p className="text-gray-600">{deal.description}</p>

                      {/* ✅ Show Discounted Price */}
                      <p className="text-xl font-bold text-orange-500 mt-2">
                        <s className="text-gray-500">Rs. {deal.price}</s> Rs. {discountedPrice}
                      </p>

                      {/* ✅ Buttons */}
                      <div className="flex flex-col gap-2 mt-3">
                        <button 
                          onClick={() => handleAddToCart(deal)}
                          className={`px-4 py-2 rounded-lg transition duration-300 ${
                            isAddedToCart ? "bg-gray-500 text-white cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
                          }`}
                          disabled={isAddedToCart} // ✅ Disable if already added
                        >
                          {isAddedToCart ? "In Cart" : "Add to Cart"}
                        </button>
                        <button 
                          onClick={() => navigate("/cart")}
                          className="bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-white transition duration-300"
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-white text-lg">No special offers available.</p>
              )}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition hidden sm:flex"
            >
              <FaChevronRight />
            </button>
          </div>

          <p className="text-xl text-white mt-6">Enjoy FREE DELIVERY on orders above Rs. 1000!</p>
        </div>
      </div>

      {/* ✅ Services Section */}
      <OurServices />

      {/* ✅ Gallery Section */}
      <Gallery />

      {/* ✅ Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Home;
