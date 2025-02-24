import React from 'react';
import Gallery from '../components/Menutemp';
import Testimonials from '../components/Testimonials';
import Branches from '../components/Branches';
import bghero from '../assets/hero-bg.jpg'
import logo from '../assets/logo.png'
import { motion } from 'framer-motion';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[800px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bghero})`}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Flavor Haven – Home Food Services</h1>
          <p className="text-xl mb-8">Serving Karachi since 2016 with 17+ branches</p>
          <div className="space-x-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300">Order Online</button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition duration-300">View Menu</button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition duration-300">Contact Us</button>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image on the Left */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={logo}
            alt="MZ Kitchen"
            className="w-full h-auto rounded-lg "
          />
        </motion.div>

        {/* Text and Button on the Right */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold mb-6">About MZ Kitchen</h2>
          <p className="text-lg text-gray-700 mb-6">
            We started our journey in 2016 with a single kitchen in Gulshan Iqbal. Today, we proudly serve food across 17+ branches in Karachi. Our commitment to quality and delicious food has made us a trusted name in the food industry.
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300">
            Read More
          </button>
        </motion.div>
      </div>
    </div>

      {/* Special Offers Section */}
      <div className="bg-orange-500 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Special Offers</h2>
          <p className="text-xl text-white mb-6">Enjoy FREE DELIVERY on all orders above Rs. 1000!</p>
          <button className="bg-white text-orange-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300">Order Now</button>
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Branches Section */}
      <Branches />

       
    </div>
  );
};

export default Home;