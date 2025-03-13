import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import logo from '../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Name */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold flex items-center">
              <img src={logo} alt="MZ Kitchen Logo" className="w-20 h-20 rounded-2xl mr-2" />
              MZ Kitchen
            </h2>
            <p className="text-gray-400 mt-4">
              Serving delicious food since 2016. Your flavor haven in Karachi.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-orange-500 transition duration-300">Home</a></li>
              <li><a href="/menu" className="text-gray-400 hover:text-orange-500 transition duration-300">Menu</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-orange-500 transition duration-300">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-orange-500 transition duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Address and Contact */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="mr-2" />
                House #12, Ground Floor, Gulistan-e-Johar, Karachi
              </li>
              <li className="flex items-center text-gray-400">
                <FaPhone className="mr-2" />
                03XX-XXXXXXX
              </li>
              <li className="flex items-center text-gray-400">
                <FaClock className="mr-2" />
                10:00 AM - 10:00 PM
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-orange-500 transition duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-orange-500 transition duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-orange-500 transition duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-orange-500 transition duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} MZ Kitchen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;