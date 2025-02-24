import React from "react";
import { FaUtensils, FaAward, FaUsers, FaSmile } from "react-icons/fa";
import logo from '../assets/logo.png'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto ">
        {/* Hero Section */}
        <div className="text-center mb-12 ">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About MZ Kitchen</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We started our journey in 2016 with a single kitchen in Gulshan Iqbal. Today, we proudly serve food across 17+ branches in Karachi. Our commitment to quality and delicious food has made us a trusted name in the food industry.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-12 mx-8 my-auto ">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <p className="text-gray-600 mb-4">
                Al-Rehman Kitchen began with a simple vision: to provide high-quality, delicious, and nutritious food to our community. What started as a small kitchen in Gulshan Iqbal has now grown into a beloved brand with 17+ branches across Karachi.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey has been fueled by a passion for food and a commitment to excellence. We believe in using only the freshest ingredients and traditional recipes to create meals that bring joy to our customers.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, our dedicated team of chefs and staff has worked tirelessly to maintain the highest standards of quality and hygiene. We take pride in being an integral part of the community, supporting local farmers and suppliers, and contributing to the growth of Karachi's food culture.
              </p>
            </div>
            <div>
              <img
                src={logo}
                alt="MZ Kitchen"
                className="w-full h-90 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="bg-orange-500 shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Mission</h3>
              <p className="text-white">
                To become a trusted and beloved brand known for offering high-quality, delicious, and nutritious food that enhances people's lives.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Vision</h3>
              <p className="text-white">
                To expand our reach and continue delivering exceptional food experiences while maintaining our commitment to quality and customer satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white shadow-lg rounded-lg mx-8 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <FaUtensils className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We use only the freshest ingredients to ensure the best taste and quality.</p>
            </div>
            <div className="text-center">
              <FaAward className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Award-Winning Recipes</h3>
              <p className="text-gray-600">Our recipes have been recognized for their authenticity and flavor.</p>
            </div>
            <div className="text-center">
              <FaUsers className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Experienced Chefs</h3>
              <p className="text-gray-600">Our team of experienced chefs ensures every dish is perfect.</p>
            </div>
            <div className="text-center">
              <FaSmile className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">Your satisfaction is our top priority. We strive to exceed your expectations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;