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
import Branches from "../components/Branches";
import logo from "../assets/logo.jpeg";
import { FaChevronLeft, FaChevronRight, FaPizzaSlice, FaDrumstickBite, FaPepperHot, FaIceCream, FaHamburger, FaWhatsapp } from "react-icons/fa";
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
    <div className="min-h-screen font-sans surface">
      {/* ✅ Hero Section */}
      <HeroSection bghero={bghero} />

      {/* ✅ Stats Bar */}
      <section className="relative -mt-10 z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-orange-200/30 dark:border-gray-700/60 rounded-3xl p-6 shadow-xl">
            {[
              { label: 'Years Serving', value: '9+' },
              { label: 'Branches', value: '17+' },
              { label: 'Dishes', value: '120+' },
              { label: 'Orders Served', value: '100k+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold brand-text-gradient">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
        <h2 className="text-5xl font-extrabold mb-6 brand-text-gradient">
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
<section id="offers-section" className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 py-24 overflow-hidden">
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

      {/* ✅ Browse by Category */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-extrabold text-center mb-8 brand-text-gradient">Browse by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: 'Biryani', icon: <FaPepperHot /> },
              { name: 'Karahi', icon: <FaDrumstickBite /> },
              { name: 'BBQ', icon: <FaPepperHot /> },
              { name: 'Burgers', icon: <FaHamburger /> },
              { name: 'Rolls', icon: <FaPizzaSlice /> },
              { name: 'Desserts', icon: <FaIceCream /> },
            ].map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate('/menu')}
                className="group rounded-2xl p-4 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-orange-200/40 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-2xl mb-2 brand-text-gradient">{cat.icon}</div>
                <div className="text-sm font-semibold">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Services, Gallery & Testimonials */}
      <OurServices />
      <Gallery />
      <Testimonials />

      {/* ✅ CTA Band */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="brand-gradient rounded-3xl p-10 md:p-14 text-center text-white shadow-xl">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Hungry? Let’s Fix That 🍛</h3>
            <p className="opacity-90 mb-6">Fresh, flavorful meals delivered fast across Karachi.</p>
            <button onClick={() => navigate('/menu')} className="px-6 py-3 rounded-full bg-white text-orange-600 font-semibold hover:opacity-90">
              Explore Menu
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Newsletter */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-orange-200/30 dark:border-gray-700/60 rounded-3xl p-8 md:p-10 text-center">
            <h4 className="text-2xl font-bold mb-2 brand-text-gradient">Get exclusive offers</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Join our newsletter to receive special deals and seasonal updates.</p>
            <div className="max-w-xl mx-auto flex gap-3">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/80 focus:outline-none" />
              <button className="px-6 py-3 rounded-full brand-gradient text-white font-semibold hover:opacity-90">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
      <Branches />

      {/* ✅ WhatsApp Floating Action Button */}
      <a
        href="https://wa.me/923442241275"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp /> Chat
      </a>
    </div>
  );
};

export default Home;
