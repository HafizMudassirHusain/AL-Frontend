import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import bikerider from "../assets/bikerider.png";
import "./HeroSection.css";

const HeroSection = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/slides`)
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);

  const handleScrollToOffers = () => {
    const offersSection = document.querySelector("#offers-section");
    if (offersSection) offersSection.scrollIntoView({ behavior: "smooth" });
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className="relative flex items-center justify-center h-[90vh] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* ✅ Dynamic background */}
            <div
              className="absolute inset-0 bg-cover bg-center hero-vignette"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-[1]" />
            </div>

            {/* ✅ Hero Text Content */}
            <div className="relative z-[2] flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-20">
              <motion.h1
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-[0_4px_20px_rgba(255,107,0,0.3)]"
              >
                <span className="brand-text-gradient">
                  {slide.text}
                </span>
              </motion.h1>

              <motion.p
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                {slide.subtext}
              </motion.p>

              {/* CTAs */}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleScrollToOffers}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  className="brand-gradient text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(255,107,0,0.4)] transition-all duration-300"
                >
                  Order Now 🍽️
                </motion.button>
                <motion.button
                  onClick={() => window.location.assign('/menu')}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-white/90 text-orange-600 font-semibold shadow-lg hover:bg-white transition-all duration-300"
                >
                  Explore Menu
                </motion.button>
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-white/90">
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">⭐ 4.8/5 — 5k+ reviews</div>
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">🚚 30 min avg delivery</div>
                <div className="hidden md:block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">✅ Halal Certified</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Floating Home Delivery Card */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 right-6 md:right-12 z-[3] bg-gradient-to-r from-[#FF5E62]/30 to-[#FFD43B]/30 backdrop-blur-md border border-white/20 text-white shadow-lg rounded-2xl px-6 py-4 flex flex-col items-center hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={bikerider}
          alt="Delivery Bike Rider"
          className="w-16 h-16 md:w-20 md:h-20 mb-2 animate-bounce-slow drop-shadow-[0_0_20px_rgba(255,107,0,0.4)]"
        />
        <p className="text-lg md:text-xl font-semibold text-center">
          🚴‍♂️{" "}
          <span className="bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] bg-clip-text text-transparent">
            Home Delivery
          </span>{" "}
          Available
        </p>
        <p className="text-xs md:text-sm text-white/80 mt-1">
          Fresh meals at your doorstep
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
