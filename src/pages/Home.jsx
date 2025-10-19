import bghero from '../assets/hero-bg.jpg';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import Gallery from "../components/Menutemp";
import Testimonials from "../components/Testimonials";
import OurServices from "../components/OurServices";
import HeroSection from "../components/Hero";
import logo from "../assets/logo.jpeg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import '../index.css'

const Home = () => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [deals, setDeals] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/menu?category=deals`);
        const filteredDeals = response.data.filter(item => item.category.toLowerCase() === "deals");
        setDeals(filteredDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };
    fetchDeals();
  }, []);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  const handleAddToCart = async (deal) => {
    const discountedPrice = (deal.price * 0.85).toFixed(0);
    const existingItem = cart.find((item) => item._id === deal._id);

    if (existingItem) {
      addToCart({ ...existingItem, quantity: existingItem.quantity + 1 });
    } else {
      addToCart({ ...deal, price: discountedPrice, quantity: 1 });
    }
  };

  const handleOrderNow = async (deal) => {
    await handleAddToCart(deal);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-orange-50 to-white text-gray-800">
      {/* ✅ Hero Section */}
      <HeroSection bghero={bghero} />

      {/* ✅ About Section */}
   <section className="relative py-24 overflow-hidden">
  {/* ✨ Gradient Glow Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

  <div className="container relative mx-auto px-6">
    <div className="flex flex-col md:flex-row items-center gap-14">
      {/* 🖼️ Left: Image */}
      <motion.div
        className="w-full md:w-1/2 relative"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Decorative floating gradient blob */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-orange-300/50 to-pink-400/40 blur-3xl rounded-full animate-pulse-slow"></div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
          <img
            src={logo}
            alt="MZ Kitchen"
            className="w-full h-auto rounded-3xl transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </motion.div>

      {/* 🧾 Right: Text */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          About MZ Kitchen
        </h2>
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
          Founded in <span className="font-semibold text-orange-500">2016</span> with a single kitchen,
          <strong> MZ Kitchen </strong> has now grown to over <strong>17+ branches</strong> across Karachi.
          <br /><br />
          Our story is built on one promise — serving <span className="text-orange-500 font-medium">fresh, high-quality meals</span>
          made with care, consistency, and love. We’re proud to be a part of your everyday happiness through great taste
          and exceptional service.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/about")}
          className="relative inline-block px-10 py-3 text-white font-medium rounded-full overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 shadow-lg hover:shadow-orange-400/40 transition-all duration-300"
        >
          <span className="relative z-10">Read More</span>
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        </motion.button>
      </motion.div>
    </div>
  </div>
</section>

      {/* ✅ Special Offers Section */}
   {/* ✅ Enhanced Special Offers Section */}
<section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 py-24 overflow-hidden">
  {/* ✨ Animated Gradient Glow Layers */}
  <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
  <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>

  <div className="container mx-auto px-6 text-center relative z-10">
    {/* Title */}
    <motion.h2
      className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-yellow-200 animate-text-glow">
        🔥 Exclusive Deals – 15% OFF 🔥
      </span>
    </motion.h2>

    {/* Subtitle */}
    <motion.p
      className="text-white/90 mb-14 max-w-2xl mx-auto text-lg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      Handpicked meals crafted with love — indulge in rich flavors and enjoy a <span className="text-yellow-300 font-semibold">15% discount</span> today!
    </motion.p>

    {/* Deals Carousel */}
    <div className="relative flex items-center">
      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-20 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white hover:scale-105 transition hidden sm:flex"
        aria-label="Scroll Left"
      >
        <FaChevronLeft className="text-orange-700 text-lg" />
      </button>

      {/* Scrollable Deals */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scroll-smooth px-10 py-6 hide-scrollbar"
      >
        {deals.length > 0 ? (
          deals.map((deal, index) => {
            const discountedPrice = (deal.price * 0.85).toFixed(0);
            const isAddedToCart = cart.some((item) => item._id === deal._id);

            return (
              <motion.div
                key={deal._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[260px] max-w-[280px] shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_35px_rgba(255,180,70,0.3)] transition-all duration-300 text-left group"
              >
                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  15% OFF
                </span>

                {/* Added Badge */}
                {isAddedToCart && (
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    Added
                  </span>
                )}

                {/* Image */}
                <div className="overflow-hidden rounded-xl mb-4 relative">
                  <motion.img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-36 object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-white">{deal.name}</h3>
                <p className="text-sm text-white/80 mt-1 line-clamp-2">
                  {deal.description}
                </p>

                {/* Price */}
                <div className="text-lg font-bold text-yellow-300 mt-3">
                  <s className="text-gray-300 mr-1">Rs. {deal.price}</s> Rs. {discountedPrice}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(deal)}
                    disabled={isAddedToCart}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isAddedToCart
                        ? "bg-gray-500 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-yellow-400 to-orange-500 text-orange-900 font-semibold hover:opacity-90"
                    }`}
                  >
                    {isAddedToCart ? "In Cart" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => handleOrderNow(deal)}
                    className="border border-yellow-400 text-yellow-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 hover:text-orange-800 transition-all duration-300"
                  >
                    Order Now
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-white text-lg w-full">No special offers available.</p>
        )}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 z-20 bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white hover:scale-105 transition hidden sm:flex"
        aria-label="Scroll Right"
      >
        <FaChevronRight className="text-orange-700 text-lg" />
      </button>
    </div>

    {/* Footer Note */}
    <motion.p
      className="text-white text-lg mt-12 font-medium"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      🚚 Enjoy <span className="font-bold text-yellow-300">FREE DELIVERY</span> on orders above Rs. 1000!
    </motion.p>
  </div>
</section>



      {/* ✅ Services, Gallery & Testimonials */}
      <OurServices />
      <Gallery />
      <Testimonials />
    </div>
  );
};

export default Home;
