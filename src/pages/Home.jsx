import { useEffect, useState } from "react";
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
import ctaBg from "../assets/bg-image.jpg";
import {
  FaPizzaSlice,
  FaDrumstickBite,
  FaPepperHot,
  FaIceCream,
  FaHamburger,
  FaWhatsapp,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import "../index.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SectionHeading = ({ kicker, title, subtitle }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    className="text-center mb-14"
  >
    <p className="lux-script text-2xl mb-2">{kicker}</p>
    <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-[0.04em] capitalize text-gold">
      {title}
    </h2>
    <div className="lux-divider" />
    {subtitle && (
      <p className="text-muted-warm max-w-xl mx-auto text-base leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [deals, setDeals] = useState([]);
  const [featured, setFeatured] = useState(null);

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
    // pick a featured dish
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/menu?sort=price:desc&limit=1&page=1`).then(res => {
      if (Array.isArray(res.data) && res.data.length > 0) setFeatured(res.data[0]);
    }).catch(() => {});
  }, []);

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
    <div className="min-h-screen surface">
      {/* ✅ Hero Section */}
      <HeroSection />

      {/* ✅ Stats Bar */}
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lux-card p-8 shadow-2xl">
            {[
              { label: 'Years Serving', value: '9+' },
              { label: 'Branches', value: '17+' },
              { label: 'Dishes', value: '120+' },
              { label: 'Orders Served', value: '100k+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-semibold text-gold">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-warm uppercase tracking-[0.14em] mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Today's Special (Deals) */}
      <section id="offers-section" className="py-24 lux-section">
        <div className="container mx-auto px-6">
          <SectionHeading
            kicker="Special Menu"
            title="Today's Special"
            subtitle="Special menu often comes different everyday — enjoy 15% off on today's handpicked dishes."
          />

          {deals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map((deal, index) => {
                const discountedPrice = (deal.price * 0.85).toFixed(0);
                const isAddedToCart = cart.some((item) => item._id === deal._id);

                return (
                  <motion.div
                    key={deal._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative lux-card overflow-hidden group text-left"
                  >
                    {/* Discount Badge */}
                    <span className="absolute top-3 left-3 z-10 bg-[#D9A44D] text-[#1c1812] text-xs font-semibold tracking-[0.08em] px-2.5 py-1">
                      15% OFF
                    </span>

                    {/* Added Badge */}
                    {isAddedToCart && (
                      <span className="absolute top-3 right-3 z-10 border border-[#D9A44D] text-[#D9A44D] bg-[#16130F]/80 text-xs font-semibold tracking-[0.08em] px-2.5 py-1">
                        Added
                      </span>
                    )}

                    {/* Image */}
                    <div className="overflow-hidden">
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-6">
                      {/* Title & Description */}
                      <h3 className="font-display text-xl font-semibold tracking-[0.08em] uppercase text-gold">
                        {deal.name}
                      </h3>
                      <p className="text-sm text-muted-warm mt-2 line-clamp-2 leading-relaxed">
                        {deal.description}
                      </p>

                      {/* Stars */}
                      <div className="flex gap-1 mt-4 star-gold">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} size={16} />
                        ))}
                      </div>

                      {/* Price */}
                      <div className="font-display text-lg mt-4 text-[#ECE3D0]">
                        <s className="text-muted-warm mr-2">Rs. {deal.price}</s>
                        <span className="text-gold font-semibold">Rs. {discountedPrice}</span>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap gap-3 mt-5">
                        <button
                          onClick={() => handleOrderNow(deal)}
                          className="btn-lux-outline !text-[12px] !py-2 !px-4"
                        >
                          Order Now <span className="btn-dash" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(deal)}
                          disabled={isAddedToCart}
                          className={`btn-lux !text-[12px] !py-2 !px-4 ${
                            isAddedToCart ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {isAddedToCart ? "In Cart" : "Add To Cart"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-warm text-center text-lg">No special offers available.</p>
          )}

          <motion.p
            className="text-center text-muted-warm mt-14 tracking-[0.08em] uppercase font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Enjoy <span className="text-gold font-semibold">free delivery</span> on orders above Rs. 1000
          </motion.p>
        </div>
      </section>

      {/* ✅ Our Story (About) */}
      <section className="py-24 lux-section-alt">
        <div className="container mx-auto px-6">
          <SectionHeading
            kicker="About Us"
            title="Our Story"
            subtitle="A journey of serving successful, high-quality food with the best services."
          />

          <div className="flex flex-col md:flex-row items-center gap-14">
            {/* Left: Image */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative border border-[#D9A44D]/30 p-3">
                <img
                  src={logo}
                  alt="MZ Kitchen"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <p className="text-lg leading-relaxed text-muted-warm mb-8">
                Founded in <span className="text-gold font-semibold">2016</span> with a single kitchen,
                <strong className="text-[#ECE3D0]"> MZ Kitchen </strong> has now grown to over{" "}
                <strong className="text-[#ECE3D0]">17+ branches</strong> across Karachi.
                <br /><br />
                Our story is built on one promise — serving{" "}
                <span className="text-gold">fresh, high-quality meals</span>{" "}
                made with care, consistency, and love. We&apos;re proud to be a part of your everyday
                happiness through great taste and exceptional service.
              </p>

              <button onClick={() => navigate("/about")} className="btn-lux-outline">
                More About Us <span className="btn-dash" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ✅ Featured Dish — Chef's Pick */}
      {featured && (
        <section className="py-24 lux-section">
          <div className="container mx-auto px-6">
            <SectionHeading
              kicker="Chef's Pick"
              title="Signature Dish"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 items-center lux-card overflow-hidden">
              <motion.div
                className="p-10 md:p-14"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="font-display text-4xl font-semibold text-gold mb-3">
                  Rs. {featured.price}
                </div>
                <h4 className="font-display text-2xl uppercase tracking-[0.1em] text-[#ECE3D0] mb-4">
                  {featured.name}
                </h4>
                <p className="text-muted-warm mb-8 leading-relaxed">{featured.description}</p>
                <button onClick={() => handleOrderNow(featured)} className="btn-lux">
                  Order This <span className="btn-dash" />
                </button>
              </motion.div>
              <motion.div
                className="h-72 md:h-full min-h-72"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ✅ Browse by Category */}
      <section className="py-24 lux-section-alt">
        <div className="container mx-auto px-6">
          <SectionHeading
            kicker="Quality Food For You"
            title="Browse Categories"
          />
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
                className="group lux-card p-6 hover:border-[#D9A44D]/60 hover:shadow-[0_0_25px_rgba(217,164,77,0.15)] transition-all duration-300"
              >
                <div className="text-2xl mb-3 text-gold flex justify-center">{cat.icon}</div>
                <div className="font-display text-sm uppercase tracking-[0.12em] text-[#ECE3D0]">
                  {cat.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Services, Gallery & Testimonials */}
      <OurServices />
      <Gallery />
      <Testimonials />

      {/* ✅ Dining Experience CTA Band */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ctaBg})` }}
        />
        <div className="absolute inset-0 bg-[#16130F]/85" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="font-display text-4xl md:text-5xl font-semibold capitalize text-[#ECE3D0] mb-6 leading-snug max-w-3xl mx-auto">
              We&apos;re Ready To Have You{" "}
              <span className="text-gold">The Best Dining Experiences</span>
            </h3>

            <div className="flex flex-wrap justify-center gap-8 text-muted-warm mb-10 text-sm">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gold" />
                Gulistan-e-Johar, Karachi
              </span>
              <span className="flex items-center gap-2">
                <FaPhone className="text-gold" />
                Call us: 0344-2241275
              </span>
            </div>

            <button onClick={() => navigate('/order')} className="btn-lux">
              Reserve A Table <span className="btn-dash" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ✅ Newsletter */}
      <section className="py-24 lux-section">
        <div className="container mx-auto px-6">
          <div className="lux-card p-10 md:p-14 text-center">
            <p className="lux-script text-2xl mb-2">Stay In Touch</p>
            <h4 className="font-display text-3xl font-semibold capitalize text-gold mb-3">
              Get Exclusive Offers
            </h4>
            <p className="text-muted-warm mb-8">
              Join our newsletter to receive special deals and seasonal updates.
            </p>
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-[#16130F] border border-[#D9A44D]/30 text-[#ECE3D0] placeholder-[#A49B8A] focus:outline-none focus:border-[#D9A44D] transition-colors"
              />
              <button className="btn-lux">
                Subscribe <span className="btn-dash" />
              </button>
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
