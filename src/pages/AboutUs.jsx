import React, { useContext } from "react";
import { FaUtensils, FaAward, FaUsers, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from '../assets/logo.png'
import { ThemeContext } from "../context/ThemeContext";


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};  


const AboutUs = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`min-h-screen py-12 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold mb-4"
          >
            About Al-Rehman Kitchen
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg max-w-2xl mx-auto"
          >
            We started our journey in 2016 with a single kitchen in Gulshan Iqbal. Today, we proudly serve food across 17+ branches in Karachi. Our commitment to quality and delicious food has made us a trusted name in the food industry.
          </motion.p>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className=" shadow-lg rounded-lg p-8 mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold  mb-6"
          >
            Our Story
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <p className=" mb-4">
                Al-Rehman Kitchen began with a simple vision: to provide high-quality, delicious, and nutritious food to our community. What started as a small kitchen in Gulshan Iqbal has now grown into a beloved brand with 17+ branches across Karachi.
              </p>
              <p className=" mb-4">
                Our journey has been fueled by a passion for food and a commitment to excellence. We believe in using only the freshest ingredients and traditional recipes to create meals that bring joy to our customers.
              </p>
              <p className=" mb-4">
                Over the years, our dedicated team of chefs and staff has worked tirelessly to maintain the highest standards of quality and hygiene. We take pride in being an integral part of the community, supporting local farmers and suppliers, and contributing to the growth of Karachi's food culture.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <img
                src={logo}
                alt="Al-Rehman Kitchen"
                className="w-full h-90 object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Mission and Vision Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-orange-500 shadow-lg rounded-lg p-8 mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-white mb-6"
          >
            Our Mission & Vision
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-semibold text-white mb-4">Mission</h3>
              <p className="text-white">
              To become the trusted companion for home cooks and food lovers, providing inspiration, education, and support to help them create memorable meals that bring people together and nourish both body and soul.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-semibold text-white mb-4">Vision</h3>
              <p className="text-white">
              Empowering individuals and families to live healthier, happier lives by providing access to nutritious, delicious, and convenient home-made food solutions
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className=" shadow-lg rounded-lg p-8"
        >
          <motion.h2
            variants={fadeInUp}
            className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'bg-white text-black' : ' text-white'}`}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div variants={fadeInUp} className="text-center">
              <FaUtensils className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold mb-2
                ${theme === 'light' ? 'bg-white text-black' : ' text-white'}`}>Fresh Ingredients</h3>
              <p className={`${theme === 'light' ? 'bg-white text-black' : ' text-white'}`}>We use only the freshest ingredients to ensure the best taste and quality.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <FaAward className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold mb-2
                ${theme === 'light' ? 'bg-white text-black' : ' text-white'}`}>Award-Winning Recipes</h3>
              <p className={`${theme === 'light' ? 'bg-white text-black' : ' text-white'}`}>Our recipes have been recognized for their authenticity and flavor.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <FaUsers className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold mb-2
                ${theme === 'light' ? 'bg-white text-black' : ' text-white'}`}>Experienced Chefs</h3>
              <p className={`${theme === 'light' ? 'bg-white text-black' : ' text-white'}`}>Our team of experienced chefs ensures every dish is perfect.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <FaSmile className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold mb-2
                ${theme === 'light' ? 'bg-white text-black' : ' text-white'}`}>Customer Satisfaction</h3>
              <p className={`${theme === 'light' ? 'bg-white text-black' : ' text-white'}`}>Your satisfaction is our top priority. We strive to exceed your expectations.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;