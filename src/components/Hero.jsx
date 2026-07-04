import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "./HeroSection.css";

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/slides`)
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);

  const textAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className="relative flex items-center justify-center h-[92vh] overflow-hidden bg-[#16130F]">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Dark luxury background */}
            <div
              className="absolute inset-0 bg-cover bg-center hero-vignette"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-[#16130F]/80 z-[1]" />
            </div>

            {/* Hero Text Content */}
            <div className="relative z-[2] flex flex-col items-center justify-center h-full text-center px-6 md:px-20">
              {/* Script kicker */}
              <motion.p
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                className="lux-script text-2xl md:text-3xl mb-5"
              >
                Best Food In Town
              </motion.p>

              <motion.h1
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                className="font-display text-4xl md:text-6xl font-semibold tracking-[0.05em] capitalize text-[#D9A44D] mb-6 leading-tight max-w-4xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              >
                {slide.text}
              </motion.h1>

              <motion.p
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="text-base md:text-lg text-[#ECE3D0]/75 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                {slide.subtext}
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.45 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <button onClick={() => navigate("/menu")} className="btn-lux">
                  Go To Menu <span className="btn-dash" />
                </button>
                <button onClick={() => navigate("/order")} className="btn-lux-outline">
                  Reservation <span className="btn-dash" />
                </button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Subtle delivery note */}
      <motion.div
        className="absolute bottom-8 right-6 md:right-12 z-[3] hidden md:flex flex-col items-center lux-card px-6 py-4 rounded-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <p className="font-display uppercase tracking-[0.14em] text-sm text-[#D9A44D]">
          Home Delivery Available
        </p>
        <p className="text-xs text-[#ECE3D0]/60 mt-1">
          Fresh meals at your doorstep
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
