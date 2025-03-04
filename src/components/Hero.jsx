import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import bikerider from '../assets/bikerider.png';
import './HeroSection.css';

const HeroSection = ({ bghero }) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/slides`) // Adjust URL if needed
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);

  return (
    <div className="relative h-[800px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bghero})` }}>
      <div className="absolute inset-0 opacity-50"></div>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="relative z-10 w-full h-full flex items-center justify-center text-white"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className="text-6xl text-center font-bold mb-4 my-[25%]">{slide.text}</h1>
            <p className="m-auto text-xl w-2/3 mb-8 text-center">{slide.subtext}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="rounded-2xl bg-orange-500 z-1 text-white absolute bottom-10 right-10">
        <p className="text-white text-2xl font-serif p-4 rounded-lg max-w-xs"><strong>Home Delivery.</strong></p>
        <img src={bikerider} alt="Delivery Bike Rider" className="w-20 h-20 mx-auto mb-4" />
      </div>
    </div>
  );
};

export default HeroSection;
