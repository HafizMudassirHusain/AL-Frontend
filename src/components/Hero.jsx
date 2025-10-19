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

  // ✨ Animation variants for text
  const textAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className="relative flex items-center justify-center h-[100vh] overflow-hidden">
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
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Dark gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 z-[1]" />
            </div>

            {/* ✅ Text Content */}
            <div className="relative z-[2] flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-20">
              <motion.h1
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg"
              >
                {slide.text}
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

              <motion.button
                onClick={handleScrollToOffers}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300"
              >
                Order Now
              </motion.button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Home Delivery Floating Card */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 right-6 md:right-12 z-[3] bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg rounded-2xl px-6 py-4 flex flex-col items-center hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={bikerider}
          alt="Delivery Bike Rider"
          className="w-16 h-16 md:w-20 md:h-20 mb-2 animate-bounce-slow"
        />
        <p className="text-lg md:text-xl font-semibold font-serif text-center">
          🚴‍♂️ <span className="text-orange-400">Home Delivery</span> Available
        </p>
        <p className="text-xs md:text-sm text-white/80 mt-1">
          Fresh meals at your doorstep
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
