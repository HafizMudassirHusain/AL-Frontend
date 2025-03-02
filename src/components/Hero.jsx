import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import bikerider from '../assets/bikerider.png';
import './HeroSection.css';
import vandm from '../assets/vandm.jfif'
const slides = [
  { 
    text: "Taste the love, share the Joy", 
    subtext: "Serving Karachi since 2016 with 17+ branches, offering a variety of delicious meals that bring people together." 
  },
  { 
    text: "Aims & Goals", 
    subtext: "To provide nutritious, customizable meal solutions for institutions, organizations, and events, promoting health and sustainability while building trust, innovation, and long-term partnerships." 
  },
  { 
    text: "Vision & Mission", 
    subtext: "To lead in providing innovative, sustainable, and high-quality food provisioning services, delivering nutritious, customizable meal solutions that enhance well-being, satisfaction, and convenience for all clients." ,
    image: vandm
  },
  { 
    text: "MZ Services", 
    subtext: "We deliver tailored food provisioning services, including canteen meals, hospital catering, hostel dining, corporate meal solutions, and event catering, ensuring nutritious and customized options for institutions, organizations, and special occasions." 
  }
];
const HeroSection = ({ bghero, navigate }) => {
  return (
    <div className="relative h-[800px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bghero})` }}>
      <div className="absolute inset-0 opacity-50"></div>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active" }}
        autoplay={{ delay: 3000 }}
        className="relative z-10 w-full h-full flex items-center justify-center text-white"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}   className="flex flex-col items-center justify-center"
          style={{ 
            backgroundImage: `url(${slide.image})`, // Add background image
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
          }}>
            <h1 className="text-6xl text-center font-bold mb-4 my-[25%]">{slide.text}</h1>
            <p className="m-auto text-xl w-2/3 mb-8 text-center">{slide.subtext}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="rounded-2xl bg-orange-500 text-white absolute bottom-10 right-10">
  {/* Paragraph for Home Delivery */}
  <p className=" text-white text-2xl font-serif p-4 rounded-lg max-w-xs">
    <strong>Home Delivery.</strong>
  </p>
  {/* Delivery bike-rider image */}
  <img
    src={bikerider} // Replace with the actual path to your image
    alt="Delivery Bike Rider"
    className="w-20 h-20 mx-auto mb-4" // Adjust the size as needed
  />

</div>

    </div>
  );
};

export default HeroSection;
